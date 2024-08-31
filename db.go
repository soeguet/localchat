package main

import (
	"database/sql"
	"errors"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var idFilePath string

type Db struct {
	db *sql.DB
}

type DbRow struct {
	ImageHash string `json:"imageHash"`
	Data      string `json:"data"`
}
type Osman struct {
	ABC bool
}

func NewDb() *Db {
	return &Db{}
}

func dbFilePath() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("error retrieving home path: %v", err)
	}

	idFilePath := filepath.Join(homeDir, ".localchat", "db", "images.db")

	if err := os.MkdirAll(filepath.Dir(idFilePath), 0o700); err != nil {
		log.Fatalf("error creating folder: %v", err)
	}

	return idFilePath
}

func (d *Db) startup() {
	idFilePath = dbFilePath()
	var err error

	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}

	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)

	_, err = d.db.Exec(`CREATE TABLE IF NOT EXISTS images (
		image_hash TEXT PRIMARY KEY,
		data TEXT
	)`)
	if err != nil {
		log.Fatalf("error creating table: %v", err)
	}
}

func (d *Db) getImageViaImageHash(imageHash string) (DbRow, error) {
	var err error
	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)
	var row DbRow

	err = d.db.QueryRow(`SELECT * FROM images WHERE image_hash = ?`, imageHash).Scan(
		&row.ImageHash,
		&row.Data,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return row, nil
		}
		return row, err
	}

	return row, nil
}

func (d *Db) addImage(imageObj DbRow) error {
	var err error
	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)
	_, err = d.db.Exec(`INSERT OR IGNORE INTO images (image_hash, data) VALUES (?, ?)`, imageObj.ImageHash, imageObj.Data)
	return err
}

func (d *Db) updateImage(imageObj DbRow) error {
	var err error
	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)
	_, err = d.db.Exec(`UPDATE images SET data = ? WHERE image_has = ?`, imageObj.Data, imageObj.ImageHash)
	return err
}

func (d *Db) deleteImage(imageHash string) error {
	var err error
	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)
	_, err = d.db.Exec(`DELETE FROM images WHERE image_hash = ?`, imageHash)
	return err
}

func (d *Db) getAllImages() ([]DbRow, error) {
	var err error
	var rows *sql.Rows
	d.db, err = sql.Open("sqlite3", idFilePath)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatalf("error closing database: %v", err)
		}
	}(d.db)
	rows, err = d.db.Query(`SELECT * FROM images`)
	if err != nil {
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			log.Fatalf("error closing rows: %v", err)
		}
	}(rows)

	var images []DbRow
	for rows.Next() {
		var row DbRow
		err = rows.Scan(&row.ImageHash, &row.Data)
		if err != nil {
			return nil, err
		}
		images = append(images, row)
	}
	return images, nil
}