package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"

)

type Content struct {
    Shortbio []string `json:"shortbio"`
    Tech []string `json:"tech"`
}

func PostAbout(c *gin.Context) {
    err := validateToken(c)
    if err==nil{
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    var content Content
    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&content); err != nil {
        fmt.Println("errrr")
        return
    }
    c.IndentedJSON(http.StatusCreated, content)   //goes back to client with 201 informing that it is created.useful for development purpose
    bytes, _ := json.MarshalIndent(content,""," ")

    // open output file
    fo, err := os.Create("aboutpage.json")   //if exists it just open
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
}


func Getabout(c *gin.Context) {
    c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    err := validateToken(c)
    if err==nil {
        var content = &Content{}
        b, err := os.ReadFile("aboutpage.json")
        if err != nil {
            panic(err)
        }
        err = json.Unmarshal(b, content)
        if err != nil {
            panic(err)
        }
        //fmt.Print(string(dat))
        
        //var content Content
        c.IndentedJSON(http.StatusOK, content)
    }

}
