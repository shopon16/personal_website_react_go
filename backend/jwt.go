package main
import (
	"encoding/json"
	"errors"
	"fmt"
	//"net/http"
	"time"
	"github.com/gin-gonic/gin"

	"github.com/golang-jwt/jwt"
)
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
func loginHandler(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")   //required for bypassing cors

	switch c.Request.Method {
	case "POST":
		var user User

		// decode the request body into the struct, If error, respond to the client with the error message and a 400 status code.
		// fmt.Println(request.Body)
		// err := json.NewDecoder(request.Body).Decode(&user)
		err := json.NewDecoder(c.Request.Body).Decode(&user)
		if err != nil {
			fmt.Fprintf(c.Writer, "invalid body")
			return
		}

		if (user.Username != "shopon16") || (user.Password != "123") {
			fmt.Fprintf(c.Writer, "can not authenticate this user")
			return
		}

		token, err := generateJWT(user.Username)
		if err != nil {
			fmt.Fprintf(c.Writer, "error in generating token")
		}
		
		fmt.Fprintf(c.Writer, "%s",token)
		fmt.Println("sends token to browser")
	case "GET":
		fmt.Fprintf(c.Writer, "only POST methods is allowed.")
		return
	}
}

var sampleSecretKey = []byte("GoLinuxCloudKey")

func generateJWT(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Minute * 5).Unix()

	tokenString, err := token.SignedString(sampleSecretKey)

	if err != nil {
		err=fmt.Errorf("something Went Wrong: %s", err.Error())
		return "", err
	}
	return tokenString, nil
}

func validateToken(c *gin.Context) (err error) {
	if c.Request.Header["Token"] == nil {
		fmt.Fprintf(c.Writer, "can not find token in header")
		return errors.New("token error")
	}

	token, _ := jwt.Parse(c.Request.Header["Token"][0], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("there was an error in parsing")
		}
		return sampleSecretKey, nil
	})

	if token == nil {
		fmt.Fprintf(c.Writer, "invalid token")
		return errors.New("token error")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		fmt.Fprintf(c.Writer, "couldn't parse claims")
		return errors.New("token error")
	}

	exp := claims["exp"].(float64)
	if int64(exp) < time.Now().Local().Unix() {
		fmt.Fprintf(c.Writer, "token expired")
		return errors.New("token error")
	}

	return nil
}

func getAllBookHandler(c *gin.Context) {
	err := validateToken(c)
	if err == nil {
		c.Writer.Header().Set("Content-Type", "application/json")
		books := getAllBook()
		json.NewEncoder(c.Writer).Encode(books)
	}
}

type Book struct {
	Name   string
	Author string
}

func getAllBook() []Book {
	return []Book{
		{
			Name:   "Book1",
			Author: "Author1",
		},
		{
			Name:   "Book2",
			Author: "Author2",
		},
		{
			Name:   "Book3",
			Author: "Author3",
		},
	}
}

