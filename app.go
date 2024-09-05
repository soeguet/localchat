package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os/exec"
	"runtime"
	"strings"

	"github.com/gen2brain/beeep"

	"os"
)

type App struct {
	ctx     context.Context
	envVars *EnvVars
}

// NewApp creates a new App application struct
func NewApp(envVars *EnvVars) *App {
	return &App{
		envVars: envVars,
	}
}

func (a *App) saveImageToTempFile(imageData []byte) (string, error) {
    tempFile, err := os.CreateTemp("", "temp_image_*.png")
    if err != nil {
        return "", err
    }
    defer tempFile.Close()

    if _, err = tempFile.Write(imageData); err != nil {
        return "", err
    }

    return tempFile.Name(), nil
}


func (a *App) openImageViaOs(err error, tempFilePath string) error {
	var cmd *exec.Cmd

	switch os := runtime.GOOS; os {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", tempFilePath)
	case "linux":
		cmd = exec.Command("xdg-open", tempFilePath)
	default:
		return fmt.Errorf("unsupported platform: %s", os)
	}

	err = cmd.Start()
	if err != nil {
		return err
	}

	return nil
}

func (a *App) ImageViewer(base64Str string) error {
	idx := strings.Index(base64Str, ";base64,")
	if idx != -1 {
		base64Str = base64Str[idx+8:]
	}

	imageData, err := base64.StdEncoding.DecodeString(base64Str)
	if err != nil {
		return err
	}

	tempFilePath, err := a.saveImageToTempFile(imageData)
	if err != nil {
		return err
	}

	err = a.openImageViaOs(err, tempFilePath)
	if err != nil {
		return err
	}

	return nil
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// env vars
	a.envVars.createConfigFolder()
	a.envVars.createIdFolder()
	a.envVars.createDbFolder()
	a.envVars.retrieveEnvVars(a.ctx)
}

// Notification sends a notification with the given sender and message.
// It uses the beeep package to display the notification and requires the path to an app icon image.
func (a *App) Notification(sender string, message string) {
	err := beeep.Notify(sender, message, "./public/logo.png")
	if err != nil {
		return
	}
}

// GetLocalChatEnvVars retrieves the environment variables for the local chat application.
// It returns a JSON string representation of the environment variables.
// If an error occurs during retrieval, it panics.
func (a *App) GetLocalChatEnvVars() EnvVars {
	vars, err := a.envVars.envVarsToFrontend()
	if err != nil {
		_ = fmt.Errorf("error converting env vars to frontend: %w", err)
	}

	return vars
}

func (a *App) MakeWindowsTaskIconFlash(title string) {
	_ = FlashWindow(title)
}
