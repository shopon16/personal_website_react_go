package main
import (
	//"log"
	"net/http"
	//"os"
	//"fmt"
	//"time"
	//"path/filepath"
	"github.com/gin-gonic/gin"
	//"io"
)
const MAX_UPLOAD_SIZE = 1024 * 1024 // 1MB
func UploadHandler(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	//w.Header().Set("Access-Control-Allow-Origin", "*")
	//c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    //w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	gin.Default().MaxMultipartMemory=8<<20
	file, err := c.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, "get form err: %s", err.Error())
		return
	}
	
	//filename := filepath.Base(file.Filename)
	if err := c.SaveUploadedFile(file, "./content/pdf/resume_shopon.pdf"); err != nil {
		c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
		return
	}

	c.String(http.StatusOK, "File  uploaded successfully" )
}