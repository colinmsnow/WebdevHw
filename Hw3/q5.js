/* Code for hw3 q5*/

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
}

function updatetable(c, inputElement, tableElement){
    // Save value to element and remove the input box
    tableElement.innerHTML = inputElement.value
    inputElement.parentNode.removeChild(inputElement);
}

window.onload = init
function init(){
    makeEditableTable('test-table')
}