function generateOneGrid(){

  if(isBoardFull()){
    return;
  }

  let cellIndex = Math.floor(Math.random() * 100) % 16;//generate a integer between 0 and 16
  // cellindex cannot be 0 !
  while(document.getElementsByClassName("cell")[cellIndex].childNodes.length === 1){//to check if there's a grid
    cellIndex = Math.floor(Math.random() * 100) % 16;
  }

  let newGridNum = Math.floor(Math.random() * 100) % 16;

  while(newGridNum % 2 !== 0 && newGridNum % 4 !== 0){
    newGridNum = Math.floor(Math.random() * 100) % 16;
  }

  if(newGridNum % 4 === 0){
    let newGrid = document.createElement("div");
    newGrid.classList.add("grid","grid4");//a grid with class "grid" and "grid4"
    document.getElementsByClassName("cell")[cellIndex].appendChild(newGrid);
    let number4 = document.createElement("span");
    number4.classList.add("gridNum");// grid's child
    number4.innerHTML = "4";
    number4.style.transform = "scale(1.0)";
    newGrid.appendChild(number4);
    }

  else if(newGridNum % 2 === 0){
    let newGrid = document.createElement("div");
    newGrid.classList.add("grid","grid2");
    document.getElementsByClassName("cell")[cellIndex].appendChild(newGrid);
    let number2 = document.createElement("span");
    number2.classList.add("gridNum");
    number2.innerHTML = "2";
    number2.style.transform = "scale(1.0)";
    newGrid.appendChild(number2);
  }
}

generateOneGrid();
generateOneGrid();

let score = 0;
let flag = false;

function updateScore(number){
   score += number;
   document.getElementsByClassName("score-number")[0].innerHTML = score;//getElementByClassname returns a array
}

function restart(){
  let cellList = document.getElementsByClassName("cell");
  for(let i = 0; i < cellList.length; i++){
    cellList[i].childNodes[0].remove();
  }
  generateOneGrid();
  generateOneGrid();
}

function combineX(index1, index2) { //index2 is larger than index1
  let grid1 = document.getElementsByClassName("cell")[index1].childNodes[0];
  let grid2 = document.getElementsByClassName("cell")[index2].childNodes[0];
  let distBetweenTwoGrid = grid2.getBoundingClientRect().left - grid1.getBoundingClientRect().left;
  let gridNum = parseInt(grid1.childNodes[0].innerText);
  if(distBetweenTwoGrid > 0){
    grid1.style.transform = "translateX(" + distBetweenTwoGrid + "px" + ")";
  }
  else if(distBetweenTwoGrid < 0){
    distBetweenTwoGrid *= -1;
    grid1.style.transform = "translateX(-" + distBetweenTwoGrid + "px" + ")";
  }
  grid1.remove();
  grid2.setAttribute("class", "grid grid" + (2 * gridNum).toString());
  grid2.childNodes[0].innerHTML = 2 * gridNum;
  setTimeout(function() {
    grid2.style.transform = "scale(1.2)";
  }, 80);

  setTimeout(function() {
    grid2.style.transform = "scale(1.0)";
  }, 160);

  updateScore(2*gridNum);
  if(2*gridNum === 2048){
    let cfm = confirm("Congratulations! You have won the game! Do you want to continue?");
    if(cfm)
      return;
    else{
      restart();
    }
  }
}

function GameIsOver(score) {
  let test;
  for(test = 2048;test < 2 * test;test *= 2){
    if(score === test){
      alert("Congratulations! You have achieved the " + test.toString());
      document.getElementsByClassName("score-title")[0].innerHTML = (test * 2).toString();
      break;
    }
  }
}

function combineY(index1, index2) {//index1 goes to index2 no matter which one is larger
  let grid1 = document.getElementsByClassName("cell")[index1].childNodes[0];
  let grid2 = document.getElementsByClassName("cell")[index2].childNodes[0];
  let distBetweenTwoGrid = grid2.getBoundingClientRect().top - grid1.getBoundingClientRect().top;
  let gridNum = parseInt(grid1.childNodes[0].innerHTML);

  if(distBetweenTwoGrid > 0){
    grid1.style.transform = "translateY(" + distBetweenTwoGrid + "px" + ")";
  }
  else if(distBetweenTwoGrid < 0){
    distBetweenTwoGrid *= -1;
    grid1.style.transform = "translateY(-" + distBetweenTwoGrid + "px" + ")";
  }
  grid1.remove();
  grid2.setAttribute("class", "grid grid" + (gridNum * 2).toString());
  grid2.childNodes[0].innerHTML = 2 * gridNum;

  setTimeout(function() {
    grid2.style.transform = "scale(1.2)";
  }, 80);

  setTimeout(function() {
    grid2.style.transform = "scale(1.0)";
  }, 160);

  updateScore(2*gridNum);
  if(2*gridNum === 2048){
    let cfm = confirm("Congratulations! You have won the game! Do you want to continue?");
    if(cfm)
      return;
    else{
      restart();
    }
  }
  // GameIsOver(score);
}

