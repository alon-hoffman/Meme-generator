'use strict';
// fix change line dir
const gMemes = [
    {
        id: 1,
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                align: 'right',
                color: 'red',
                yPose: 80
            }
        ]
    }
]

const defaultLinePlacement = [0.2, 0.8, 0.5]

let gMeme = gMemes[0]

function getCurrentMeme() {
    return gMeme
}
function getMemes() {
    return gMemes
}

//Lines***********

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function selectByClick(i) {
    gMeme.selectedLineIdx = i
    gMeme.lines[gMeme.selectedLineIdx].isDragged = true
}

function moveLine(pos) {
    gMeme.lines[gMeme.selectedLineIdx].yPose = pos.y / gElCanvas.width
    gMeme.lines[gMeme.selectedLineIdx].xPose = pos.x / gElCanvas.width
}

function updateLine(property, value) {
    gMeme.lines[gMeme.selectedLineIdx][property] = value
}



function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 0.1,
        align: 'center',
        color: 'black',
        font: 'Impact',
        yPose: defaultLinePlacement[gMeme.lines.length] || 210,
        xPose: 0.5
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gMeme.selectedLineIdx[gMeme.lines.length - 1]
}

function removeLine() {
    if (gMeme.lines.length === 1) gMeme.lines[0].txt = ''
    else gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}

function changeLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++
}

//typography

function changeFontSize(dir) {
    gMeme.lines[gMeme.selectedLineIdx].size += dir * 0.01
}


//Meme CRUD

function createMeme(imgId) {

    gMeme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 0.1,
                align: 'center',
                color: 'black',
                outline: 'white',
                font: 'Impact',
                yPose: defaultLinePlacement[0],
                xPose: 0.5
            }
        ]
    }
}

function updateImgId(imgId) {
    gMeme.selectedImgId = imgId
    console.log(gMeme.selectedImgId);
}
