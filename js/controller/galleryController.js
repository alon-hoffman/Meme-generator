'use strict';

function displayTemplates() {
    var htmlStr = ''
    for (let i = 1; i < 18; i++) {
        htmlStr += `<div onclick="onImgSelected(${i})" class="img-container"><img src="img/${i}.jpg" alt=""></div>`
    }
    document.querySelector('.gallary-view').innerHTML = htmlStr
}

function onImgSelected(id) {
    createMeme(id)
    renderMeme()
    switchToEditor()
}