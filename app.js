const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width=700;
canvas.height=700;
//css 사이즈와  js에서 사용하는 캔버스 사이즈 둘다 지정해줘야 선이 그려짐

ctx.strokeStyle = "##2C2C2C";
ctx.lineWidth = 2.5;


let painting = false;
let filling= false;
//현재 필링모드인지 아닌지 구분위해 필요함

function stopPainting(){
    painting = false;

}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //console.log("create path", x, y);
        ctx.beginPath();
        ctx.moveTo(x,y);

    }else{
       // console.log("create line", x, y);
        ctx.lineTo(x,y);
        ctx.stroke();
        //path를 만들고 휙을그음
        //lineto, stroke는 마우스를 움직이는 내내 발생함
    }
}
function onMouseDown(event){
    painting=true;
}
function onMouseUp(event){
    //painting = false;
    stopPainting(); 
}
function handleColorClick(event){
    console.log(event.target.style);
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handelRangeChange(event){
    console.log(event);
    const size = event.target.value;
    ctx.lineWidth=size;
}
function handleModeClick(event){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling = true;
        mode.innerText="Paint";
    }
    

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    //마우스가 움직이는 위치 x,y값으로 path계산?
    canvas.addEventListener("mousedown", startPainting);
    //캔버스 위에서 마우스를 클릭할때는 페인팅을 시작함
    canvas.addEventListener("mouseup", stopPainting);
    //캔버스 위에서 클릭하지 않고 움직일때는 페인팅을 멈춤
    canvas.addEventListener("mouseleave", stopPainting);
    //마우스가 캔버스를 벗어났을때
}
//console.log(Array.from(colors));
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );

if(range){
    range.addEventListener("input", handelRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}