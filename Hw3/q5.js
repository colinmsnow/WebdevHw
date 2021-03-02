/* Code for hw3 q5*/

function makeEditableTable(id){


    console.log("This is a test")

    let mytable = document.getElementById(id)

    // mytable.addEventListener('click', table_clicked)

    for (var r = 0, n = mytable.rows.length; r < n; r++) {
        for (var c = 0, m = mytable.rows[r].cells.length; c < m; c++) {
            element = mytable.rows[r].cells[c]
            element.addEventListener('click', function() { table_clicked(this, id); } ) // calls function on clickedelement

        }
    }












    // let tablerect = mytable.getBoundingClientRect()
    // console.log(tablerect.top, tablerect.left, tablerect.bottom, tablerect.right)
    // console.log(mytable.rows)
    // let newdiv = document.createElement("div");
    // document.body.appendChild(newdiv)
    // newdiv.style.position = "absolute"
    // newdiv.style.left = tablerect.left
    // newdiv.style.top = tablerect.top
    // newdiv.style.width = tablerect.right-tablerect.left
    // newdiv.style.height = tablerect.bottom-tablerect.top
    // newdiv.setAttribute('left', tablerect.left)
    // newdiv.setAttribute('top', tablerect.top)

    // for (let i=0, row; row = mytable.rows[i]; i++){

    //     for (let j=0, col; col=row.cells[j]; j++)
    //         var rect = col.getBoundingClientRect();
    //         console.log(rect.top, rect.left, rect.bottom, rect.right)
    //         let inputBox = document.createElement("input")
    //         inputBox.setAttribute('type', 'text')
    //         inputBox.setAttribute('value', 'default')
    //         inputBox.setAttribute('position', 'absolute')
    //         inputBox.setAttribute('left', rect.left)
    //         inputBox.setAttribute('top', rect.top)

    //         newdiv.appendChild(inputBox)
           
            
    // }

    // let element = null

    // for (var r = 0, n = mytable.rows.length; r < n; r++) {
    //     for (var c = 0, m = mytable.rows[r].cells.length; c < m; c++) {
    //         element = mytable.rows[r].cells[c]
    //         console.log(element.innerHTML);

    //         var rect = element.getBoundingClientRect();
    //         console.log(rect.top, rect.left, rect.bottom, rect.right)
    //         let inputBox = document.createElement("input")
    //         inputBox.setAttribute('type', 'text')
    //         inputBox.setAttribute('value', mytable.rows[r].cells[c].innerHTML)
    //         inputBox.style.position = "absolute"
    //         inputBox.style.left =  rect.left
    //         inputBox.style.top =  rect.top
    //         inputBox.style.width = rect.right-rect.left
    //         inputBox.style.height = rect.bottom-rect.top
    //         // inputBox.setAttribute('width', rect.right-rect.left)

    //         newdiv.appendChild(inputBox)
    //     }
    // }





}

function table_clicked(a, id){

    let mytable = document.getElementById(id)
    let tablerect = mytable.getBoundingClientRect()
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
    console.log(a)
}

function updatetable(c, inputElement, tableElement){
    console.log(c)
    tableElement.innerHTML = inputElement.value
    inputElement.parentNode.removeChild(inputElement);

}

window.onload = init
function init(){
    makeEditableTable('test-table')
}