//
// HOMEWORK 2
// Due: Monday Feb 22 (23h59)
//
// Put team members + any remarks in a README file that you submit in your final .zip file
//

function roundN (n, i) { // Colin Done
    return Math.round(n / (10**i)) * (10**i)
}

function range (n, m) { //Shirin
    throw('not implemented')
}

function positive (arr) { //Shirin
    throw('not implemented')
}

function positiveStr (s) { // Maia
    let x = ''
    let neg = false
    for (let letter of s){  
        if (letter === '-'){
            neg = true
        }
        if (letter === ';'){
            neg = false
        }
        if (letter != ';' && (letter - '0') > 0 && neg == false){
            if (x.length > 0) {
                x+= ';' + letter
            }
            else x += letter
        }
    }
    return x
}

function mapStr (s, sep, f) { // Colin Done
    let items = s.split(sep)
    let transformed = items.map(f)
    return transformed.join(sep)
}


const sample = [
    {a: 1,     b: 2,     c: 3},
    {a: 10,    b: 20,    c: 30},
    {a: 99,    b: 66,    c: 33},
    {a: 1,     b: 20,    c: 33},
    {a: 10,    b: 66,    c: 3},
    {a: 99,    b: 2,     c: 30}
]

const sample_obj = {
    a: 33,
    b: 66,
    c: 99,
    x: ['this', 'is', 'a', 'string'],
    y: [1, 2, 3],
    z: []
}

function distinct (objs, field) { // Colin Done
    const distinct = new Set()

    for (let obj of objs){
        for (let item in obj){
            if (item === field){
                distinct.add(obj[item])
            }
        }
    }
    return Array.from(distinct)
}

function sort (objs, field) { // Maia
    //TODO: fix me!!
    let arr = []
    for (index in objs.length){
        console.log(arr)
        console.debug(arr)
        // for (){
        if (objs[index][field]> objs[index+1][field]){
            arr.push(objs[index])
            arr.push(objs[index+1])
            console.log(arr)
            console.log(objs[index])
            // objs[index] = objs[index+1]
            // objs[index + 1] = temp

        // }
        }
        console.log(arr)
        return arr
        }
    }
    
// }

function sum (objs, field1, field2) { // Maia
    throw('not implemented')
}

function group (objs, field) { // Colin Done
    let dict = {}
    for (let obj of objs){
        for (let item in obj){
            if (item === field){
                if (obj[item] in dict){
                    dict[obj[item]].push(obj)
                } 
                else{
                    dict[obj[item]] = [obj]
                }
            }
        }
    }
    return dict
}

function expand (obj, field) { // Shirin
    throw('not implemented')
}



class Empty {
    
    isEmpty() {
	return true
    }

    size() {
	return 0
    }

    height(){
    return 0
    }
    fringe(){
        return []
    }
    preorder(f){
        return
    }
    map(f){
        return this
    }
    trim()
    {
        return new Empty()
    }
    toJSON(){
        return {}
    }
}


class Node {
    
    constructor(value, left, right) {
	this.value = value
	this.left = left
	this.right = right
    }

    isEmpty() {
	return false
    }

    size() {
	return 1 + this.left.size() + this.right.size()
    }

    height(count=0){
        if (this.left.isEmpty() && this.right.isEmpty()){
            return count + 1
        }
        return Math.max((this.left).height(count+1), (this.right).height(count+1))
    }

    fringe(items = []){
        if (this.left.isEmpty() && this.right.isEmpty()){
            return [this.value]
        }
        return this.left.fringe(items).concat((this.right.fringe(items)))
    }

    preorder(f){
        
        this.value = f(this.value)
        this.left.preorder(f)
        this.right.preorder(f)
    }

    map(f){
        return new Node(f(this.value), this.left.map(f), this.right.map(f))
    }
    trim(){
        if (this.left.isEmpty() && this.right.isEmpty()){
            return new Empty()
        }
        return new Node(this.value, this.left.trim(), this.right.trim())
    }
    toJSON(){ // done

        if (!this.left.isEmpty() && !this.right.isEmpty()){
            return {value: this.value, left: this.left.toJSON(), right: this.right.toJSON()}
        }
    
        if (!this.left.isEmpty()){
            return {value: this.value, left: this.left.toJSON()}
        }
    
        if (!this.right.isEmpty()){
            return {value: this.value, right: this.right.toJSON()}
        }

        return {value: this.value}
    }
}

function fromJSON(j){ // done

    if ("left" in j && "right" in j){
        return node(j.value, fromJSON(j.left), fromJSON(j.right))
    }

    if ("left" in j){
        return node(j.value, fromJSON(j.left), new Empty())
    }

    if ("right" in j){
        return node(j.value, new Empty(), fromJSON(j.right))
    }

    return node(j.value, new Empty(), new Empty())
}


