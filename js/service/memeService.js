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

const defaultLinePlacement = [80, 350, 220]

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

function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 40,
        align: 'center',
        color: 'black',
        yPose: defaultLinePlacement[gMeme.lines.length]
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
    gMeme.lines[gMeme.selectedLineIdx].size += dir
}

function alignTxt(dir) {
    gMeme.lines[gMeme.selectedLineIdx].align = dir
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
                size: 40,
                align: 'center',
                color: 'black',
                yPose: defaultLinePlacement[0]
            }
        ]
    }
}

