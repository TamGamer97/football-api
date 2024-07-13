
table.children[0].children[1].children[0].innerText


var r = 1;
var c = 0

var myTable = []

var match = { 'team1': '', 'team2': '', 'score':'', 'date': '' }

while (true){

    if(r == 9)
    {
        break
    }   

    console.log(r, c)

    if(c == 0)
    {
        match.date = table.children[0].children[r].children[c].innerText
    }
    if(c == 1)
    {
        match.team1 = table.children[0].children[r].children[c].innerText
    }
    if(c == 2)
    {
        match.score = table.children[0].children[r].children[c].innerText
    }
    if(c == 3)
    {
        match.team2 = table.children[0].children[r].children[c].innerText
    }
    
    c++
    if(c == 4)
    {
        myTable.push(match)
        console.log(match)
        console.log(myTable)

        match = {}

        c = 0
        r++
    }

}
