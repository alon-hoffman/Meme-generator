'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gCtx
let gElCanvas
const appState = {
    draggedLine: null,
    lastClick: null,
    addLineTimeOut: null
}
function init() {
    gElCanvas = document.getElementById('my-canvas')
    resizeCanvas()

    gCtx = gElCanvas.getContext('2d')
    displayTemplates('all')
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
        if (line.yPose * gElCanvas.width > pos.y &&
            pos.y > (line.yPose * gElCanvas.width - line.size * gElCanvas.width)) {
            onSelectByClick(i)
            appState.draggedLine = i

            document.body.style.cursor = 'grabbing'
            return
        }
    });
    if (appState.draggedLine === null) {
        appState.addLineTimeOut = setTimeout(() => {
            onAddLine()
            onMoveLine(pos)
        }, 750)
    }
}

function onMove(ev) {
    if (appState.draggedLine === null) return
    const pos = getEvPos(ev)
    onMoveLine(pos)
}

function onUp() {
    document.body.style.cursor = 'grab'
    appState.draggedLine = null
    appState.addLineTimeOut = null
}

function resizeCanvas() {
    if (window.innerWidth < 840) {
        gElCanvas.width = window.innerWidth * 0.8
        gElCanvas.height = window.innerWidth * 0.8
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
        ev.preventDefault()
        ev = ev.touches[0] || ev.originalEvent.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    console.log(pos);
    return pos
}



function switchToEditor() {
    document.querySelector('.editor').classList.remove('hide');
    document.querySelector('.gallary-view').classList.add('hide');
    document.querySelector('.tag-strip-cont').classList.add('hide');
}

function switchToGallery() {
    document.querySelector('.line-writer').value = ''
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallary-view').classList.remove('hide');
    document.querySelector('.tag-strip-cont').classList.remove('hide');
}

//share and download

