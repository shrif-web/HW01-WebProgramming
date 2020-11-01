package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

func main() {
	fmt.Println("Now Listening on 8081")
	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(":8081", nil)
}

type shaInputData struct {
	Num1 int
	Num2 int
}

type shaOutput struct {
	Status string
	Result string
}

type writeOuput struct {
	Status string
	Result string
}

func mainHandler(w http.ResponseWriter, r *http.Request) {

	// loading index.html(homePage)
	p := "." + r.URL.Path
	if p == "./" {
		p = "./index.html"
		//http.ServeFile(w, r, p)

	} else if p == "./sha" {
		// handle sha's post request

		if r.Method == "GET" {
			sendJSON(w, nil, false) // failure -> misType of request.
			return
		}

		decoder := json.NewDecoder(r.Body)
		var data shaInputData
		err := decoder.Decode(&data) // todo no existance -> zero instead.
		if err != nil {
			fmt.Println(err)
			fmt.Println("ErrorHappenedParsingData")
			sendJSON(w, nil, false) // failure -> misStructure of request.
			return
		}

		num1 := data.Num1
		fmt.Println(num1)
		num2 := data.Num2
		fmt.Println(num2)
		sum := num1 + num2

		stringValueOfSum := strconv.Itoa(sum)
		h := sha256.New()
		h.Write([]byte(stringValueOfSum))

		answer := shaOutput{}
		answer.Status = "succeed"
		answer.Result = base64.URLEncoding.EncodeToString(h.Sum(nil))

		print("sha256 of Sum is: ")
		fmt.Printf("%s\n", answer.Result)

		// sending back json response.

		//Marshal or convert user object back to json and write to response
		userJSON, err := json.Marshal(answer)
		if err != nil {
			sendJSON(w, nil, false) // todo test.
			return
		}
		sendJSON(w, userJSON, true)

	} else if p == "./write" {
		// handle get request.

		if r.Method == "POST" {
			sendJSON(w, nil, false)
			return // failure -> misType of request.
		}

		query := r.URL.Query()
		line, err := strconv.Atoi(query.Get("line"))
		if err != nil {
			sendJSON(w, nil, false)
			return // invalid input(not int)
		}

		file, err := os.Open("/home/AHReccese/db/repo.txt")
		// if err != nil { ... }

		answer := writeOuput{}
		text, _, err := readLine(bufio.NewReader(file), line)
		if err != nil {
			// statusCode = 200
			answer.Status = "failed"
			answer.Result = "indexOutOfBound"
		} else {
			// statusCode = 200
			answer.Status = "succeed"
			answer.Result = text
		}

		// sending back json response.
		//Marshal or convert user object back to json and write to response
		userJSON, err := json.Marshal(answer)
		if err != nil {
			sendJSON(w, nil, false) // todo test.
			return
		}
		sendJSON(w, userJSON, true)

	} else {
		return // such as ./favicon.ico or ...
	}
}

func readLine(r io.Reader, lineNum int) (line string, lastLine int, err error) {

	sc := bufio.NewScanner(r)
	for sc.Scan() {
		lastLine++
		if lastLine == lineNum {
			return sc.Text(), lastLine, sc.Err()
		}
	}
	return line, lastLine, io.EOF
}

func sendJSON(w http.ResponseWriter, resp []byte, status bool) {
	//Set Content-Type header so that clients will know how to read response
	w.Header().Set("Content-Type", "application/json")
	if status {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
	//Write json response back to response
	w.Write(resp)
}
