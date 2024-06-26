var empty;
var Number_of_moves;
var checkWin = false;
var time=0;
var tileID = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

window.addEventListener("load", startTimer, false);

function start() {
    Number_of_moves = 0;
    checkWin = false;

    for(var i=0; i < 16; i++) {
        var tmp = document.getElementById(i);
        tmp.className = "cell ";
    }

    randomNumber = tileID.sort(function () { return (Math.round(Math.random())-0.5);});
    while(!Problem.prototype.is_solvable(randomNumber)) {
        randomNumber = tileID.sort(function () { return (Math.round(Math.random())-0.5);});
    }

    for(var i=0; i < 16; i++) {
        var tmp = document.getElementById(i);
        if(randomNumber[i] == 16) {
            tmp.className = "cell empty";
            tmp.innerHTML = "";
            empty = i;
        }
        else
            tmp.innerHTML = randomNumber[i];
        }
        
}

function doClick(x)
{
    if(checkWin)
        return;

    if(x.id != empty+'') {
        var emptyI = Math.floor(empty/4);
        var emptyJ = empty % 4;
        var id_selected = Number(x.id);
        var selectedI = Math.floor(id_selected/4);
        var selectedJ = id_selected % 4;

        if((Math.abs(emptyI - selectedI) == 1 && emptyJ == selectedJ) ||
           (Math.abs(emptyJ - selectedJ) == 1 && emptyI == selectedI)) {

            document.getElementById(empty).className = "cell";
            document.getElementById(empty).innerHTML = x.innerHTML;

            x.className = "cell empty";
            x.innerHTML = '';

        empty = id_selected;
        Number_of_moves++;

        document.getElementById("moves").innerHTML = "Number of Moves thus far: " + Number_of_moves;

            if(isDone()){
            checkWin = true;
            document.getElementById("moves").innerHTML = "CONGRATS! Number of moves it took to complete: " + Number_of_moves;
				if(confirm("Congrats, you completed the puzzle! Would you like to start a new game? (Y/N)"))
					   window.location.reload();
            }
        }
    }
}

function simpleGame(){
    if(checkWin)
    {
        window.location.reload();
    }
    time = 0;
    Number_of_moves = 0;
    document.getElementById("moves").innerHTML = "Number of moves thus far: " + Number_of_moves;
    for(var i=0; i < 16; i++) {
        var tmp = document.getElementById(i);
        if(i == 14) {
            tmp.className = "cell empty";
            tmp.innerHTML = "";
            empty = i;
        }
        else if(i == 15) {
            tmp.className = "cell";
            tmp.innerHTML = "15";
        }
        else{
            tmp.innerHTML = i+1;
            tmp.className = "cell";
        }
    }
}
function lastClick() {
    var curr_state = currentState();
    var problem = new Problem(curr_state);
    var sol = Solver.a_star_search(problem);
    var result = "<ol>";
    for(var i = 0; i < sol.length; i++) {
        var n = moveNumb(sol[i],curr_state);
        curr_state = problem.result(sol[i],curr_state);
        result += "<li>move " + n + "</li>";
    }
    result += "</ol>";
    document.getElementById("steps").innerHTML = result;
}


function currentState() {
    var result = [];
    for(var i = 0; i < 16; i++) {
        var tmp = document.getElementById(String(i)).innerHTML;
        if(tmp == '') {
            result[i] = 16;
        }
        else {
            result[i] = Number(tmp);
        }
    }
    return result;
}

function moveNumb(action,state) {
    var i = state.indexOf(16);
    switch(action) {
    case Action.up:
        return state[Util.index(Util.x(i),Util.y(i) - 1)];
    case Action.down:
        return state[Util.index(Util.x(i),Util.y(i) + 1)];
    case Action.right:
        return state[Util.index(Util.x(i) + 1,Util.y(i))];
    case Action.left:
        return state[Util.index(Util.x(i) - 1,Util.y(i))];
    }
}

Array.prototype.clone = function() { return this.slice(0); };
Array.prototype.swap = function(i1,i2) {
    var copy = this.clone();
    var tmp = copy[i1];
    copy[i1] = copy[i2];
    copy[i2] = tmp;
    return copy;
};


var Problem = function(start_state) {
    this.init_state = start_state;
    return this;
}

Problem.prototype.is_solvable = function(start) {
    start = start.clone();    start.splice(start.indexOf(16), 1);
    start[15] = 16;
    var count = 0;
    for(var i = 0; i < 15; i++) {
        if(start[i] != i+1) {
            count++;
            var j = start.indexOf(i+1);
            start[j] = start[i];
            start[i] = i+1;
        }
    }
    return count % 2 == 0;
}


function isDone() {
    return document.getElementById('0').innerHTML == '1' &&
        document.getElementById('1').innerHTML == '2' &&
        document.getElementById('2').innerHTML == '3' &&
        document.getElementById('3').innerHTML == '4' &&
        document.getElementById('4').innerHTML == '5' &&
        document.getElementById('5').innerHTML == '6' &&
        document.getElementById('6').innerHTML == '7' &&
        document.getElementById('7').innerHTML == '8' &&
        document.getElementById('8').innerHTML == '9' &&
        document.getElementById('9').innerHTML == '10' &&
        document.getElementById('10').innerHTML == '11' &&
        document.getElementById('11').innerHTML == '12' &&
        document.getElementById('12').innerHTML == '13' &&
        document.getElementById('13').innerHTML == '14' &&
        document.getElementById('14').innerHTML == '15';
}


function startTimer()
{
    window.setInterval("updateTime()", 1000);
} 

function updateTime()
{ 
    ++time;
    document.getElementById("time").innerHTML ="Time taken to complete (seconds): " +time ;
} 