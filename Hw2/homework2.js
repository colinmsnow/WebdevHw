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
    //TODO: Fix me!!
    let x = ''
    let neg = false
    for (let letter of s){
        console.log(letter)
    
        if (letter === '-'){
            neg = true
        }
        console.log(neg)
        if (letter === ';'){
            neg = false
        }
        console.log(neg)
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
    throw('not implemented')
}

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


}

// helper functions
const leaf = (v) => new Node(v, new Empty(), new Empty())
const node = (v, l, r) => new Node(v, l, r)

const sample_tree = node(10,
			 node(20, node(40, leaf(80), leaf(90)),
                                  node(50, leaf(100), leaf(110))),
			 node(30, leaf(60), leaf(70)))



function preorder(){

}




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
    






}

check_tests()
