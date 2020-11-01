const url = 'http://172.20.10.13/';  // toDo : host address should come here

window.addEventListener( "load", function () {

    // Access the forms and their elements

    // Sha256 summation form elements
    const submitSum = document.getElementById("submitSum");
    const apiSum = document.getElementById("apiCheck1");
    const num1 = document.getElementById("firstNumber");
    const num2 = document.getElementById("secondNumber");
    const sumResultBox = document.getElementById("resultBox1");
    const sumResult = document.getElementById("resultSum");

    // Get line of a file form elements
    const submitGetLine = document.getElementById("submitGetLine");
    const apiGetLine = document.getElementById("apiCheck2");
    const reqLineNumber = document.getElementById("lineNumber");
    const getLineResultBox = document.getElementById("resultBox2");
    const getLineResult = document.getElementById("resultLine");

    // Define onClick Listener of 'Sha256' form
    submitSum.onclick = async (e) => {
        e.preventDefault();

        var num1_int = parseInt(num1.value,10);
        var num2_int = parseInt(num2.value,10);

        if(apiSum.checked) {
            console.log('User request is sum of sha256 using Golang');

            let response = await fetch(url + 'go/sha', {  // toDo : '/sha' -> 'go/sha'
                method: 'POST',
                body: JSON.stringify({ 
                    Num1: num1_int, 
                    Num2: num2_int 
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            });
            console.log(response);

            if (response.ok) { // if HTTP-status is 200-299
                let json = await response.json();
                console.log(json);

                if(json.Status == 'succeed') { // if our number is IB
                    sumResult.innerHTML=json.Result;
                    sumResultBox.style="display: inline;" 
                } else {
                    alert("Error!");
                }

            } else {
                alert("HTTP-Error: " + response.status);
            }

        } else {
            console.log('User request is sha256 using NodeJS');

            let response = await fetch(url + 'node/sha', { // toDo : '/sha' -> 'node/sha'
                method: 'POST',
                body: JSON.stringify({ 
                    Num1: num1_int, 
                    Num2: num2_int 
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            });
            console.log(response);

            if (response.ok) { // if HTTP-status is 200-299
                let json = await response.json();
                console.log(json);

                if(json.Status == 'succeed') { // if our number is IB
                    sumResult.innerHTML=json.Result;
                    sumResultBox.style="display: inline;" 
                } else {
                    alert("Error!");
                }

            } else {
                alert("HTTP-Error: " + response.status);
            }
        }
    };

    // Define onClick Listener of 'Get a line' form 
    submitGetLine.onclick = async (e) => {
        e.preventDefault();

        var line = reqLineNumber.value;

        if(apiGetLine.checked) {
            console.log('User request is getting line ' + line + ' in the document using Golang');

            let response = await fetch(url + 'go/write?line=' + line); // toDo : '/write?line=' -> 'go/write?line='
            console.log(response);

            if (response.ok) { // if HTTP-status is 200-299
                let json = await response.json();
                console.log(json);

                if(json.Status == 'succeed') { // if our number is IB
                    getLineResult.innerHTML=json.Result;
                    getLineResultBox.style="display: inline;" 
                } else {
                    alert("Line Index is invalid!");
                }

            } else {
                alert("HTTP-Error: " + response.status);
            }

        } else {
            console.log('User request is getting line ' + line + ' in the document using NodeJS');
           
            let response = await fetch(url + 'node/write?line=' + line); // toDo : '/write?line=' -> 'node/write?line='
            console.log(response);

            if (response.ok) { // if HTTP-status is 200-299
                let json = await response.json();
                console.log(json);

                if(json.Status == 'succeed') { // if our number is IB
                    getLineResult.innerHTML=json.Result;
                    getLineResultBox.style="display: inline;" 
                } else {
                    alert("Line Index is invalid!");
                }

            } else {
                alert("HTTP-Error: " + response.status);
            }
        
        }
    };

});