function moveX(index1, index2) {
  // get two cells
  let cell1 = document.getElementsByClassName("cell")[index1];
  let cell2 = document.getElementsByClassName("cell")[index2];
  // calculate the dist between the two boxes' left bound
  let distBetweenTwoCell = cell2.getBoundingClientRect().left - cell1.getBoundingClientRect().left;
  // move towards two directions
  if(distBetweenTwoCell > 0){
    cell1.childNodes[0].style.transform = "translateX(" + distBetweenTwoCell + "px" + ")";
  }
  else if(distBetweenTwoCell < 0){
    distBetweenTwoCell *= -1;
    cell1.childNodes[0].style.transform = "translateX(-" + distBetweenTwoCell + "px" + ")";
  }

  cell2.appendChild(cell1.childNodes[0]);
  // cell1.childNodes[0].remove();
  cell2.childNodes[0].style.transform = "translateX(0)";
}

function moveY(index1, index2) {
  let cell1 = document.getElementsByClassName("cell")[index1];
  let cell2 = document.getElementsByClassName("cell")[index2];
  let distBetweenTwoCell = cell2.getBoundingClientRect().top - cell1.getBoundingClientRect().top;
  if(distBetweenTwoCell > 0){
    cell1.childNodes[0].style.transform = "translateY(" + distBetweenTwoCell + "px" + ")";
  }
  else if(distBetweenTwoCell < 0){
    distBetweenTwoCell *= -1;
    cell1.childNodes[0].style.transform = "translateY(-" + distBetweenTwoCell + "px" + ")";
  }
  
  cell2.appendChild(cell1.childNodes[0]);
  cell2.childNodes[0].style.transform = "translateY(0)"; 
}

function isGameLose() {
  let numMatrix = [];
  let numberArray = [];
  let lineNumberIndex = ["a", "b", "c", "d"];
  let queue = [];
  let visited = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
  let direction = [[1, 0], [0, 1]];
  let startX = 0;
  let startY = 0;
  let coordinate = [[startX, startY]];
  let x, y;

  for(let i = 0; i < 4; i++){
    numberArray = [];
    for(let j = 0; j < 4; j++){
      let gridNum;
      if(document.getElementsByClassName(lineNumberIndex[i])[j].childNodes[0] === undefined){
        return false;
      }
      else{
        gridNum = parseInt(document.getElementsByClassName(lineNumberIndex[i])[j].childNodes[0].childNodes[0].innerText);
        numberArray.push(gridNum);
      }
    }
    numMatrix.push(numberArray)
  }
  let start = numMatrix[0][0];
  queue.push(start);
  while(queue.length !== 0){
    let tmp = queue.shift();
    coordinate.shift();
    visited[startX][startY] = 1;
    for(let i = 0; i < 2; i++){
      x = startX + direction[i][0];
      y = startY + direction[i][1];
      if(x >= 0 && x <= 3 && y >= 0 && y <= 3 && visited[x][y] === 0){

        if(tmp === numMatrix[x][y]) return false;

        else if(!coordinate.includes([x, y])){
          queue.push(numMatrix[x][y]);
          coordinate.push([x, y]);
        }
      }
    }
    if(coordinate.length !== 0){
      startX = coordinate[0][0];
      startY = coordinate[0][1];
    }
  }
  return true;
}

let keystack = [];

document.addEventListener("keydown", function(e) {
  if(!e) e = window.event;
  if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
    keystack[keystack.length] = e.keyCode;
  }
});

let lineJson = {"a" : 0, "b" : 1, "c" : 2, "d" : 3};

