package main

import (
	"context"
	"fmt"
	wailsruntime "github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/google/uuid"
)

type EnvVars struct {
	Username    string `json:"username"`
	IP          string `json:"ip"`
	Port        string `json:"port"`
	Os          string `json:"os"`
	Id          string `json:"id"`
	Environment string `json:"environment"`
}

var (
	IP          string
	Username    string
	Port        string
	Os          string
	Id          string
	Environment string
)

func (envVars *EnvVars) retrieveEnvVars(ctx context.Context) {
	Id = envVars.setClientId()
	IP = os.Getenv("LOCALCHAT_IP")
	Username = os.Getenv("LOCALCHAT_USERNAME")
	Port = os.Getenv("LOCALCHAT_PORT")
	Os = runtime.GOOS

	wailsRuntime := wailsruntime.Environment(ctx)
	Environment = wailsRuntime.BuildType

}

func NewEnvVars() *EnvVars {
	return &EnvVars{}
}

func (envVars *EnvVars) envVarsToFrontend() (EnvVars, error) {
	vars := EnvVars{
		Username:    Username,
		IP:          IP,
		Port:        Port,
		Os:          Os,
		Id:          Id,
		Environment: Environment,
	}

	return vars, nil

	//envVarsJSON, err := json.Marshal(vars)
	//if err != nil {
	//	return "", err
	//}
	//
	//return string(envVarsJSON), nil
}

func getIdFilePath() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	idFilePath := filepath.Join(homeDir, ".localchat", "id", "id.txt")

	if err := os.MkdirAll(filepath.Dir(idFilePath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}

	return idFilePath
}

func (envVars *EnvVars) createConfigFolder() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	configFolderPath := filepath.Join(homeDir, ".localchat")

	if err := os.MkdirAll(filepath.Dir(configFolderPath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}
}

func (envVars *EnvVars) createIdFolder() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	configFolderPath := filepath.Join(homeDir, ".localchat", "id")

	if err := os.MkdirAll(filepath.Dir(configFolderPath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}
}

func (envVars *EnvVars) createDbFolder() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	configFolderPath := filepath.Join(homeDir, ".localchat", "db")

	if err := os.MkdirAll(filepath.Dir(configFolderPath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}
}

func generateNewId(idFilePath string) string {
	if _, err := os.Stat(idFilePath); os.IsNotExist(err) {
		// id file missing -> generate new id
		newID := uuid.New().String()

		// save id in file
		if err := os.WriteFile(idFilePath, []byte(newID), 0o600); err != nil {
			log.Fatalf("error saving the id: %v", err)
		}

		log.Printf("new id generated and saved: %s", newID)
		fmt.Printf("id: %s", Id)
		return newID

	} else {

		// id exists -> read id from file
		id, err := os.ReadFile(idFilePath)
		if err != nil {
			log.Fatalf("error reading id: %v", err)
		}

		log.Printf("id was read from file: %s", string(id))
		fmt.Printf("id: %s", Id)
		return string(id)
	}
}

func (envVars *EnvVars) setClientId() string {

	if os.Getenv("LOCALCHAT_ID") != "" {
		return os.Getenv("LOCALCHAT_ID")
	}

	// if dev=true environment variable is set, use a random id
	if os.Getenv("DEV") == "true" {
		return uuid.New().String()
	}

	idFilePath := getIdFilePath()

	return generateNewId(idFilePath)
}
