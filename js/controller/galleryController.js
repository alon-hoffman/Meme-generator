'use strict';

// function displayTemplates() {
//     var htmlStr = ''
//     for (let i = 1; i < 18; i++) {
//         htmlStr += `<div onclick="onImgSelected('img/${i}.jpg')" class="img-container"><img src="img/${i}.jpg" alt=""></div>`
//     }
//     document.querySelector('.gallary-view').innerHTML = htmlStr
// }

function displayTemplates(tag) {
    const templates = getTemplates(tag)
    const htmlStr =
        templates.map(template =>
            `<div onclick="onImgSelected('img/${template}.jpg')" class="img-container"><img src="img/${template}.jpg" alt=""></div>`
        );
    document.querySelector('.gallary-view').innerHTML = htmlStr.join('')
}

function onImgSelected(id) {
    createMeme(id)
    renderMeme()
    switchToEditor()
}