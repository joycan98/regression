var data = [];
var m = 1;
var b = 0;
var vertical = false;

function setup(){
    createCanvas(400, 400);
    background(51);
}

function linearRegression(){
    var x_sum = 0;
    var y_sum = 0;
    for (var i = 0; i < data.length; i++){
        x_sum += data[i].x;
        y_sum += data[i].y;
    }
    var x_mean = x_sum/data.length;
    var y_mean = y_sum/data.length;

    var num = 0;
    var den = 0;
    for (var i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
        num += (x-x_mean) * (y-y_mean);
        den += (x-x_mean) * (x-x_mean);
    }
    if (den !== 0){
        vertical = false;
        m = num/den;
        b = y_mean-m*x_mean;
    } else {
        vertical = true;
        m = x_mean;
    }
}

function drawLine() {
    var x_1 = 0;
    var x_2 = 1;
    if (vertical) {
        stroke(255, 0, 255);
        m = map(m,0,1,0,width);
        line(m, 0, m, height);
    } else{
        var y_1 = m*x_1+b;
        var y_2 = m*x_2+b;
        x_1 = map(x_1,0,1,0,width);
        x_2 = map(x_2,0,1,0,width);
        y_1 = map(y_1,0,1,height,0);
        y_2 = map(y_2,0,1,height,0);
        stroke(255, 0, 255);
        line(x_1, y_1, x_2, y_2);
    }
}

function _clear() {
    data = [];
}

function undo() {
    data.pop();
}

function mousePressed() {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);
    if (x <= 1 && x>= 0 && y >= 0 && y<= 1) {
        var point = createVector(x, y);
        data.push(point);
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function draw() {
    background(51);

    for (var i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        stroke(255);
        fill(255);
        star(x, y, 3, 7, 5);
    }
    if (data.length > 1){
        linearRegression();
        drawLine();
    }
}
