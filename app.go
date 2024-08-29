package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/gen2brain/beeep"
)

// PersistImage persist image to golang sqlite db
func (a *App) PersistImage(imgObj DbRow) error {
	return a.db.addImage(imgObj)
}

func (a *App) GetAllImages() ([]DbRow, error) {
	return a.db.getAllImages()
}

func (a *App) UpdateImage(imgObj DbRow) error {
	return a.db.updateImage(imgObj)
}

func (a *App) DeleteImageViaImageHash(imageHash string) error {
	return a.db.deleteImage(imageHash)
}

func (a *App) GetImageViaImageHash(imageHash string) (DbRow, error) {
	return a.db.getImageViaImageHash(imageHash)
}

// ReadFileAsBase64 reads a file and returns its content as a base64 encoded string
func (a *App) ReadFileAsBase64(filePath string) (string, error) {
	// Read the file content
	fileBytes, err := os.ReadFile(filePath)
	if err != nil {
		log.Println("Failed to read file:", err)
		return "", err
	}

	// Encode the file content to base64
	base64String := base64.StdEncoding.EncodeToString(fileBytes)
	return base64String, nil
}

func ReadLocalFile(filePath string) ([]byte, error) {
	absolutePath, err := filepath.Abs(filePath)
	if err != nil {
		return nil, err
	}

	return os.ReadFile(absolutePath)
}

func (a *App) ReadFile(filePath string) ([]byte, error) {
	return ReadLocalFile(filePath)
}

// App struct
type App struct {
	ctx     context.Context
	db      *Db
	envVars *EnvVars
}

// NewApp creates a new App application struct
func NewApp(db *Db, envVars *EnvVars) *App {
	return &App{
		db:      db,
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

	// db
	a.db.startup()
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
