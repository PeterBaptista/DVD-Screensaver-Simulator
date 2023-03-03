let square = document.getElementById("square");
let container = document.getElementById("container")
let movementTypeHorizontal = "left-right";
let movementTypeVertical = "top-bottom";

let changeCount = 1;

let position = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
}

//handle the x axis of the square
function moveControlHorizontal(speed, position){
    if(movementTypeHorizontal === "left-right"){
        moveRight(speed, position);
        
    }
    else if(movementTypeHorizontal === "right-left"){
        moveLeft(speed, position);
        
    }
    if(checkBoundsHorizontal(position)){
     
        switch(movementTypeHorizontal){
            case "right-left":
                movementTypeHorizontal = "left-right";
                break;
            case "left-right":
                movementTypeHorizontal = "right-left";
                break;      
        }
        console.log(movementTypeHorizontal);
    }
    
}

// increment the x axis of the square;
function moveRight(speed, position){
    position.left = position.left + speed;
    position.right -= speed;

    square.style.left = position.left.toString() + "px";
    square.style.right = position.right.toString() + "px";
    
}

// decreases the x axis of the square
function moveLeft(speed, position){
    position.right = position.right + speed;
    position.left -= speed;

    square.style.right = position.right.toString() + "px";
    square.style.left = position.left.toString() + "px";

}
// handle the y axis of the square
function moveControlVertical(speed, position){
    if(movementTypeVertical === "top-bottom"){
        moveDown(speed, position);
        
    }
    else if(movementTypeVertical === "bottom-top"){
        moveUp(speed, position);
    }

    if(checkBoundsVertical(position)){
     
        switch(movementTypeVertical){
            case "top-bottom":
                movementTypeVertical = "bottom-top";
                break;
            case "bottom-top":
                movementTypeVertical = "top-bottom";
                break;      
        }
        console.log(movementTypeVertical);
    }
    
}


// increment the y axis of the square
function moveUp(speed, position){
    position.top -= speed;
    position.bottom += speed;

    square.style.top = position.top.toString() + "px";
    square.style.bottom = position.bottom.toString() + "px";
    
}

// decrease the y axis of the square
function moveDown(speed, position){
    position.bottom -= speed;
    position.top += speed;

    square.style.bottom = position.bottom.toString() + "px";
    square.style.top = position.top.toString() + "px";
   
    
}

//checks if the walls were hit by the square
function checkBoundsVertical(position)
{   

    if(position.top <= 0 || position.bottom <= 10){
        changeColor();
        return true;
    }
    return false;
}

function checkBoundsHorizontal(position)
{   

    if(position.left <= 0 || position.right <= 10){
        changeColor();
        return true;
    }
    return false;
}

// change the color when it hit the walls
function changeColor(){
    let colorCase = changeCount % 6;
    switch(colorCase){
        case(0):
        square.style.backgroundColor = "#4357AD";
            break;

        case(1):
        square.style.backgroundColor = "#F79824";
        break;
        
        case(2):
        square.style.backgroundColor = "#85CB33";
        break;
        
        case(3):
        
        square.style.backgroundColor = "#100B00";
        break;

        case(4):
        square.style.backgroundColor = "#F15152";
        break;
        
        case(5):
        square.style.backgroundColor = "#3AAFB9";
        break;
    }
    
    changeCount++;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleResizing() {
    clearInterval(movementHorizontal);
    clearInterval(movementVertical);
    await sleep(100); 
    movementHorizontal = setInterval(() =>{moveControlHorizontal(speed, position)}, 16);
    
    movementVertical = setInterval(() => {moveControlVertical(speed, position)}, 16);
}

// give us the absolute position of the square (top and left are 0).
position.right = parseInt(container.offsetWidth) - 70;
position.bottom = parseInt(container.offsetHeight) - 70;

// the quantity of pixels it goes per frame
let speed = 2;


let movementHorizontal = setInterval(() =>{moveControlHorizontal(speed, position)}, 16);
let movementVertical = setInterval(() => {moveControlVertical(speed, position)}, 16);

window.addEventListener("resize", function() {
    handleResizing();
    position.left = 1;
    position.right = parseInt(container.offsetWidth) - 70;
    position.bottom = parseInt(container.offsetHeight) - 70;
    position.top = 1;
  });