const sample_arr_1 = [
    {id: 'a', value: 1, left: 'b', right: 'c'},
    {id: 'b', value: 2, left: 'd', right: 'e'},
    {id: 'c', value: 3, left: 'f', right: 'g'},
    {id: 'd', value: 4, left: 'h'},
    {id: 'e', value: 5, right: 'i'},
    {id: 'f', value: 6},
    {id: 'g', value: 7},
    {id: 'h', value: 8},
    {id: 'i', value: 9}
]

const sample_arr_2 = [
    {id: 'john', value: 'L'},
    {id: 'paul', value: 'M'},
    {id: 'george', value: 'H', left: 'john', right: 'paul'},
    {id: 'ringo', value: 'S', left: 'george', right: 'george'},
]


function fromArray(arr){ // done

    let nodes = {}
    const children = new Set()

    // Create a node for each item
    for (i of arr){
        // console.log(i.id)
        current_node = node(i.value, new Empty(), new Empty())
        nodes[i.id] = current_node
    }

    for (i of arr){
        current_node = nodes[i.id]
        // console.log(i.left)
        if (i.left in nodes){
            current_node.left = nodes[i.left]
            children.add(i.left)
        }
        if (i.right in nodes){
            current_node.right = nodes[i.right]
            children.add(i.right)
        }
        nodes[i.id] = current_node
    }

    // find head node
    for (i of arr){
        if (!(children.has(i.id))){
            return nodes[i.id]
        }
    }
}



// helper functions
const leaf = (v) => new Node(v, new Empty(), new Empty())
const node = (v, l, r) => new Node(v, l, r)

const sample_tree = node(10,
			 node(20, node(40, leaf(80), leaf(90)),
                                  node(50, leaf(100), leaf(110))),
			 node(30, leaf(60), leaf(70)))








function check_tests(){

    // console.assert (roundN(293847.6, 0) === 293848)
    // console.assert (roundN(293847.6, 1) === 293850)
    // console.assert (roundN(293847.6, 2) === 293800)
    // console.assert (roundN(293847.6, 3) === 294000)
    // console.assert (roundN(293847.6, 4) === 290000)
    // console.assert (roundN(293847.6, 5) === 300000)
    // console.assert (roundN(293847.6, 6) === 0)

    // console.assert (range(0, 10) === [
    //     0, 1, 2, 3, 4,
    //     5, 6, 7, 8, 9
    //   ])

    // console.log(new Empty().height())
    // console.log(new Node(10, new Empty(), new Empty()).height())
    // console.log(sample_tree.height())
    // console.log(new Empty().fringe())
    // console.log(new Node(10, new Empty(), new Empty()).fringe())
    // console.log(sample_tree.fringe())

    console.assert(positiveStr('-1;1;3;-5;7'))
    console.log(positiveStr('-1;1;3;-5;7'))

    console.log(sort(sample, 'a'))
    
    // console.assert(new Empty().height() === 0)
    // console.assert(new Node(10, new Empty(), new Empty()).height() === 1)
    // console.assert(sample_tree.height() === 4)
    // console.log(distinct([], 'a'))
    // console.log(distinct(sample, 'a'))
    // console.log(distinct(sample, 'b'))
    // console.log(distinct(sample, 'c'))

    // console.log(group(sample, 'a'))
    // console.log(group([], 'a'))
    // console.log(group(sample, 'b'))
    // console.log(group(sample, 'c'))

    // const test = (v) => { console.log('value = ', v) }
    // new Empty().preorder(test)

    // new Node(10, new Empty(), new Empty()).preorder(test)

    // sample_tree.preorder(test)

    // console.log(new Empty().map((v) => v * v))
    // console.log(new Node(10, new Empty(), new Empty()).map((v) => v * v))
    // console.log(sample_tree.map((v) => v * v))
    
    // new Empty().trim()
    // console.log(new Node(10, new Empty(), new Empty()).trim())
    // console.log(sample_tree.trim())





    // console.log(fromJSON({value: 1}))
    // console.log(fromJSON({value: 1, left: {value: 2, left: { value: 3}}, right: {value: 4, right: { value: 5}}}))

    // console.log(new Empty().toJSON())
    // console.log(new Node(10, new Empty(), new Empty()).toJSON())
    // console.log(sample_tree.toJSON())
    // console.log(JSON.stringify(sample_tree.toJSON(), null, 2))


    // console.log(fromArray(sample_arr_1))
    // console.log(fromArray(sample_arr_2))




    

}

check_tests()
