'use strict';

const userPrefs = {
    font: 'Impact'
}

function renderMeme() {
    const meme = getCurrentMeme()

    const img = new Image() // Create a new html img element
    img.src = meme.selectedImgId // Send a network req to get that image, define the img src
    // img.src = `img/${meme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines(meme)
    }
}

function onChangeLine() {
    changeLine()
    renderMeme()
    updateTxtInput()
}


//CRUD

function onAddLine() {
    addLine()
    renderMeme()
    updateTxtInput()
    drawRect()
    document.querySelector('.line-writer').focus()
}

//Lines******************************

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
    updateTxtInput()
    drawRect()
}

function renderLines(meme) {
    // const ElCanvas = document.getElementById('my-canvas')

    const lines = meme.lines
    lines.forEach(line => {
        const fontSize = line.size * gElCanvas.width
        const txt = line.txt
        gCtx.lineWidth = fontSize / 40
        gCtx.font = fontSize + `px ${line.font}`
        // gCtx.font = fontSize + 'px Impact'
        gCtx.strokeStyle = line.outline
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.fillText(txt, line.xPose * gElCanvas.width, line.yPose * gElCanvas.width) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, line.xPose * gElCanvas.width, line.yPose * gElCanvas.width) // Draws (strokes) a given text at the given (x, y) position.
    }
    );
}

function onUpdateLine(property, value) {
    updateLine(property, value)
    renderMeme()
}

function onRemoveLine() {
    const meme = getCurrentMeme()
    removeLine()
    renderMeme()
    document.querySelector('.line-writer').value = meme.lines[meme.selectedLineIdx].txt

}

function onSelectByClick(i) {
    selectByClick(i)
    updateTxtInput()
}

function onMoveLine(pos) {
    moveLine(pos)
    renderMeme()
}

function onChangeFontSize(dir) {
    changeFontSize(dir)
    renderMeme()
}



function onOpenColorPicker(el) {
    el.querySelector('.outine-color').click()
}


//Nice to haves

function drawRect() {
    const meme = getCurrentMeme()
    const line = meme.lines[meme.selectedLineIdx]
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.342)'
    gCtx.fillRect(20, line.yPose * gElCanvas.width - (gElCanvas.width * line.size) + 5, 410, (gElCanvas.width * line.size) + 5)
    setTimeout(renderMeme, 3000)
}

function updateTxtInput() {
    const meme = getCurrentMeme()
    document.querySelector('.line-writer').value = meme.lines[meme.selectedLineIdx].txt
    document.querySelector('.line-writer').focus()
}



