function elt(id) {
    // useful shortcut
    return document.getElementById(id)
}



class Model {
    /* Model controls storing pictures and reloading pictures when the 
        state is changed.*/
    constructor() {
        this.pictures = []
        this.pictures_detals = []
        this.current = null
	// list of functions to call when picture is added
        this.addedPictureSubscribers = []
        this.addedCommentSubscribers = []
    }


    subAddedPicture(f) {
        this.addedPictureSubscribers.push(f)
    }
    
    subAddedComment(f) {
        this.addedCommentSubscribers.push(f)
    }

    // actions
  
    changePicture(v) {
        this.current = v
	// go through every function in the list changedPictureSubscribers
	// and call each function with the index of the current picture
        for (const f of this.changedPictureSubscribers) { 
            f(v)
        }
    }


    fetchPictures() {
        /* Method that can be called to reload all the pictures based on
            what is in the backend. Is called when the page loads and each
            time a picture is added. Should be able to be called again
            whenever things need updating */

        this.pictures = []
        this.pictures_detals = []
        const pPics = fetch('http://localhost:8080/pictures')
        const process = (obj) => {
            console.log('Received pictures =', obj)
            console.log("LISTING PICTURES")
            for (const p in obj.pictures) { 
                console.log(p)
            }
            for (const p in obj.pictures) { 
                this.addLocalPicture(p)
            }
                
        }
        pPics.then((response) => response.json().then((v) => process(v)))
        }

    // @ NEW METHOD
        
    addLocalPicture(pict) {
        /* Adds a picture to the list of pictures which is held by the model */
        console.log("ADDING LOCAL PICTURE")
        console.log(pict)
        this.pictures.push(pict)
        this.fetchPicture(pict)
        const idx = this.pictures.length - 1
    }
        

    addPicture(pict) {
        /* adds a picture when told to do so by the new picture controller
            does it by sending a pist request to the backend with the picture url
            and then updates the model state when its done and reloads all pictures */

        console.log("MODEL GOT PICTURE URL")
	    const pAddPict = fetch('http://localhost:8080/new-picture-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pict)
        })
	    pAddPict.then((response) => {
            this.fetchPictures()
        })
    }

    addComment(comment) {
         /* adds a comment when told to do so by the new picture controller
             does it by sending a post request to the backend with the picture url
             and then updates the model state when its done and reloads all pictures */

        console.log("MODEL GOT COMMENT")
        pic = this.current
        const addComm = fetch(pic,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(comment)
         })

         }


    fetchPicture(pic_id){
        /* Gets more detail about a particular picture
            such as the image source and comments
            should be called on an image id out of model.pictures
            and will save info to the model in picture_detals then
            call added picture subscribers (dont know if we wnat that)*/

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
        /* Helper function called by fetchPicture*/
        this.pictures_detals.push({pict: pict})

        console.log(pict)

        for (const f of this.addedPictureSubscribers) { 
            
            f(pict)
        }
        
    }
}

function onClickedFun(image){
    // console.log(i.pict.picture.source.toString().substring(0, i.pict.picture.source.lastIndexOf('.')) || i.pict.picture.source)
            // console.log(MODEL)
            console.log(image)
            console.log(image.target)
            console.log(image.target.nodeValue)
            
            // const k = fetchPicture(image.id)
            const it = MODEL.fetchPicture(image.id)
            console.log(it)
            console.log("CLICKED AN IMAGE")

}

class PictureView {
    /* Controls the gallery view of images presented on the main screen
        adds picture elements to a flexbox 4 across and adds listeners
        that make them do things when you click on them */
    constructor(m) {
        this.model = m
        this.gallery = document.getElementById("imageGallery")
        m.subAddedPicture(() => this.updatePictures())
    }
    
    // onClickedFun(model){
    //     console.log(i.pict.picture.source.toString().substring(0, i.pict.picture.source.lastIndexOf('.')) || i.pict.picture.source)
    //             console.log(model)
    //             // const la = model.fetchPicture(image.id)
    //             // const k = fetchPicture(image.id)
    //             // const it = model.fetchPicture(image.id)
    //             // console.log(it)
    //             console.log("CLICKED AN IMAGE")

    // }



    updatePictures(pict) {
        /* Updates the gallery */
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
            console.log(i.pict.picture.id)
            image.id = i.pict.picture.id
            console.log(typeof(this.model))
            // Object model = this.model
            // image.onclick = {() => onclickfun(this.model)}
            // Here is where it needs to go to another page when you click on it
            image.onclick = function(image){onClickedFun(image);}
                //get image name
                //create new page w/ index/image name
                //build that image page w/ ordered comments and image and back button

        
                // console.log(i.pict.picture.source.toString().substring(0, i.pict.picture.source.lastIndexOf('.')) || i.pict.picture.source)
                // console.log(model)
                // // const la = model.fetchPicture(image.id)
                // // const k = fetchPicture(image.id)
                // // const it = model.fetchPicture(image.id)
                // // console.log(it)
                // console.log("CLICKED AN IMAGE")}
            this.gallery.appendChild(image)
        }
    }


}


class NewPictureController {
    /* Controls the input url box and button */
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

    getComment() {
        console.log("NEW COMMENT INPUTTED")
        const comment_input = this.elt(newComment).createElement("INPUT");
        comment_input.setAttribute("type", "text");
        comment_input.addEventListener('input',this.model.addComment(comment_input.value))
    }

}


function init() {
    MODEL = new Model()
    const pictureView = new PictureView(MODEL)
    const newPicC = new NewPictureController(MODEL)

    MODEL.fetchPictures()
}

// put all the initialization code in a function called
// when the document finishes loading
// (you're sure all elements have been created before your code kicks in)
let MODEL = null
window.addEventListener('load', init)