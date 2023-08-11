package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
)
type ClientInfo struct {
	Name string `json:"name"`
	Contact string `json:"contact"`
	Message string `json:"message"`
}
type MyInfo struct {
	Link string `json:"link"`
	Title string `json:"title"`
	ClassName string `json:"className"`
}

type Contentcontact struct {
    ClientInfo []ClientInfo `json:"clientinfo"`
    MyInfo []MyInfo `json:"myinfo"`
}
func PostContact(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    var content Contentcontact
    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&content); err != nil {
        fmt.Println("errrr")
        return
    }
    c.IndentedJSON(http.StatusCreated, content)   //goes back to client with 201 informing that it is created.useful for development purpose
    bytes, _ := json.MarshalIndent(content,""," ")

    // open output file
    fo, err := os.Create("contactpage.json")   //if exists it just open
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


func GetContact(c *gin.Context) {
	var content = &Contentcontact{}
	b, err := os.ReadFile("contactpage.json")
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
