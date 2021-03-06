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

function makeFilterableList(filterId, listId, items){
    // start filtering on input
    let filter = document.getElementById(filterId)
    let list = document.getElementById(listId)
    for(i=0;i<items.length-1;i+=2){
        list.innerHTML += items[i] + "<br>" + items[i+1] + "<br>";
    }
    filter.addEventListener('input', evt => {
        let newitems = items
        list.innerHTML = ""
        for (let str of items){
            newitems = items.filter(str => (str.includes(filter.value)))
        }
        if (newitems.length-1 == 0){
            list.innerHTML += newitems
        }
        else{
        for(i=0;i<newitems.length-1;i+=2){
            list.innerHTML += newitems[i] + "<br>" + newitems[i+1]+"<br>";
        }
        }
        })
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


function button_clicked(){
    const buttons = document.getElementById('buttons')
        buttons.addEventListener('click', evt => {
            if (evt.target.nodeName === 'BUTTON'){
                console.log(evt.target.id)
                the_button = document.getElementById(evt.target.id) // button
                console.log(the_button)
                console.log(evt.target.id.replace("button_", ""))
                the_div = document.getElementById(evt.target.id.replace("button_", "")) // div
                console.log(the_div)
            // hide everything of class tab
            let x = document.getElementsByClassName("tab");
            for (let elem of x){
                if (elem.id != the_div.id){
                    elem.style.display = "None"  
                } 
            }
            // show correct tab
            the_div.style.display = "block"
            }

            console.log(buttons.children)      
        for (let b of buttons.children){
            console.log("b" + b.toString())
            if (b.id != the_button.id){
                b.style.borderColor = "black"  
            } 
            else{
                b.style.borderColor = "blue"
            }
        }
        })
    }

window.onload = init
function init(){
    makeFilterableList('filter-input', 'filter-list', ['This is the first item', 'This is the second item', 'This is the third item', 'This is the fourth item but also not the first, right?'])
    makeEditableTable('test-table')
    makeTable('test-table-3', ['Name','Age', 'Profession'], [['Alice', 25, 'Software Engineer'], ['Bob', 30, 'Builder'], ['Charlie', 21, 'Painter'], ['Darlene', 32, 'Singer']])
    makeSortableTable('test-table-2', ['Name','Age', 'Profession'], [['Alice', 25, 'Software Engineer'], ['Bob', 30, 'Builder'], ['Charlie', 21, 'Painter'], ['Darlene', 32, 'Singer']])
    button_clicked()
}
