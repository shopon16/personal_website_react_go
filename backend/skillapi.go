package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
)
type Card struct {
	Heading string `json:"heading"`
	Paragraph string `json:"paragraph"`
	Iconclass string `json:"iconclass"`
}
type Contentskill struct {
    Reasontohire string `json:"reasontohire"`
    Skills []Card `json:"skills"`
}

func PostSkill(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    var content Contentskill
    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&content); err != nil {
        fmt.Println("errrr")
        return
    }
    c.IndentedJSON(http.StatusCreated, content)   //goes back to client with 201 informing that it is created.useful for development purpose
    bytes, _ := json.MarshalIndent(content,""," ")

    // open output file
    fo, err := os.Create("skillpage.json")   //if exists it just open
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


func GetSkill(c *gin.Context) {
	var content = &Contentskill{}
	b, err := os.ReadFile("skillpage.json")
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
