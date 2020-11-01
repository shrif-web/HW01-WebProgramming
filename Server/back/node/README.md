# Nodejs Server

listens at portNumber 3000.
- Nginx passing nodejs requests configuration:

	location /node/write {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:3000/write; # for me localhost was 172.20.10.13
        }

        location /node/sha256 { 
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:3000/sha;  # for me localhost was 172.20.10.13
        }

## API
Sample API request 

Node:

	Node sha test:
	curl 'http://localhost/node/sha256' -X POST -H "Content-Type: application/json" --data $'{"Num1":18,"Num2":24}'

	Node write test:
	curl 'http://localhost/node/write?line=4'
