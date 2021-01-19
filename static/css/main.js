function clickableGrid( rows, cols, callback ){
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr')); //Table Row
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td')); //TableData object
            cell.addEventListener('click',(function(el,r,c){
                callback(el,r,c);
            }).bind(this,cell,r,c));
        }
    }
    return grid;
}

var lastClicked;
var clicks=1;
var startingCoord = [];
var endingCoord = [];
var wallCoords = [];

if (clicks == 1){
     selectStart()
     createbutton()
    }
  
var grid = clickableGrid(20,62,function(el,row,col){
    if (clicks >= 1 && clicks < 3){
      if (clicks == 1){
        el.className='clicked';
        startingCoord.push(row+1, col+1); 
        selectEnd()
      }
      el.className='clicked';
    }
  
    if (clicks == 2){
      endingCoord.push(row+1, col+1);
      selectWalls()
    }
  
    if (clicks >= 3){
      var coordinate  = [row+1, col+1]
      wallCoords.push(coordinate)
      el.className='wall';
    }
    clicks++;
});

function selectStart(){
  var textLine = document.createElement("p")
  textLine.classList.add("instructions")
  textLine.setAttribute("id", "text")
  textLine.innerText = "Select Starting Node..."
  document.body.appendChild(textLine)
}

function selectEnd(){
  var removedBox = document.getElementById("text")
  removedBox.innerText = "Select Ending Node..."
}

function selectWalls(){
  var removedBox = document.getElementById("text")
  removedBox.innerText = "Select Walls..."
}

function createbutton(){
  var button = document.createElement("BUTTON")
  button.innerHTML = "Visualize!"
  button.classList.add("visualizeButton")
  button.onclick = function(){pathfinding()}
  document.body.appendChild(button)
}

function pathfinding(){
  console.log("Starting coordinate: " + startingCoord)
  console.log("Ending coordinate: " + endingCoord)
  console.log("Wall Coodinates are: " + wallCoords)
  loadPath(startingCoord)
}

// function loadPath(startingCoord){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function (){
//       if (this.readyState == 4 && this.status == 200) {
//         console.log(startingCoord)
//       }
//     };
//     xhttp.open("GET", Dijkstra.py, true);
//     xhttp.send;
// }

function loadPath(startingCoord){
  $.ajax({
    type: "POST",
    headers: {"Content-Type": "application/json"},
    url: $SCRIPT_ROOT + "/Dijkstra",
    data: {param: startingCoord}
  }).done(function (x){
    console.log("Executed")
  });
}






function arrayGrid(){
  var squares = new Array();
  for(var i = 0; i <= 20; i++)
  {
    squares[i] = new Array();
    for(var j = 0; j <= 62; j++)
        if (squares[i] == null)
            squares[i] = j;
        else
            squares[i].push(j);
  }
  console.log(squares)
}

//arrayGrid()

document.body.appendChild(grid);
