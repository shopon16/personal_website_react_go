package main

import (
    
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/aboutapi", PostAbout)
    router.GET("/aboutapi",Getabout)
	router.POST("/homeapi", PostHome)
    router.GET("/homeapi",GetHome)
	router.POST("/skillapi", PostSkill)
    router.GET("/skillapi",GetSkill)
	router.POST("/projectapi", PostProject)
    router.GET("/projectapi",GetProject)
	router.POST("/contactapi", PostContact)
    router.GET("/contactapi",GetContact)
	router.POST("/upload",UploadHandler)
	router.GET("/download",Download)
	router.POST("/login",loginHandler)
	router.GET("/getAllBooks", getAllBookHandler)

	router.Static("/content", "./content")
	router.Run("0.0.0.0:8080")
}
