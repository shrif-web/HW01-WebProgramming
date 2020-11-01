# Golang Server

listens at portNumber 8081.
- Nginx passing go requests configuration:

        location /go/write {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8081/write;
        }

	location /go/sha256 {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8081/sha;
        }

## API
Sample API request 

Go: 

	Go sha test:
	curl 'http://localhost/go/sha256' -X POST -H "Content-Type: application/json" --data $'{"Num1":18,"Num2":14}'

	Go write test: 
	curl 'http://localhost:8081/write?line=3'