function mergeLineR(lineIndex) {
  let factor = lineJson[lineIndex] * 4;
  let cellList = document.getElementsByClassName(lineIndex);
  let isCombine = false;
  let activate = false;
  let isMove = false;

  if (cellList[2].childNodes.length !== 0) {

    if (cellList[3].childNodes.length === 0) {
      moveX(2 + factor, 3 + factor);
      isMove = true;
    }
    else if (cellList[2].childNodes[0].childNodes[0].innerText ===
        cellList[3].childNodes[0].childNodes[0].innerText) {
      isCombine = true; //isCombine for combination success
      combineX(2 + factor, 3 + factor);
      activate = true; //if col 3 combines with col 4, then enables col1 to combine with col 2
    }
  }
  if (isCombine === false) {
    if (cellList[1].childNodes.length !== 0) {
      if (cellList[2].childNodes.length !== 0) {
        if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[2].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineX(1 + factor, 2 + factor);
          activate = false;
        }
      }
      else { // if col3 is empty
        if (cellList[3].childNodes.length === 0) { // if col 4 empty
          moveX(1 + factor, 3 + factor);
          isMove = true;
        }
        else if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[3].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineX(1 + factor, 3 + factor);
          activate = false;
        }
        else {
          moveX(1 + factor, 2 + factor);
          isMove = true;
        }
      }
    }
  }
  if (isCombine === true && activate === true) { // if col3 combines with col4
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[1].childNodes.length !== 0) {
        if (cellList[0].childNodes[0].childNodes[0].innerText ===
            cellList[1].childNodes[0].childNodes[0].innerText) {
          combineX(0 + factor, 1 + factor);
          moveX(1 + factor, 2 + factor);
        }
        else {
          moveX(1 + factor, 2 + factor);
          moveX(0 + factor, 1 + factor);
        }
      }
      else {
        moveX(0 + factor, 2 + factor);
      }
    }
    else {
      if (cellList[1].childNodes.length !== 0) {
        moveX(1 + factor, 2 + factor);
      }
    }
  }
  else if (isCombine === true && activate === false) { // col2 combines with col3 or col4
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[2].childNodes.length !== 0) {
        moveX(0 + factor, 1 + factor);
      }
      else {
        moveX(0 + factor, 2 + factor);
      }
    }
  }
  else { //col2 just move or do nothing or no col2
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[1].childNodes.length === 0) {
        if (cellList[2].childNodes.length === 0) {
          if (cellList[3].childNodes.length === 0) {
            moveX(0 + factor, 3 + factor);
            isMove = true;
          }
          else if (cellList[3].childNodes[0].childNodes[0].innerText ===
              cellList[0].childNodes[0].childNodes[0].innerText) {
            combineX(0 + factor, 3 + factor);
            isCombine = true;
          }
          else {
            moveX(0 + factor, 2 + factor);
            isMove = true;
          }
        }
        else if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[0].childNodes[0].childNodes[0].innerText) {
          combineX(0 + factor, 2 + factor);
          isCombine = true;
        }
        else {
          moveX(0 + factor, 1 + factor);
          isMove = true;
        }
      }
      else if (cellList[1].childNodes[0].childNodes[0].innerText ===
          cellList[0].childNodes[0].childNodes[0].innerText) {
        combineX(0 + factor, 1 + factor);
        isCombine = true;
      }
    }
  }
  if(isMove || isCombine){
    flag = true;
  }

  // if (isBoardFull()) {
  //   if (isGameLose()) {
  //     console.log("sorry, you lose!");
  //   }
  // }
}

