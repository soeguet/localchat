package main

import (
	"context"
	"fmt"
	"os"

	"github.com/gen2brain/beeep"
)

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

// GetLocalChatUsername returns the value of the LOCALCHAT_USERNAME environment variable.
func (a *App) GetLocalChatUsername() string {
	return os.Getenv("LOCALCHAT_USERNAME")
}
