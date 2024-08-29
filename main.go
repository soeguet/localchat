// main package
package main

import (
	"embed"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	_ "image/png"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed all:frontend/dist
var assets embed.FS

// //go:embed frontend/dist/logo.png
//var icon []byte

// main is the entry point of the application.
func main() {
	// Create an instance of the app structure
	db := NewDb()
	envVars := NewEnvVars()
	app := NewApp(db, envVars)

	// Create application with options
	if err := wails.Run(&options.App{
		Title:                    "localchat",
		Width:                    600,
		Height:                   1000,
		EnableDefaultContextMenu: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		HideWindowOnClose: false,
		// BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: app.startup,
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop: true,
		},
		Bind: []interface{}{
			app,
		},
		Windows: &windows.Options{
			WindowIsTranslucent: false,
		},
		Linux: &linux.Options{
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "localchat",
			//Icon:                icon,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: true,
		},
	}); err != nil {
		log.Fatal(err)
	}
}
