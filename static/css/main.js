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

if (clicks == 1){
     selectStart()
     createbutton()
    }
  
var grid = clickableGrid(2,5,function(el,row,col){
    if (clicks >= 1 && clicks < 3){
      if (clicks == 1){
        el.className='clicked';
        selectEnd()
      }
      el.className='clicked';
    }
  
    if (clicks == 2){
      selectWalls()
    }
  
    if (clicks >= 3){
      el.className='wall';
    }
    console.log("You clicked on row:",row+1, "col:", col+1);
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
  console.log("Hello")
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

arrayGrid()

document.body.appendChild(grid);