function mergeLineL(lineIndex) {
  let factor = lineJson[lineIndex] * 4;
  let cellList = document.getElementsByClassName(lineIndex);
  let isCombine = false;
  let activate = false;
  let isMove = false;

  if (cellList[1].childNodes.length !== 0) {

    if (cellList[0].childNodes.length === 0) {

      moveX(1 + factor, 0 + factor);
      isMove = true;
    }
    else if (cellList[1].childNodes[0].childNodes[0].innerText ===
        cellList[0].childNodes[0].childNodes[0].innerText) {
      isCombine = true;
      combineX(1 + factor, 0 + factor);
      activate = true;
    }
  }
  if (isCombine === false) {

    if (cellList[2].childNodes.length !== 0) { //if col 2 is not empty

      if (cellList[1].childNodes.length !== 0) { //if val 3 equals to val 2

        if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[1].childNodes[0].childNodes[0].innerText) {

          isCombine = true;
          combineX(2 + factor, 1 + factor);
          activate = false;
        }
      }
      else {

        if (cellList[0].childNodes.length === 0) { // if col 4 empty
          moveX(2 + factor, 0 + factor);
          isMove = true;
        }
        else if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[0].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineX(2 + factor, 0 + factor);
          activate = false;
        }
        else {
          moveX(2 + factor, 1 + factor);
          isMove = true;
        }
      }
    }
  }
  if (isCombine === true && activate === true) {
    if (cellList[3].childNodes.length !== 0) {
      if (cellList[2].childNodes.length !== 0) {
        if (cellList[3].childNodes[0].childNodes[0].innerText ===
            cellList[2].childNodes[0].childNodes[0].innerText) {
          combineX(3 + factor, 2 + factor);
          moveX(2 + factor, 1 + factor);
        }
        else {
          moveX(2 + factor, 1 + factor);
          moveX(3 + factor, 2 + factor);
        }
      }
      else {
        moveX(3 + factor, 1 + factor);
      }
    }
    else {
      if (cellList[2].childNodes.length !== 0) {
        moveX(2 + factor, 1 + factor);
      }
    }
  }
  else if (isCombine === true && activate === false) { // col2 combines with col3 or col4
      if (cellList[3].childNodes.length !== 0) {
        if (cellList[1].childNodes.length !== 0) {
          moveX(3 + factor, 2 + factor);
        }
        else {
          moveX(3 + factor, 1 + factor);
        }
      }
  }
  else { //col2 just move or do nothing or no col2
    if (cellList[3].childNodes.length !== 0) {
      if (cellList[2].childNodes.length === 0) {
        if (cellList[1].childNodes.length === 0) {
          if (cellList[0].childNodes.length === 0) {
            moveX(3 + factor, 0 + factor);
            isMove = true;
          }
          else if (cellList[0].childNodes[0].childNodes[0].innerText ===
              cellList[3].childNodes[0].childNodes[0].innerText) {
            combineX(3 + factor, 0 + factor);
            isCombine = true;
          }
          else {
            moveX(3 + factor, 1 + factor);
            isMove = true;
          }
        }
        else if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[3].childNodes[0].childNodes[0].innerText) {
          combineX(3 + factor, 1 + factor);
          isCombine = true;
        }
        else {
          moveX(3 + factor, 2 + factor);
          isMove = true;
        }
      }
      else if (cellList[2].childNodes[0].childNodes[0].innerText ===
          cellList[3].childNodes[0].childNodes[0].innerText) {
        combineX(3 + factor, 2 + factor);
        isCombine = true;
      }
    }
  }

  if(isMove || isCombine){
    flag = true;
  }

  // if (isBoardFull()) {
  //   if (isGameLose()) {
  //     console.log("sorry, you lose!");
  //   }
  // }
}

