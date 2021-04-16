var toName = 'Bob'
var from = 'everyone'


var baseURL = `https://foaas.com`
var foURL = `https://foaas.com/operations`

let foArray = [];
let apiArray = [];
let btnArray = [];
let spanArray = [];

$("#nameBtn").on("click", function(){
    toName = $("#toName").val().trim()
    from = $("#fromName").val().trim()
    localStorage.setItem("toName", toName)
    localStorage.setItem("fromName", from)
    apiCalls();
})


function apiCalls() {   
    var jsonTransfer
    fetch(foURL)
    .then(response => response.json())
    .then(data => jsonTransfer = data)
    .then(() => handleMessage(jsonTransfer));

}

function handleMessage(jsonTransfer) {

    jsonTransfer,
    removeValFromIndex = [0, 5, 13, 20, 23, 32, 39, 47, 63, 65, 69, 72, 89];
    
    // using the following for loop to remove the specific values from the array
     for (var i = removeValFromIndex.length - 1; i >= 0; i--)
    jsonTransfer.splice(removeValFromIndex[i], 1);
    // shuffle the json
    jsonTransfer.sort(() => Math.random() - .5);


    // taking the entire array and replacing the api queries
     for (let i = 0; i < jsonTransfer.length; i++) {
         //this is for the URLs for the api call
         let url = jsonTransfer[i].url;
         url = url.replace(":from", from);
         url = url.replace(":name", toName);
         url = baseURL + url;
         foArray.push(url);
         //this is for the name that will display on the button
         let foName = jsonTransfer[i].name;
         btnArray.push(foName);
     }

     //pull the first 20 URLs for the API call
     apiArray = foArray.slice(0, 20);

     //pull the first 20 names for the button
     btnArray = btnArray.slice(0, 20)
    
    hiddenSpan();
}



// this function gets the string of text that the TTS will read
function hiddenSpan(){
    let counter = 0
    // for loop runs through each api call and adds each response to spanArray 
    for (let i = 0; i < apiArray.length; i++) {
        fetch(apiArray[i], { headers: {  'Content-Type': 'application/json', 'Accept': 'text/plain' } })
        .then(response => response.text())
        .then(text => {
            
            spanArray[i] = text
            counter ++
           
            if(counter === apiArray.length) {
                makeBtn()
            }
        })
    } 
    
}

function makeBtn(){

    var btnArea = document.getElementById("btnArea");


    for (let i = 0; i < spanArray.length; i++) {

        var btn = document.createElement("button");

        btn.innerHTML = censor(btnArray[i]);
        btn.classList.add("button", "is-large", "is-info", "is-outlined", "speakClass");
        btn.setAttribute('name', censor(spanArray[i]));
        btn.setAttribute('id', 'btn' + [i]);
        btnArea.appendChild(btn);
    }
}

// trigger function

