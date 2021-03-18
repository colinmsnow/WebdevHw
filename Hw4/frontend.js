function elt(id) {
    // useful shortcut
    return document.getElementById(id)
}



class Model {
    constructor() {
        this.pictures = []
        this.pictures_detals = []
        this.current = null
	// list of functions to call when picture is added
        this.addedPictureSubscribers = []
    }

    // helper methods
    
    // getPicture() {
    //     return this.pictures[this.current]
    // }

    // subscription methods
    
    subAddedPicture(f) {
        this.addedPictureSubscribers.push(f)
    }
    
    // subChangedPicture(f) {
    //     this.changedPictureSubscribers.push(f)
    // }

    // actions
  
    changePicture(v) {
        this.current = v
	// go through every function in the list changedPictureSubscribers
	// and call each function with the index of the current picture
        for (const f of this.changedPictureSubscribers) { 
            f(v)
        }
    }

    // @ NEW ACTION
    
    fetchPictures() {
    this.pictures = []
    this.pictures_detals = []
	const pPics = fetch('http://localhost:8080/pictures')
	const process = (obj) => {
	    console.log('Received pictures =', obj)
        // console.log("LENGTH:")
        // console.log(obj.pictures.length)
        //     if (obj.pictures.length > 0) {
        console.log("LISTING PICTURES")
        for (const p in obj.pictures) { 
            console.log(p)
        }
        for (const p in obj.pictures) { 
            this.addLocalPicture(p)
        }
                // change picture to the first?
                // this.changePicture(0)
            
	}
	pPics.then((response) => response.json().then((v) => process(v)))
    }

    // @ NEW METHOD
        
    addLocalPicture(pict) {
        console.log("ADDING LOCAL PICTURE")
        console.log(pict)
        this.pictures.push(pict)
        this.fetchPicture(pict)
        const idx = this.pictures.length - 1
        // for (const f of this.addedPictureSubscribers) { 
            
        //     f(idx, pict)
        // }
        // this.changePicture(idx)
    }
        










    // @ NEW ACTION
    addPicture(pict) {
        console.log("MODEL GOT PICTURE URL")
	const pAddPict = fetch('http://localhost:8080/new-picture-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pict)
        })
	pAddPict.then((response) => {
            // ideally, should do some error checking!
            // this.addLocalPicture(pict)
            this.fetchPictures()
        })
    }



















    fetchPicture(pic_id){

        console.log("PIC ID")
        console.log(pic_id)



        const pFetchPict = fetch('http://localhost:8080/picture/' + pic_id)
        pFetchPict.then((response) => { response.json().then((json) => {

              console.log("HERE")
              console.log(json)

              this.get_picture_info(json)
          })});

    }

    

    get_picture_info(pict){
        // console.log("GOT TO PICTURE INFO")
        // console.log(pict)
        // console.log(pict_source)
        // console.log(typeof(pict))
        this.pictures_detals.push({pict: pict})

        console.log(pict)

        for (const f of this.addedPictureSubscribers) { 
            
            f(pict)
        }
        
    }
}

class PictureView {
    constructor(m) {
        this.model = m
        this.gallery = document.getElementById("imageGallery")


        // this.eltAdded = elt('added')
	// this.eltUrl = elt('url')
        m.subAddedPicture(() => this.updatePictures())
        // this.hideAdded()
        // this.eltUrl.addEventListener('mouseover', () => this.showAdded())
        // this.eltUrl.addEventListener('mouseout', () => this.hideAdded())
    }

    // changeColorAdded(color) {
	// this.eltAdded.style.color = color
    // }

    // hideAdded() { 
	// this.changeColorAdded('white')
    // }
    
    // showAdded() {
	// this.changeColorAdded('black')
    // }

    updatePictures(pict) {
        /* Called when the details of all the pictures are found and loaded
        
            */
        // console.log("GOT TO UPDATE PICTURES")

        // console.log("PICTURES ARE")
        // console.log(this.model.pictures_detals)

        // Have the picture info, now actually show the pics

        while (this.gallery.firstChild) {
            this.gallery.removeChild(this.gallery.firstChild);
        }

        for (const i of this.model.pictures_detals){
            
            console.log("GOT TO HERE")
            console.log(i.pict.picture.source)
            const image = document.createElement('img')
            console.log(image)
            image.src = "/image/" +  i.pict.picture.source//? maybe
            image.classList.add("item")

            // Here is where it needs to go to another page when you click on it
            image.onclick = function(){console.log("CLICKED AN IMAGE")}
            this.gallery.appendChild(image)

        }


    }
}





class NewPictureController {
    constructor(m) {
        this.model = m
        this.eltButton = elt('create-button')
        this.eltButton.addEventListener('click', () => this.newPicture())
        this.eltNewUrl = elt('new-url')
        // console.log("ELEMENT BUTTON")
        // console.log(this.eltButton)
    }
    
    getPictureInfo() {
        const url = this.eltNewUrl.value
        return url

    }

    clearInputs() {
	// this.eltNewName.value = ''
	this.eltNewUrl.value = ''
    }    

    newPicture() {
        console.log("NEW PICTURE CLICKED")
        const pict_url = this.getPictureInfo()
        console.log(pict_url)
        if (pict_url) {
            this.model.addPicture(pict_url)
	    this.clearInputs()
        }
    }
}


// class ImageView {
//     constructor(m) {
// 	this.model = m
// 	this.eltName = elt('name')
// 	this.eltUrl = elt('url')
// 	m.subChangedPicture(() => this.showPicture())
//     }

//     showPicture() {
// 	const pict = this.model.getPicture()
// 	this.eltName.innerText = pict.name
// 	this.eltUrl.setAttribute('src', pict.url)
//     }
// }





function init() {
    const model = new Model()
    const pictureView = new PictureView(model)
    // const selectC = new SelectionController(model)
    const newPicC = new NewPictureController(model)
    // const imageV = new ImageView(model)
    // const addedV = new TimeAddedView(model)
    // const thumbnailV = new ThumbnailView(model)
    // @ NEW CALL
    model.fetchPictures()
}

// put all the initialization code in a function called
// when the document finishes loading
// (you're sure all elements have been created before your code kicks in)

window.addEventListener('load', init)