function mergeColumnU(colIndex) {
  let factor = parseInt(colIndex) - 1;
  let cellList = document.getElementsByClassName(colIndex);
  let isCombine = false;
  let activate = false;
  let isMove = false;

  if (cellList[1].childNodes.length !== 0) {

    if (cellList[0].childNodes.length === 0) {
      moveY(4 + factor, 0 + factor);
      isMove = true;
    }
    else if (cellList[1].childNodes[0].childNodes[0].innerText ===
        cellList[0].childNodes[0].childNodes[0].innerText) {
      isCombine = true;
      combineY(4 + factor, 0 + factor);
      activate = true;
    }
  }
  if (isCombine === false) {

    if (cellList[2].childNodes.length !== 0) { //if col 2 is not empty

      if (cellList[1].childNodes.length !== 0) { //if val 3 equals to val 2

        if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[1].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineY(8 + factor, 4 + factor);
          activate = false;
        }
      }
      else {

        if (cellList[0].childNodes.length === 0) {
          moveY(8 + factor, 0 + factor);
          isMove = true;
        }
        else if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[0].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineY(8 + factor, 0 + factor);
          activate = false;
        }
        else {
          moveY(8 + factor, 4 + factor);
          isMove = true;
        }
      }
    }
  }
  if (isCombine === true && activate === true) { // if col3 really combines with col4

    if (cellList[3].childNodes.length !== 0) {
      if (cellList[2].childNodes.length !== 0) {
        if (cellList[3].childNodes[0].childNodes[0].innerText ===
            cellList[2].childNodes[0].childNodes[0].innerText) {
          combineY(12 + factor, 8 + factor);
          moveY(8 + factor, 4 + factor);
        }
        else {
          moveY(8 + factor, 4 + factor);
          moveY(12 + factor, 8 + factor);
        }
      }
      else {
        moveY(12 + factor, 4 + factor);
      }
    }
    else {
      if (cellList[2].childNodes.length !== 0) {
        moveY(8 + factor, 4 + factor);
      }
    }
  }
  else if (isCombine === true && activate === false) { // col2 combines with col3 or col4
    if (cellList[3].childNodes.length !== 0) {
      if (cellList[1].childNodes.length !== 0) {
        moveY(12 + factor, 8 + factor);
      }
      else {
        moveY(12 + factor, 4 + factor);
      }
    }
  }
  else {
    if (cellList[3].childNodes.length !== 0) {
      if (cellList[2].childNodes.length === 0) {
        if (cellList[1].childNodes.length === 0) {
          if (cellList[0].childNodes.length === 0) {
            moveY(12 + factor, 0 + factor);
            isMove = true;
          }
          else if (cellList[0].childNodes[0].childNodes[0].innerText ===
              cellList[3].childNodes[0].childNodes[0].innerText) {
            combineY(12 + factor, 0 + factor);
            isCombine = true;
          }
          else {
            moveY(12 + factor, 4 + factor);
            isMove = true;
          }
        }
        else if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[3].childNodes[0].childNodes[0].innerText) {
          combineY(12 + factor, 4 + factor);
          isCombine = true;
        }
        else {
          moveY(12 + factor, 8 + factor);
          isMove = true;
        }
      }
      else if (cellList[2].childNodes[0].childNodes[0].innerText ===
          cellList[3].childNodes[0].childNodes[0].innerText) {
        combineY(12 + factor, 8 + factor);
        isCombine = true;
      }
    }
  }
  if(isMove || isCombine){
    flag = true;
  }

  // if (isBoardFull()) {
  //   if (isGameLose()) {
  //     console.log("sorry, you lose!");
  //   }
  // }
}

function mergeColumnD(colIndex) {
  let factor = parseInt(colIndex) - 1;
  let cellList = document.getElementsByClassName(colIndex);
  let isCombine = false;
  let activate = false;
  let isMove = false;

  if (cellList[2].childNodes.length !== 0) {

    if (cellList[3].childNodes.length === 0) {
      moveY(8 + factor, 12 + factor);
      isMove = true;
    }
    else if (cellList[2].childNodes[0].childNodes[0].innerText ===
        cellList[3].childNodes[0].childNodes[0].innerText) {
      isCombine = true;
      combineY(8 + factor, 12 + factor);
      activate = true;
    }
  }
  if (isCombine === false) {
    if (cellList[1].childNodes.length !== 0) { //if col 2 is not empty

      if (cellList[2].childNodes.length !== 0) { //if val 3 equals to val 2

        if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[2].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineY(4 + factor, 8 + factor);
          activate = false;
        }
      }
      else { // if col3 is empty
        if (cellList[3].childNodes.length === 0) { // if col 4 empty
          moveY(4 + factor, 12 + factor);
          isMove = true;
        }
        else if (cellList[1].childNodes[0].childNodes[0].innerText ===
            cellList[3].childNodes[0].childNodes[0].innerText) {
          isCombine = true;
          combineY(4 + factor, 12 + factor);
          activate = false;
        }
        else {
          moveY(4 + factor, 8 + factor);
          isMove = true;
        }
      }
    }
  }
  if (isCombine === true && activate === true) { // if col3 really combines with col4
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[1].childNodes.length !== 0) {
        if (cellList[0].childNodes[0].childNodes[0].innerText ===
            cellList[1].childNodes[0].childNodes[0].innerText) {
          combineY(0 + factor, 4 + factor);
          moveY(4 + factor, 8 + factor);
        }
        else {
          moveY(4 + factor, 8 + factor);
          moveY(0 + factor, 4 + factor);
        }
      }
      else {
        moveY(0 + factor, 8 + factor);
      }
    }
    else {
      if (cellList[1].childNodes.length !== 0) {
        moveY(4 + factor, 8 + factor);
      }
    }
  }
  else if (isCombine === true && activate === false) { // col2 combines with col3 or col4
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[2].childNodes.length !== 0) {
        moveY(0 + factor, 4 + factor);
      }
      else {
        moveY(0 + factor, 8 + factor);
      }
    }
  }
  else {
    if (cellList[0].childNodes.length !== 0) {
      if (cellList[1].childNodes.length === 0) {
        if (cellList[2].childNodes.length === 0) {
          if (cellList[3].childNodes.length === 0) {
            moveY(0 + factor, 12 + factor);
            isMove = true;
          }
          else if (cellList[3].childNodes[0].childNodes[0].innerText ===
              cellList[0].childNodes[0].childNodes[0].innerText) {
            combineY(0 + factor, 12 + factor);
            isCombine = true;
          }
          else {
            moveY(0 + factor, 8 + factor);
            isMove = true;
          }
        }
        else if (cellList[2].childNodes[0].childNodes[0].innerText ===
            cellList[0].childNodes[0].childNodes[0].innerText) {
          combineY(0 + factor, 8 + factor);
          isCombine = true;
        }
        else {
          moveY(0 + factor, 4 + factor);
          isMove = true;
        }
      }
      else if (cellList[1].childNodes[0].childNodes[0].innerText ===
          cellList[0].childNodes[0].childNodes[0].innerText) {
        combineY(0 + factor, 4 + factor);
        isCombine = true;
      }
    }
  }
  if(isMove || isCombine){
    flag = true;
  }

  // if (isBoardFull()) {
  //   if (isGameLose()) {
  //     console.log("sorry, you lose!");
  //   }
  // }
}

