package main
import (
	"net/http"
	"fmt"
	"io"
	"os"
	"strconv"
	"github.com/gin-gonic/gin"
)
func Download(c *gin.Context){
	//First of check if Get is set in the URL
	Filename:=c.Request.URL.Query().Get("file")
	//Filename := c.URL.Query().Get("file")
	if Filename == "" {
		//Get not set, send a 400 bad request
		//http.Error(writer, "Get 'file' not specified in url.", 400)
		return
	}
	fmt.Println("Client requests: " + Filename)
	//Check if file exists and open
	Openfile, err := os.Open("./content/"+Filename)
	
	defer Openfile.Close() //Close after function return
	if err != nil {
		//File not found, send 404
		//http.Error(writer, "File not found.", 404)
		return
	}
	//File is found, create and send the correct headers
	//Get the Content-Type of the file
	//Create a buffer to store the header of the file in
	FileHeader := make([]byte, 512)
	//Copy the headers into the FileHeader buffer
	Openfile.Read(FileHeader)
	//Get content type of file
	FileContentType := http.DetectContentType(FileHeader)
	//Get the file size
	FileStat, _ := Openfile.Stat()                     //Get info from file
	FileSize := strconv.FormatInt(FileStat.Size(), 10) //Get file size as a string
	//Send the headers
	c.Writer.Header().Set("Content-Disposition", "attachment; filename="+Filename)
	c.Writer.Header().Set("Content-Type", FileContentType)
	c.Writer.Header().Set("Content-Length", FileSize)
	//writer.Header().Set("Content-Disposition", "attachment; filename="+Filename)
	
	//Send the file
	//We read 512 bytes from the file already, so we reset the offset back to 0
	Openfile.Seek(0, 0)
	io.Copy(c.Writer, Openfile) //'Copy' the file to the client
}