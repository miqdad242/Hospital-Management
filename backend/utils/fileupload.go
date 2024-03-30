package utils

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"strings"
)

// func generateFileName(name string) (fileName string) {

// 	fileParts := strings.Split(name, ".")
// 	fileExtension := ""
// 	if len(fileParts) > 1 {
// 		fileExtension = "." + fileParts[len(fileParts)-1]
// 	}

// 	// Generate a random number
// 	randomNumber := rand.Intn(10000) // Adjust the range as needed

// 	// Create a unique filename with datetime and random number
// 	fileName = fmt.Sprintf("%s_%s_%d%s",
// 		strings.TrimSuffix(name, fileExtension),
// 		time.Now().Format("20060102150405"), // Format: YYYYMMDDHHMMSS
// 		randomNumber,
// 		fileExtension,
// 	)
// 	return fileName
//}

func UploadFile(fileName string, path string, file multipart.File) (filePath string, err error) {
	//filePath = generateFileName(fileName)
	filePath = fileName
	if _, err := os.Stat(path); os.IsNotExist(err) {
		// Directory doesn't exist, so create it
		if err := os.MkdirAll(path, 0755); err != nil {
			return "", err
		}
	}
	// Create a new file on the server to save the uploaded image
	f, err := os.Create(path + filePath)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	defer f.Close()

	// Copy the uploaded file data to the new file on the server
	_, err = io.Copy(f, file)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	path = strings.Split(path, ".")[1]
	filePath = path + filePath
	return (filePath), nil
}

func DeleteFile(filePath string) (err error) {
	e := os.Remove("." + filePath)
	if e != nil {
		fmt.Println(e)
		return e
	}
	return nil
}
