package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
)
type projectCard struct {
	ProjectName string `json:"projectName"`
	Contents string `json:"contents"`
	Img string `json:"img"`
	Href string `json:"href"`
	Tag string `json:"tag"`
	Link1 string `json:"link1"`
	Link2 string `json:"link2"`
    Class string `json:"class"`
}
type moreCard struct {
	MoreLink1 string `json:"moreLink1"`
	Title1 string `json:"title1"`
	Class1 string `json:"class1"`
	MoreLink2 string `json:"moreLink2"`
	Title2 string `json:"title2"`
	Class2 string `json:"class2"`
	Title string `json:"title"`
	Content string `json:"content"`
	Keyword string `json:"keyword"`
}
type Contentproject struct {
    ProjectCard []projectCard `json:"projectCard"`
	Morecard []moreCard `json:"morecard"`
}

func PostProject(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors
    var content Contentproject
    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&content); err != nil {
        fmt.Println("errrr")
        return
    }
    c.IndentedJSON(http.StatusCreated, content)   //goes back to client with 201 informing that it is created.useful for development purpose
    bytes, _ := json.MarshalIndent(content,""," ")

    // open output file
    fo, err := os.Create("projectpage.json")   //if exists it just open
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


func GetProject(c *gin.Context) {
	var content = &Contentproject{}
	b, err := os.ReadFile("projectpage.json")
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
