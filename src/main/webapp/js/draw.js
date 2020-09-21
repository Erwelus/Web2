function drawCoordinateLine(context, x0, y0, x1, y1){
    const LENGTH = 6;

    context.fillStyle="black";

    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();

    context.beginPath();
    context.moveTo(x1, y1)
    context.lineTo(x1+(getSign(x0-x1)*LENGTH), y1+(getSign(x0-x1)*LENGTH));
    context.lineTo(x1-LENGTH,y1+LENGTH);
    context.fill();
}

function getSign(x) {
    if(x<0) return -1;
    else return 1;
}

function drawShapes(context, color, val) {

    let x = context.canvas.width/2;
    let y = context.canvas.height/2;

    let step = val*x/12;

    context.fillStyle = color;

    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, 2*step, 0, Math.PI/2, false);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x+step, y);
    context.lineTo(x, y-step);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x-2*step, y);
    context.lineTo(x-2*step, y-step);
    context.lineTo(x, y-step);
    context.fill();
}

function drawSystem(context, val) {
    let vals = [val, val/2, -val/2, -val];
    let x = context.canvas.width/2;
    let y = context.canvas.height/2;
    let step = val*x/12;

    context.fillStyle = "black";
    context.strokeStyle = "black";

    let count=0;
    for (let i = -2; i <=2 ; i++) {
        if (i !==0){
            context.fillText(vals[count], x+6, y+step*i+5);
            context.beginPath();
            context.moveTo(x-4, y+step*i);
            context.lineTo(x+4, y+step*i);
            context.stroke();
            count++;
        }
    }
    count=3;
    for (let i = -2; i <=2 ; i++) {
        if (i !==0){
            context.fillText(vals[count], x+step*i-5, y-10)
            context.beginPath()
            context.moveTo(x+step*i, y+4)
            context.lineTo(x+step*i, y-4)
            context.stroke()
            count--;
        }
    }
    drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
    drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);}

function draw() {
    let colors=["#004A7FFF", "#006EBCFF", "#0094FFFF", "#3DAEFFFF", "#7FC9FFFF"];
    let context = $('#canvas')[0].getContext('2d');

    let r_vals = document.querySelectorAll("input[name='R']");

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "black";
    drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
    drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);

    for (var i = r_vals.length - 1; i >= 0; i--) {
        if(r_vals[i].checked){
            drawShapes(context, colors[i], r_vals[i].value);
        }
    }
    drawPoints();
    //let max=0;
    for (let i = r_vals.length - 1; i >= 0; i--) {
        localStorage.setItem(`R${i}`, 'false');
        if(r_vals[i].checked){
            drawSystem(context, r_vals[i].value);
            localStorage.setItem(`R${i}`, 'true');
            /*if(r_vals[i].value>max){
                max = r_vals[i].value;
                $("input[serialize='true'][name='R']:checked").attr('serialize','false');
                r_vals[i].setAttribute('serialize','true');
            }*/
        }
    }
    validate();
}

function setCheck() {
    let r_vals = document.querySelectorAll("input[name='R']");
    for (let i = localStorage.length - 1; i >= 0; i--) {
        if(localStorage.getItem(`R${i}`) === 'true'){
            r_vals[i].checked=localStorage.getItem(`R${i}`);
        }
    }
}

function drawResult(x, y, alpha) {
    let context =  $('#canvas')[0].getContext('2d');

    let step = context.canvas.width/12;

    context.strokeStyle = `rgba(215,0,0,${alpha})`;
    context.fillStyle = `rgba(215,0,0,${alpha})`;

    //console.log(context.canvas.width);
    context.beginPath();
    context.moveTo(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step);
    context.arc(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step,4,0,2*Math.PI);
    context.fill();
}

function drawPoints(){
    let tbody_tr=$("#table_body tr");

    if (tbody_tr.length>0) {
        let i_old;
        let iter = 1;
        if (tbody_tr.length>5){
            i_old = tbody_tr.length -5;
        }else i_old=0;

        //console.log(tbody_tr.length);
        for (let i = tbody_tr.length-1; i >= i_old ; i--) {
            drawResult(parseFloat(tbody_tr[i].cells[0].textContent), parseFloat(tbody_tr[i].cells[1].textContent),5/(5*iter));
            iter++;
        }
    }
}


$(window).on("load",()=>{
    setCheck();
    draw();
});
$(window).resize(draw);
$('input[name=R]').on("change", draw);
$('#canvas').click(function (event) {
    if (document.querySelectorAll("input[name='R']:checked").length!==0) {
        const ctx = $("#canvas")[0].getContext('2d');
        let step = ctx.canvas.width / 12;
        let x = (event.offsetX - ctx.canvas.width/2) / step;
        let y = (ctx.canvas.height/2 - event.offsetY) / step;
        $("#x")[0].value = x.toFixed(10).toString();
        if ((x >= -5 && x <= 3) &&
            (y >= -2 && y <= 2)) {
            $("input[serialize='true'][name='Y']:checked").attr('serialize', 'false');
            $("input[name='Y']:checked").prop( "checked", false );
            $(`<td><input type="checkbox" name="Y" value="${y.toFixed(10).toString()}" serialize="true" checked>${y.toFixed(1).toString()}</td>`).insertAfter(".lastY");
            $("#submit")[0].disabled = false;
            $("#submit")[0].click();
        }else{
            alert("Координаты точки не удовлетворяют ограничениям:\n-5<=X<=3\n-2<=Y<=2")
        }
    }else{
        alert("Выберите R")
    }
});
