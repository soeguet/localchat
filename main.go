// main package
package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2/pkg/options/windows"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed all:frontend/dist
var assets embed.FS

// //go:embed frontend/public/logo.png
// var icon []byte

// main is the entry point of the application.
func main() {
	// Create an instance of the app structure
	db := NewDb()
	envVars := NewEnvVars()
	app := NewApp(db, envVars)

	// Create application with options
	if err := wails.Run(&options.App{
		Title:                    "localchat",
		Width:                    1024,
		Height:                   768,
		EnableDefaultContextMenu: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		HideWindowOnClose: false,
		// BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
		Windows: &windows.Options{},
		Linux: &linux.Options{
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "localchat",
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: true,
		},
	}); err != nil {
		log.Fatal(err)
	}
}