function isBoardFull() {
  let count = 0;
  for (let i = 0; i < 16; i++) {
    if (document.getElementsByClassName("cell")[i].childNodes.length === 1)
      count++;
  }
  if (count === 16)
    return true;
  else
    return false;
}

let game = setInterval(function() {
  let dir = keystack.shift();
  switch(dir){
    case 37:
      mergeLineL("a");
      mergeLineL("b");
      mergeLineL("c");
      mergeLineL("d");
      if(flag === true){
        flag = false;
        setTimeout(generateOneGrid,160);
      }
      if (isBoardFull()) {
        if (isGameLose()) {
          let cfm = confirm("Sorry! You lose the game! Want to restart?")
          if(cfm){
            restart();
          }
          else{
            clearInterval(game);
          }
        }
      }
      break;
    case 38:
      for(let i = 1; i <= 4; i++){
        mergeColumnU(i);
      }
      if(flag === true){
        flag = false;
        setTimeout(generateOneGrid, 160);
      }
      if (isBoardFull()) {
        if (isGameLose()) {
          let cfm = confirm("Sorry! You lose the game! Want to restart?")
          if(cfm){
            restart();
          }
          else{
            clearInterval(game);
          }
        }
      }
      break;
    case 39:
      mergeLineR("a");
      mergeLineR("b");
      mergeLineR("c");
      mergeLineR("d");
      if(flag === true){
        flag = false;
        setTimeout(generateOneGrid, 160);
      }
      if (isBoardFull()) {
        if (isGameLose()) {
          let cfm = confirm("Sorry! You lose the game! Want to restart?")
          if(cfm){
            restart();
          }
          else{
            clearInterval(game);
          }
        }
      }
      break;
    case 40:
      for(let i = 1; i <= 4; i++){
        mergeColumnD(i);
      }
      if(flag === true){
        flag = false;
        setTimeout(generateOneGrid, 160);
      }
      if (isBoardFull()) {
        if (isGameLose()) {
          let cfm = confirm("Sorry! You lose the game! Want to restart?")
          if(cfm){
            restart();
          }
          else{
            clearInterval(game);
          }
        }
      }
      break;
    default:
      if (isBoardFull()) {
        if (isGameLose()) {
          let cfm = confirm("Sorry! You lose the game! Want to restart?")
          if(cfm){
            restart();
          }
          else{
            clearInterval(game);
          }
        }
      }
      return;
  }
},80);
/// 文 件 名：2048
/// 描    述：2048
/// 项目名称：Chrome_Plugin_2048      
/// 作    者：武汉大学国家网络安全学院@陈子祎
/// 发布日期：2019/12/17 16:06  
/// 文件版本：V1.0
/// @Copyright: 2019 www.whu.edu.cn. All rights reserved. 
/// All rights Reserved, Designed By www.whu.edu.cn