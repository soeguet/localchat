package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/gen2brain/beeep"
	"github.com/google/uuid"
)

type EnvVars struct {
	Username string `json:"username"`
	IP       string `json:"ip"`
	Port     string `json:"port"`
	Os       string `json:"os"`
	Id       string `json:"id"`
}

func SetClientId() string {
	// if dev=true environment variable is set, use a random id
	if os.Getenv("DEV") == "true" {
		return uuid.New().String()
	}

	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	idFilePath := filepath.Join(homeDir, ".localchat", "id", "id.txt")

	if err := os.MkdirAll(filepath.Dir(idFilePath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}

	if _, err := os.Stat(idFilePath); os.IsNotExist(err) {
		// id file missing -> generate new id
		newID := uuid.New().String()

		// save id in file
		if err := os.WriteFile(idFilePath, []byte(newID), 0o600); err != nil {
			log.Fatalf("error saving the id: %v", err)
		}

		log.Printf("new id generated and saved: %s", newID)
		return newID
	} else {
		// id exists -> read id from file
		id, err := os.ReadFile(idFilePath)
		if err != nil {
			log.Fatalf("error reading id: %v", err)
		}

		log.Printf("id was read from file: %s", string(id))
		return string(id)
	}
}

// persist image to golang sqlite db
func (a *App) PersistImage(imgObj DbRow) error {
	return a.db.addImage(imgObj)
}

func (a *App) GetAllImages() ([]DbRow, error) {
	return a.db.getAllImages()
}

func (a *App) UpdateImage(imgObj DbRow) error {
	return a.db.updateImage(imgObj)
}

func (a *App) DeleteImage(imageHash string) error {
	return a.db.deleteImage(imageHash)
}

func (a *App) GetImage(imageHash string) (DbRow, error) {
	return a.db.getImage(imageHash)
}

func GetLocalChatEnvVars() (string, error) {
	clientDbId := SetClientId()

	envVars := EnvVars{
		Username: os.Getenv("LOCALCHAT_USERNAME"),
		IP:       os.Getenv("LOCALCHAT_IP"),
		Port:     os.Getenv("LOCALCHAT_PORT"),
		Os:       runtime.GOOS,
		Id:       clientDbId,
	}

	envVarsJSON, err := json.Marshal(envVars)
	if err != nil {
		return "", err
	}

	return string(envVarsJSON), nil
}

// App struct
type App struct {
	ctx context.Context
	db  *Db
}

// NewApp creates a new App application struct
func NewApp(db *Db) *App {
	return &App{
		db: db,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
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
func (a *App) GetLocalChatEnvVars() string {
	jsonString, err := GetLocalChatEnvVars()
	if err != nil {
		panic(err)
	}
	return jsonString
}

func (a *App) MakeWindowsTaskIconFlash(title string) {
	_ = FlashWindow(title)
}
