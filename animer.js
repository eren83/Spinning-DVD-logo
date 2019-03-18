var dvd_logos  = [];
var xPos, yPos, xFart, yFart, krasj, vinkel, vinkelfart;
const xStorrelse = window.innerWidth;
const yStorrelse = window.innerHeight;
const xStorrelseLogo = 400;
const yStorrelseLogo = 200;
const fps = 60;
const hastighet = 6*(60/fps);

function setup() {
    createCanvas(xStorrelse, yStorrelse);
    for(let i = 0; i < 5; i++){
        dvd_logos[i] = loadImage("dvdlogo-0" + i + ".png");
    }
    angleMode(RADIANS)
    xPos = random(0, xStorrelse - xStorrelseLogo);
    yPos = random(0, yStorrelse - yStorrelseLogo);
    xFart = random() < 0.5 ? hastighet:-hastighet;
    yFart = random() < 0.5 ? hastighet:-hastighet;
    krasj = Math.floor(random(0,4));
    vinkel = 0;
    vinkelfart = TWO_PI/(5*fps);
    imageMode(CENTER);
    frameRate(fps);

}

function draw() {
    background(0)
    push(); 
    translate(xPos, yPos);
    rotate(vinkel);
    image(dvd_logos[krasj], 0, 0, xStorrelseLogo, yStorrelseLogo);
    pop();
    oppdater();
}

function oppdater() {
    let hjorner= [];
    hjorner[0] = findHjorne(xPos, yPos, 0-(xStorrelseLogo/2), 0-(yStorrelseLogo/2), vinkel);
    hjorner[1] = findHjorne(xPos, yPos, xStorrelseLogo-(xStorrelseLogo/2), 0-(yStorrelseLogo/2), vinkel);
    hjorner[2] = findHjorne(xPos, yPos, 0-(xStorrelseLogo/2), yStorrelseLogo-(yStorrelseLogo/2), vinkel);
    hjorner[3] = findHjorne(xPos, yPos, xStorrelseLogo-(xStorrelseLogo/2), yStorrelseLogo-(yStorrelseLogo/2), vinkel);
    for(let i = 0; i < hjorner.length; i++){
        if(hjorner[i][0] < 0){
            xFart = hastighet;
            krasj++;            
            krasj = krasj % dvd_logos.length;
        }
        if(hjorner[i][0] > xStorrelse){
            xFart = -hastighet;
            krasj++;
            krasj = krasj % dvd_logos.length;
        }
        if(hjorner[i][1] < 0){
            yFart = hastighet;
            krasj++;
            krasj = krasj % dvd_logos.length;
        }
        if(hjorner[i][1] > yStorrelse){
            yFart = -hastighet;
            krasj++;
            krasj = krasj % dvd_logos.length;
        }
    }
    xPos += xFart;
    yPos += yFart;
    vinkel += vinkelfart;
    vinkel = vinkel % TWO_PI;
}

function findHjorne(px, py, x, y, theta){

    let rotertX = x*cos(theta) - y*sin(theta);
    let rotertY = x*sin(theta) + y*cos(theta);

    return [rotertX + px, rotertY + py]
}