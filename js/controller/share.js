'use strict'

function onClickDownload() {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('my-canvas').toDataURL()
    link.click();
    // document.querySelector('.download-anchor').click()
}

function downloadCanvas(elLink) {

    const data = gElCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'Your Meme' // Can change the name of the file
}

function onImgInput(ev) {
    loadImageFromInput(ev, updateImgId)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    console.log(ev);
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // console.log(event.target.result);
        // Run the callBack func, To render the img on the canvas
        // Can also do it this way:
        onImgSelected(1)
        img.onload = () => {
            onImageReady(img.src)
            renderMeme()
        }
        // updateImgId(img.src) // Read the file we picked
    }
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")// Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // Create a link that on click will make a post in facebook with the image we uploaded

        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
        window.open(url, '_blank').focus();

    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as:
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function onClickUpload() {
    document.querySelector('.choose-file').click()
}