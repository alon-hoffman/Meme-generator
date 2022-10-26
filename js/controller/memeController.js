function renderMeme() {
    const meme = getCurrentMeme()

    const img = new Image() // Create a new html img element
    img.src = `img/${meme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines(meme)
    }
}

function onChangeLine() {
    changeLine()
    renderMeme()
}


//CRUD

function onAddLine() {
    addLine()
    renderMeme()
    updateTxtInput()
}

//Lines******************************

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
    updateTxtInput()
}

function renderLines(meme) {
    const lines = meme.lines
    lines.forEach(line => {
        const fontSize = line.size
        const txt = line.txt
        gCtx.lineWidth = fontSize / 40
        gCtx.font = fontSize + 'px Impact'
        gCtx.strokeStyle = 'white'
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.fillText(txt, 225, line.yPose) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, 225, line.yPose) // Draws (strokes) a given text at the given (x, y) position.
    }
    );
}

function onRemoveLine() {
    removeLine()
    renderMeme()
    document.querySelector('.line-writer').value = meme.lines[meme.selectedLineIdx].txt

}

//Typography

function onChangeFontSize(dir) {
    changeFontSize(dir)
    renderMeme()
}

function onAlignTxt(dir) {
    alignTxt(dir)
    renderMeme()
}


//Nice to haves

function drawRect() {
    const meme = getCurrentMeme()
    const line = meme.lines[meme.selectedLineIdx]
    // gCtx.strokeStyle = 'black'
    // gCtx.strokeRect(20, line.yPose - line.size + 5, 410, line.size + 5)
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.342)'
    gCtx.fillRect(20, line.yPose - line.size + 5, 410, line.size + 5)
    setTimeout(renderMeme, 1000)
}

function updateTxtInput() {
    const meme = getCurrentMeme()
    document.querySelector('.line-writer').value = meme.lines[meme.selectedLineIdx].txt
}


