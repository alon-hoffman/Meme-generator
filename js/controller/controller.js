'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gCtx
let gElCanvas
let draggedLine = null;
function init() {
    gElCanvas = document.getElementById('my-canvas')
    resizeCanvas()

    gCtx = gElCanvas.getContext('2d')
    displayTemplates()
    addListeners()
    resizeCanvas()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        // renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const meme = getCurrentMeme()
    const lines = meme.lines
    lines.forEach((line, i) => {
        if (line.yPose > pos.y && pos.y > (line.yPose - line.size * gElCanvas.width)) {
            onSelectByClick(i)
            draggedLine = i
            document.body.style.cursor = 'grabbing'
        }
    });

}

function onMove(ev) {
    if (draggedLine === null) return
    const pos = getEvPos(ev)
    onMoveLine(pos)
}

function onUp() {
    draggedLine = null
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    if (window.innerWidth < 640) {
        gElCanvas.width = window.innerWidth
        gElCanvas.height = window.innerWidth
        renderMeme()
    }
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        touchmove
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



function switchToEditor() {
    document.querySelector('.editor').classList.remove('hide');
    document.querySelector('.gallary-view').classList.add('hide');
}

function switchToGallery() {
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallary-view').classList.remove('hide');
}