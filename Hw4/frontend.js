


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
	const pPics = fetch('http://localhost:8080/pictures')
	const process = (obj) => {
	    console.log('Received pictures =', obj)
        // console.log("LENGTH:")
        // console.log(obj.pictures.length)
        //     if (obj.pictures.length > 0) {
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
	const pAddPict = fetch('http://localhost:8080/add-picture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pict)
        })
	pAddPict.then((response) => {
            // ideally, should do some error checking!
            this.addLocalPicture(pict)
        })
    }

    // arrayBufferToBase64(buffer) {
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
      
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
      
    //     return window.btoa(binary);
    // }

    fetchPicture(pic_id){

        // base 64 conversion code from https://medium.com/front-end-weekly/fetching-images-with-the-fetch-api-fb8761ed27b2
        // var options = {
        //     method: 'GET',
        //     headers: headers,
        //     mode: 'cors',
        //     cache: 'default'
        //   };

        const pFetchPict = fetch('http://localhost:8080/picture/' + pic_id)
        pFetchPict.then((response) => { response.json().then((json) => {
            // response.arrayBuffer().then((buffer) => {
            //   var base64Flag = 'data:image/jpeg;base64,';
            //   var imageStr = this.arrayBufferToBase64(buffer);
          
              console.log("HERE")
              console.log(json)

              this.get_picture_info(json)
            // });
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

        for (const i of this.model.pictures_detals){
            
            console.log("GOT TO HERE")
            console.log(i.pict.picture.source)
            const image = document.createElement('img')
            console.log(image)
            image.src = "/image/" +  i.pict.picture.source//? maybe
            image.classList.add("item")
            this.gallery.appendChild(image)

        }


    }
}





// class NewPictureController {
//     constructor(m) {
//         this.model = m
//         this.eltButton = elt('create-button')
//         this.eltButton.addEventListener('click', () => this.newPicture())
//         this.eltNewName = elt('new-name')
//         this.eltNewUrl = elt('new-url')
//     }
    
//     getPictureInfo() {
// 	const name = this.eltNewName.value
// 	const url = this.eltNewUrl.value
// 	if (!name || !url) {
// 	    return false
// 	}
// 	return { name: name, url: url, added: Date() }
//     }

//     clearInputs() {
// 	this.eltNewName.value = ''
// 	this.eltNewUrl.value = ''
//     }    

//     newPicture() {
//         const pict = this.getPictureInfo()
//         if (pict) {
//             this.model.addPicture(pict)
// 	    this.clearInputs()
//         }
//     }
// }


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
    // const newPicC = new NewPictureController(model)
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