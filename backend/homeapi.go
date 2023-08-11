package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
)

type Contenthome struct {
    Name string `json:"name"`
    Designation []string `json:"designation"`
	Headline []string `json:"headline"`
	Button string `json:"button"`
    HomePic string `json:"homepic"`
}

func PostHome(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    var content Contenthome
    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&content); err != nil {
        fmt.Println("errrr")
        return
    }
    c.IndentedJSON(http.StatusCreated, content)   //goes back to client with 201 informing that it is created.useful for development purpose
    bytes, _ := json.MarshalIndent(content,""," ")

    // open output file
    fo, err := os.Create("homepage.json")   //if exists it just open
    if err != nil {
        panic(err)
    }
    // close fo on exit and check for its returned error
    defer func() {
        if err := fo.Close(); err != nil {
            panic(err)
        }
    }()
            // write a chunk
    if _, err := fo.Write(bytes); err != nil {
        panic(err)
    }

}


func GetHome(c *gin.Context) {
	var content = &Contenthome{}
	b, err := os.ReadFile("homepage.json")
    if err != nil {
        panic(err)
    }
	err = json.Unmarshal(b, content)
	if err != nil {
		panic(err)
	}
    //fmt.Print(string(dat))
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    //var content Content
    c.IndentedJSON(http.StatusOK, content)
}
