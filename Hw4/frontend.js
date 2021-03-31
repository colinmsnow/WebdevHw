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
            // console.log("LISTING PICTURES")
            // for (const p in obj.pictures) { 
            //     console.log(p)
            // }
            for (const p in obj.pictures) { 
                this.addLocalPicture(p)
            }
                
        }
        pPics.then((response) => response.json().then((v) => process(v)))
        }

    // @ NEW METHOD
        
    addLocalPicture(pict) {
        /* Adds a picture to the list of pictures which is held by the model */
        // console.log("ADDING LOCAL PICTURE")
        // console.log(pict)
        this.pictures.push(pict)
        this.fetchPicture(pict)
        const idx = this.pictures.length - 1
    }
        
    addPicture(pict, type) {
        /* adds a picture when told to do so by the new picture controller
            does it by sending a post request to the backend with the picture url
            and then updates the model state when its done and reloads all pictures */

        console.log("MODEL GOT PICTURE URL")
        if (type == "file") {
            console.log('testing')
            const fo = document.querySelector("form")
            console.log(fo)
            document.querySelector("form").onsubmit = asych (e) => {
                e.preventDefault()
            
            // const formData = new FormData(document.querySelector("form"))
                const formData = new FormData()
                console.log(formData)
                formData.append("new-file", pict)
                console.log(formData.entries())
                const PAdd = await fetch('http://localhost:8080/new-picture-upload', {
                method: 'POST',
                body: formData
            })
            PAdd.then((response) => response.json().then(data => {
                this.fetchPictures()
            }))
        }
        }
        else{
        // TODO: include what to do if this is a local file
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
    }

    addComment(pic_id,comment) {
        /* adds a comment when told to do so by the new picture controller
            does it by sending a post request to the backend with the picture url
            and then updates the model state when its done and reloads all pictures */
    
       console.log("MODEL GOT COMMENT")
       console.log(comment)
       console.log(pic_id)
       const addComm = fetch('http://localhost:8080/new-comment/' + pic_id,{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
               },
           body: JSON.stringify({"comment": comment})
        })
        addComm.then((response) => {
           this.fetchComments(this.current)
       })
       }

    getPictureDetails(pic_id){
            /* Gets more detail about a particular picture
                such as the image source and comments
                should be called on an image id out of model.pictures
                and will save info to the model in picture_detals then
                call added picture subscribers (dont know if we wnat that)*/
    
        console.log("PIC ID")
        console.log(pic_id)
        console.log("MODEL")
        console.log(MODEL.pictures_detals)

        console.log(MODEL.pictures_detals[0])
        for (let i of MODEL.pictures_detals){
            console.log("I")
            console.log(i)
            if (i.pict.picture.id == pic_id){
                console.log(i.pict.picture)
                return i.pict.picture
            }
        }
    
    
    
            // const pFetchPict = fetch('http://localhost:8080/picture/' + pic_id)
            // console.log("P FETCH PICT" + pFetchPict.toString())
            // pFetchPict.then((response) => { response.json().then((json) => {
    
            // //       console.log("HERE")
            // console.log("P FETCH PICT")
            // console.log(json)
            // MODEL.current = json.picture.id
    
            // //       this.get_picture_info(json)
            //   })});
    
        }


    fetchPicture(pic_id){
        /* Gets more detail about a particular picture
            such as the image source and comments
            should be called on an image id out of model.pictures
            and will save info to the model in picture_detals then
            call added picture subscribers (dont know if we wnat that)*/

        // console.log("PIC ID")
        // console.log(pic_id)




        const pFetchPict = fetch('http://localhost:8080/picture/' + pic_id)
        pFetchPict.then((response) => { response.json().then((json) => {

              console.log("HERE")              
              this.get_picture_info(json)
          })});

    }


    fetchComments(pic_id){
        /* Gets more detail about a particular picture
            such as the image source and comments
            should be called on an image id out of model.pictures
            and will save info to the model in picture_detals then
            call added picture subscribers (dont know if we wnat that)*/
        console.log("FETCHING COMMENTS")

        const comments = fetch('http://localhost:8080/comments/' + pic_id)
        comments.then((response) => { response.json().then((json) => {
            console.log("HERE") 
            var c = JSON.parse(JSON.stringify(json)); 
            console.log(c)
            console.log(typeof(c))
            console.log(c["comments"])
            if (c["comments"].length == 0){
                let a = document.createElement("li")
                a.innerHTML = "No Comments"
                elt('dispcom').appendChild(a)
                // elt('dispcom').innerHTML += "No Comments"
            }
            else if (c["comments"].length-1 == 0){
                let a = document.createElement("li")
                a.innerHTML = "comment: " + JSON.stringify(c["comments"][0]["comment"]) + "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][0]["timestamp"])
                elt('dispcom').appendChild(a)
                // elt('dispcom').innerHTML += "comment: " + JSON.stringify(c["comments"][0]["comment"]) + "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][0]["timestamp"])
            }
            else{
            for(var i=0;i<c["comments"].length-1;i+=2){
                let a = document.createElement("li")
                a.innerHTML = "comment: " + JSON.stringify(c["comments"][i]["comment"]) + "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][i]["timestamp"]) + "<br>" + "comment: " + JSON.stringify(c["comments"][i+1]["comment"]) +  "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][i+1]["timestamp"])+"<br>";
                elt('dispcom').appendChild(a)
                // elt('dispcom').innerHTML += "comment: " + JSON.stringify(c["comments"][i]["comment"]) + "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][i]["timestamp"]) + "<br>" + "comment: " + JSON.stringify(c["comments"][i+1]["comment"]) +  "&nbsp &nbsp" + "timestamp: " + JSON.stringify(c["comments"][i+1]["timestamp"])+"<br>";
            }
            }
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

class PictureView {
    /* Controls the gallery view of images presented on the main screen
        adds picture elements to a flexbox 4 across and adds listeners
        that make them do things when you click on them */
    constructor(m, newPicC) {
        this.model = m
        this.gallery = document.getElementById("imageGallery")
        this.newpage = elt('NewPage')
        this.newPicC = newPicC
        this.newurl = elt('new-url')
        this.newfile = elt('new-file')
        this.addpic = elt('create-button')
        this.file = elt('file')
        this.url = elt('url')
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
            
            // console.log("Loaded Image:")
            // console.log(i)
            let num_comments = i.pict.picture.comments.length
            // console.log(i.pict.picture.source)
            const image = document.createElement('img')
            
            // console.log(image)
            // console.log(i.pict.picture.source)
            image.src = "/image/" +  i.pict.picture.source//? maybe
            image.classList.add("item")
            // console.log(i.pict.picture.id)
            image.id = i.pict.picture.id
            // console.log(typeof(this.model))
            // Object model = this.model
            // image.onclick = {() => onclickfun(this.model)}
            // Here is where it needs to go to another page when you click on it
            // Object current_obj = this
            image.onclick = function(image){(this).onClickedFun(image);}.bind(this)
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
            let elementrect = image.getBoundingClientRect()

            // console.log(elementrect)
            const comment_num = document.createElement("div")
            comment_num.className = "circle"
            comment_num.innerHTML = num_comments
            comment_num.style.position = 'absolute'
            // console.log(image)
            comment_num.style.left = elementrect.left.toString() + 'px'
            comment_num.style.top = elementrect.top.toString() + 'px'
            this.gallery.appendChild(comment_num)
        }
    }

    onClickedFun(image){
        // s = (image.target.attributes[0].value.toString().substring(image.target.attributes[0].value.lastIndexOf('/'), image.target.attributes[0].value.lastIndexOf('.')) || image.target.attributes[0].value) + ".html"
        console.log("CLICKED AN IMAGE")
        // console.log(image.target)
        const it = MODEL.getPictureDetails(image.target.id)
        MODEL.current = it.id
        this.newpage.style = "display:block"
        MODEL.fetchComments(MODEL.current)
        //hides the gallery 
        this.newpage.previousElementSibling.style.display = 'none'
        this.newurl.style.display = 'none'
        this.newfile.style.display = 'none'
        this.addpic.style.display = 'none'
        this.url.style.display = "none"
        this.file.style.display = "none"
        // shows just relevant image
        let pic = document.createElement("img")
        console.log("PIC")
        console.log(pic)
        pic.src = '/image/' + it.source
        // this.newpage.appendChild(pic)
        elt('dispcom').before(pic)
        this.newPicC.addComment()
        this.newPicC.return(pic)

        
}


}


class NewPictureController {
    /* Controls the input url box and button */
    constructor(m) {
        this.model = m
        this.eltButton = elt('create-button')
        this.eltButton.addEventListener('click', () => this.newPicture())
        this.eltNewUrl = elt('new-url')
        this.eltNewFile = elt('new-file')
        this.newcomment = elt('new-comment')
        this.back = elt('back')
        this.submit = elt('submit')
        this.file = elt('file')
        this.url = elt('url')
        // console.log("ELEMENT BUTTON")
        // console.log(this.eltButton)
    }
    
    getPictureInfo() {
        const url = this.eltNewUrl.value
        return url

    }

    getPictureInfoFile() {
        const file = this.eltNewFile.files
        return file

    }


    clearInputs() {
	this.eltNewUrl.value = ''
    this.eltNewFile.value = ''
    }  
    
    // newPicture() {
    //     console.log("NEW PICTURE CLICKED")
    //     const pict_url = this.getPictureInfo()
    //     console.log(pict_url)
    //     if (pict_url) {
    //         this.model.addPicture(pict_url)
	//     this.clearInputs()
    //     }
    // }

    newPicture() {
        console.log("NEW PICTURE CLICKED")
        const pict_url = this.getPictureInfo()
        const pict_file = this.getPictureInfoFile()[0]
        console.log(pict_url)
        if (pict_url) {
            this.model.addPicture(pict_url, "link")
	    this.clearInputs()
        }
        if (pict_file) {
            this.model.addPicture(pict_file, "file")
	    this.clearInputs()
        }
    }

    addComment()
    {
        this.submit.addEventListener('click',evt =>{
            console.log("NEW COMMENT INPUTTED")
            MODEL.addComment(MODEL.current,this.newcomment.value)
            })
    }

    return(pic)
    {
        this.back.addEventListener('click',evt =>{
            console.log("CLICKED BACK")
            this.pictureView.newpage.previousElementSibling.style.display = 'block'
            this.pictureView.newpage.style = "display:none"
            pic.style = "display:none"
            this.eltButton.style.display = "block"
            this.eltNewUrl.style.display = "block"
            this.eltNewFile.style.display = "block"
            this.url.style.display = "block"
            this.file.style.display = "block"
            this.newcomment.value = ""
            // this.model.fetchPictures()
            window.location.replace("index.html");
        })
    }
}


function init() {
    MODEL = new Model()
    
    const newPicC = new NewPictureController(MODEL)
    const pictureView = new PictureView(MODEL, newPicC)
    newPicC.pictureView = pictureView

    MODEL.fetchPictures()
}

// put all the initialization code in a function called
// when the document finishes loading
// (you're sure all elements have been created before your code kicks in)
let MODEL = null
window.addEventListener('load', init)