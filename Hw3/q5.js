/* Code for hw3 q5*/

function makeTable(id, headers, rows){
    //create an html table with a given id, and various rows and headers
    let table = document.getElementById(id)
    var thead = document.createElement("thead")
    var tr = document.createElement("tr")
    for (header of headers){
        let th = document.createElement("th")
        th.appendChild(document.createTextNode(header))
        tr.appendChild(th)
        thead.appendChild(tr)
    }
    table.appendChild(thead)
    
    var tbody = document.createElement("tbody")
    table.appendChild(tbody)
    for (row of rows){
        var tr = document.createElement("tr")
        tbody.appendChild(tr)
        for (cell of row){
            var td = document.createElement("td")
            td.innerHTML = cell
            tr.appendChild(td)
        }       
    }
   
   
}

function makeSortableTable(id, headers, rows){
    let table = document.getElementById(id)
    makeTable(id, headers, rows)
    for (var c = 0, m = table.rows[0].cells.length; c < m; c++) {
        table.rows[0].cells[c].addEventListener('click', evt => { 
        let col = 0
        for (let i = 0; i < headers.length; i++){
            if (headers[i] === evt.target.textContent){
                col = i
            }
        }
        for(var c = 0, m = table.rows[0].cells.length; c < m; c++){
            table.rows[0].cells[c].style.borderColor = "black"
        }
        evt.target.style.borderColor = "red"
        
        header_clicked(id, col)
    } ) 
    }
}

function header_clicked(id, col){
    console.log('clicked!')
    let table = document.getElementById(id) 
    rows = table.rows
    console.log(rows)

    while(!is_sorted(rows, col)){
        for (i = 1; i < (rows.length - 1); i++){
            var a = rows[i].cells[col].innerHTML
            var b = rows[i + 1].cells[col].innerHTML
            console.log(a)
            console.log(b)

            // // if(direction == 'ascending'){
            if (a.toLowerCase() > b.toLowerCase() || Number(a) > Number(b)){
                rows[i].parentNode.insertBefore(rows[i+1], rows[i])
            }
        }
    }
}

function is_sorted(rows, col){
    for (i = 1; i < (rows.length - 1); i++){
        if (rows[i].cells[col].innerHTML.toLowerCase() > rows[i + 1].cells[col].innerHTML.toLowerCase() || Number(rows[i].cells[col].innerHTML) > Number(rows[i + 1].cells[col].innerHTML)){
            return false
        }
    }
    return true
}

function makeEditableTable(id){
    // Make all elements of the table editable on click

    let mytable = document.getElementById(id)

    for (var r = 0, n = mytable.rows.length; r < n; r++) {
        for (var c = 0, m = mytable.rows[r].cells.length; c < m; c++) {
            // element = mytable.rows[r].cells[c]
            mytable.rows[r].cells[c].addEventListener('click', function() { table_clicked(this, id); } ) // calls function on clickedelement
            // mytable.rows[r].cells[c].addEventListener('click', function(){this.focus(); this.select()})
        }
    }
}

function table_clicked(a, id){
    // Find the clicked element, put a box on it, and set a listener

    let mytable = document.getElementById(id)
    let elementrect = a.getBoundingClientRect()

    let mi = document.createElement("input")
    mi.type= "text"
    mi.value = a.innerHTML
    mi.style.position = "absolute"
    mi.style.left = elementrect.left.toString() + 'px'
    mi.style.top = elementrect.top.toString() + 'px'
    mi.style.width = (elementrect.right - elementrect.left - 7).toString() + 'px'
    mi.style.height = (elementrect.bottom - elementrect.top - 6).toString() + 'px'

    mi.addEventListener("blur", function(c){updatetable(c, mi, a)})

    mytable.appendChild(mi)
    console.log("clicked")        
    var td = document.createElement('td');
}

function updatetable(c, inputElement, tableElement){
    // Save value to element and remove the input box
    tableElement.innerHTML = inputElement.value
    inputElement.parentNode.removeChild(inputElement);
}

window.onload = init
function init(){
    // makeEditableTable('test-table')
    // makeTable('test-table-2', ['Name','Age', 'Profession'], [['Alice', 25, 'Software Engineer'], ['Bob', 30, 'Builder'], ['Charlie', 21, 'Painter'], ['Darlene', 32, 'Singer']])
    makeSortableTable('test-table-2', ['Name','Age', 'Profession'], [['Alice', 25, 'Software Engineer'], ['Bob', 30, 'Builder'], ['Charlie', 21, 'Painter'], ['Darlene', 32, 'Singer']])
}
