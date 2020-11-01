# Front end
The Front end part of this project contains a HTML file and a JavaScript file for connecting our UI layout to the designed API.

## UI Dependencies
For designing HTML and UI layout we used bootstrap@4.5.3. We also used another small repository for our toggle button and icons from [Font Awesome](https://fontawesome.com/icons?d=gallery). Our HTML also uses a photo for its background from [Freepik](https://image.freepik.com/free-photo/hand-laptop-keyboard-with-clean-background-work-home-concept_34939-423.jpg).

So our links in the HTML file is something like this :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```


## UI layout
Well the project features was not so much so it dose not have lots of icons. At the beginning it has a navigation bar. Because all of our project is just a one page so we decided to use the homework title and our names for its contents :D

We used a collapsible navigation bar and its code is : 

```htmls
<div>
   <div class="collapse" id="navbarToggleExternalContent">
      <div class=" p-4">
         <h5 class="text-white h4">Web Programming HW1</h5>
         <span class="text-muted">AmirHossein, Omid</span>
      </div>
   </div>
   <nav class="navbar navbar-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>
   </nav>
</div>
```
Then for showing our contents we used a centralized wrapper with responsive gap. Like this :

```html
<div class="row d-flex justify-content-center">
   <div class="col-md-10 col-xl-8"> 
      ...
``` 

Then inside this box we put our accordion wrapper with two cards that inside each of them we have each user form. Schematic HTML code would something like this :

```html
<!--Accordion wrapper-->
<div class="accordion md-accordion accordion-5" id="accordionEx5" role="tablist" aria-multiselectable="true">

   <!-- Accordion card -->
   <div class="card mb-4">

      <!-- Card header -->
      ...
      <!-- Card body -->
      ...
         <form>
            -> the form includes its inputs, a toggle button for changing between our back end request (NodeJS or GOLang),
             a sent request button, and a textarea for showing the result that is invisible at the page refresh.
   <\div>
<\div>    
```
## Connection of the front end to the back end
For doing this part we have a .JS file. First of all we find each form components. Then for their submit buttons we specify an onClickListener.

After that we get the state of the way that we want to communicate with the back end and fetch the request. Its code is something like this :

```java-scripts
submitSum.onclick = async (e) => {
   ...

   if(apiSum.checked) { // User request is sum of sha256 using Golang

      let response = await fetch(url + 'go/sha256' , 
                method: 'POST',
                body: JSON.stringify({ 
                    Num1: num1_int, 
                    Num2: num2_int 
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            });
      ...
   } else { // User request is sha256 using NodeJS
      let response = await fetch(url + 'node/sha256',
                method: 'POST',
                body: JSON.stringify({ 
                    Num1: num1_int, 
                    Num2: num2_int 
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            });
      ...
   }

   ...

```   
And finally when the response comes back we will fill and show the the result box. If the response was not Ok then we will alert the user :

```java-scripts
...
if (response.ok) { // if HTTP-status is 200-299
   let json = await response.json();
   console.log(json);

   if(json.Status == 'succeed') { // if our number is inside the bound
       getLineResult.innerHTML=json.Result;
       getLineResultBox.style="display: inline;" 
       } else {
          alert("Line Index is invalid!");
       }
    } else {
       alert("HTTP-Error: " + response.status);
    }
...
```
