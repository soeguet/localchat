package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"runtime"

	"github.com/gen2brain/beeep"
)

type EnvVars struct {
	Username string `json:"username"`
	IP       string `json:"ip"`
	Port     string `json:"port"`
	Os       string `json:"os"`
}

// GetLocalChatEnvVars gibt die Werte einiger Umgebungsvariablen als JSON-String zurück.
func GetLocalChatEnvVars() (string, error) {
	envVars := EnvVars{
		Username: os.Getenv("LOCALCHAT_USERNAME"),
		IP:       os.Getenv("LOCALCHAT_IP"),
		Port:     os.Getenv("LOCALCHAT_PORT"),
		Os:       runtime.GOOS,
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

// GetLocalChatEnvVars retrieves the environment variables for the local chat application.
// It returns a JSON string representation of the environment variables.
// If an error occurs during retrieval, it panics.
func (a *App) GetLocalChatEnvVars() string {
	jsonString, err := GetLocalChatEnvVars()
	if err != nil {
		// Fehlerbehandlung
		panic(err)
	}
	return jsonString
}

func (a *App) MakeWindowsTaskIconFlash(title string) {
	FlashWindow(title)
}