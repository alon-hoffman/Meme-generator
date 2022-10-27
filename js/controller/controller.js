'use strict'

let gCtx
let gElCanvas
function init() {
    gElCanvas = document.getElementById('my-canvas')
    if (screen.width < 640) {
        gElCanvas.width = screen.width
        gElCanvas.height = screen.width
    }
    gCtx = gElCanvas.getContext('2d')
    displayTemplates()
    renderMeme()
}

function switchToEditor() {
    document.querySelector('.editor').classList.remove('hide');
    document.querySelector('.gallary-view').classList.add('hide');
}

function switchToGallery() {
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallary-view').classList.remove('hide');
}