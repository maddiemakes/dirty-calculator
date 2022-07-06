let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let canvasWidth = parseInt(htmlStyles.getPropertyValue("--gridWidth"));
let canvasHeight = parseInt(htmlStyles.getPropertyValue("--gridHeight"));
let hcolor = htmlStyles.getPropertyValue("--hcolor");
var inColor = document.getElementById("inColor");
var inWidth = document.getElementById("inWidth");
var inHeight = document.getElementById("inHeight");
let inScale = document.getElementById("inScale");
var imgScale = inScale.value;
var cont = document.getElementsByClassName("container")[0];
//var stuff = document.getElementById("itemshere");

document.onload = load();

function load() {
    inColor.value = hcolor;
    inWidth.value = canvasWidth;
    inHeight.value = canvasHeight;
    inScale.value = 10;
    gridReset();
}
function updateVar() {
    htmlStyles = window.getComputedStyle(document.querySelector("html"));
    canvasWidth = parseInt(htmlStyles.getPropertyValue("--gridWidth"));
    canvasHeight = parseInt(htmlStyles.getPropertyValue("--gridHeight"));
    hcolor = htmlStyles.getPropertyValue("--hcolor");
    imgScale = inScale.value;
    cont = document.getElementsByClassName("container")[0];
    
}
function gridReset() {
    delAll();
    for (var i=0; i < canvasHeight; i++) {
        for (var k=0; k < canvasWidth; k++) {
            add();
        }
    }
}
function add() {
    cont.innerHTML += '<div class="grid-item" onClick="colorMe(this)" style="background-color:white"></div>';
}

function delAll() {
    cont.innerHTML = '';
}

function setGridSize() {
    document.documentElement.style.setProperty('--gridWidth',inWidth.value);
    document.documentElement.style.setProperty('--gridHeight',inHeight.value);
    updateVar();
}

function setColor() {
    document.documentElement.style.setProperty('--hcolor',inColor.value);
    updateVar();
}

function saveButton() {
    if (hcolor != inColor.value) {
        setColor();
    }
    if (parseInt(canvasWidth) != parseInt(inWidth.value) || parseInt(canvasHeight) != parseInt(inHeight.value)) {
        if (confirm("This will delete your artwork. Are you sure?")) {
            setGridSize();
            gridReset();
        } else {
            inWidth.value = canvasWidth;
            inHeight.value = canvasHeight;
        }
    }
}

function colorMe(clicked) {
    clicked.style.backgroundColor = hcolor;
}

function download() {
//    imgScale = inScale.value;
    updateVar();
    var canvas = document.createElement("canvas");
    canvas.width = canvasWidth * imgScale;
    canvas.height = canvasHeight * imgScale;
    var ctx = canvas.getContext("2d");
    var j = 0;
    for (var i=1; i <= canvasHeight; i++) {
        for (var k=1; k <= canvasWidth; k++) {
            ctx.fillStyle = cont.childNodes[j].style.backgroundColor;
            ctx.fillRect((k*imgScale-imgScale),(i*imgScale-imgScale),imgScale,imgScale)
            j++;
        }
    }
//    document.body.appendChild(canvas);
    var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//    window.location.download = "image";
//    window.location.href=img;
    var link = document.createElement("a");
    link.download="image.png";
    link.href=img;
    link.click();
}

