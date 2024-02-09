package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"syscall"
	"unsafe"

	"github.com/gen2brain/beeep"
)

var (
	user32            = syscall.NewLazyDLL("user32.dll")
	procFlashWindowEx = user32.NewProc("FlashWindowEx")
	procFindWindowW   = user32.NewProc("FindWindowW")
)

type FLASHWINFO struct {
	cbSize    uint32
	hwnd      syscall.Handle
	dwFlags   uint32
	uCount    uint32
	dwTimeout uint32
}

const (
	FLASHW_STOP      = 0
	FLASHW_CAPTION   = 1
	FLASHW_TRAY      = 2
	FLASHW_ALL       = 3
	FLASHW_TIMER     = 4
	FLASHW_TIMERNOFG = 12
)

type EnvVars struct {
	Username string `json:"username"`
	IP       string `json:"ip"`
	Port     string `json:"port"`
}

// GetLocalChatEnvVars gibt die Werte einiger Umgebungsvariablen als JSON-String zurück.
func GetLocalChatEnvVars() (string, error) {
	envVars := EnvVars{
		Username: os.Getenv("LOCALCHAT_USERNAME"),
		IP:       os.Getenv("LOCALCHAT_IP"),
		Port:     os.Getenv("LOCALCHAT_PORT"),
	}

	// Konvertierung der EnvVars-Instanz in JSON
	envVarsJSON, err := json.Marshal(envVars)
	if err != nil {
		// Fehler beim Konvertieren in JSON
		return "", err
	}

	// Konvertiertes JSON als String zurückgeben
	return string(envVarsJSON), nil
}

// FindWindow finds a window with the specified class name and window name.
// It returns the handle to the window if found, or an invalid handle if not found.
// The className parameter specifies the class name of the window.
// The windowName parameter specifies the window name or title of the window.
func FindWindow(className, windowName string) syscall.Handle {
	var cn *uint16 = nil
	var wn *uint16 = nil
	if className != "" {
		cn, _ = syscall.UTF16PtrFromString(className)
	}
	if windowName != "" {
		wn, _ = syscall.UTF16PtrFromString(windowName)
	}
	ret, _, _ := procFindWindowW.Call(
		uintptr(unsafe.Pointer(cn)),
		uintptr(unsafe.Pointer(wn)),
	)
	return syscall.Handle(ret)
}

// FlashWindowEx flashes the specified window.
// It takes the window handle, flags, count, and timeout as parameters.
// Returns true if the window was successfully flashed, false otherwise.
func FlashWindowEx(hwnd syscall.Handle, dwFlags, uCount, dwTimeout uint32) bool {

	var fwi FLASHWINFO
	fwi.cbSize = uint32(unsafe.Sizeof(fwi))
	fwi.hwnd = hwnd
	fwi.dwFlags = dwFlags
	fwi.uCount = uCount
	fwi.dwTimeout = dwTimeout

	ret, _, _ := procFlashWindowEx.Call(
		uintptr(unsafe.Pointer(&fwi)),
	)
	return ret != 0
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Notification sends a notification with the given sender and message.
// It uses the beeep package to display the notification and requires the path to an app icon image.
func (a *App) Notification(sender string, message string) {
	beeep.Notify(sender, message, "./build/appicon.png")
}


func (a *App) GetLocalChatEnvVars() string  {
	jsonString, err := GetLocalChatEnvVars()
	if err != nil {
		// Fehlerbehandlung
		panic(err)
	}
	return jsonString
}

// FlashWindow flashes the window with the specified title.
// It uses the FindWindow function to find the window handle based on the title.
// If the window is found, it calls the FlashWindowEx function to flash the window.
// The window is flashed with the FLASHW_TRAY flag and a timer interval of 3 milliseconds.
// Returns true if the window is flashed successfully, otherwise false.
func (a *App) FlashWindow(title string) bool {
	windowHandle := FindWindow("", title)
	if windowHandle == 0 {
		return false
	}
	hwnd := syscall.Handle(windowHandle)
	FlashWindowEx(hwnd, FLASHW_TRAY|FLASHW_TIMERNOFG, 3, 0)
	return true
}
