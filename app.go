package main

import (
	"context"
	"fmt"

	"github.com/gen2brain/beeep"
)

// App struct
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