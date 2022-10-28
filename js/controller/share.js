'use strict'

function downloadCanvas(elLink) {

    const data = gElCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'shuki' // Can change the name of the file
}

function onImgInput(ev) {
    loadImageFromInput(ev, createMeme)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        img.onload = onImageReady.bind(null, img)
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}