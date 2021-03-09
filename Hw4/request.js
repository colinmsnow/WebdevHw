function addPicture(input_url) {
    // Makes a request to add a picture to the images folder

    urlObject = {url:input_url}
	const pAddPict = fetch('http://localhost:8080/new-picture-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlObject)
        })
}

addPicture("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg")