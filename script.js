const colorpicker = document.getElementById("colorPicker");
const backgroundcolor = document.getElementById("backgroundColor");
const canvas = document.getElementById("myCanvas");
const fontsize = document.getElementById("fontSize");
const clearbtn = document.getElementById("clearButton");
const savebtn = document.getElementById("saveButton");
const retrievebtn = document.getElementById("retrieveButton");
const night = document.getElementById("nightmode")


const ctx = canvas.getContext('2d')

colorpicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;

})

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

backgroundcolor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500);
})

fontsize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

clearbtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

savebtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    // Create a new <a> element
    let link = document.createElement('a');

    // Set the download attribute and the href attribute of the <a> element
    link.download = 'my-signature.png';
    link.href = canvas.toDataURL();

    // Dispatch a click event on the <a> element
    link.click();
});

retrievebtn.addEventListener('click', () => {
    // Retrieve the saved canvas contents from local storage
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});
var isclicked = false
night.addEventListener('click', ()=>{
    if(!isclicked){
        document.getElementById('body').style.backgroundColor="black";
        document.getElementById('top').style.color="white";
        document.getElementById('myCanvas').style.backgroundColor="#14213d";
        document.getElementById('nightbtn').classList.add('btnVisiblity')
        document.getElementById('daybtn').classList.remove('btnVisiblity')
        isclicked=true;
    }
    else if(isclicked){
        document.getElementById('body').style.backgroundColor="white";
        document.getElementById('top').style.color="black";
        document.getElementById('myCanvas').style.backgroundColor="beige";
        document.getElementById('daybtn').classList.add('btnVisiblity')
        document.getElementById('nightbtn').classList.remove('btnVisiblity')
        isclicked=false;
    }
})