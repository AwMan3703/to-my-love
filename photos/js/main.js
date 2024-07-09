
const PHOTO_COUNT = 83

function _new_photo(url) {
    const image = document.createElement('div')
    image.classList.add('photo')
    image.style.backgroundImage = 'url("' + url + '")'

    const wrapper = document.createElement('div')
    wrapper.classList.add('photo-wrapper')
    wrapper.style.rotate = `${randInt(-10, 10)}deg`
    wrapper.style.left = `${randInt(-100, visualViewport.width)}px`
    wrapper.style.top = `${randInt(-100, visualViewport.height)}px`
    wrapper.appendChild(image)

    wrapper.onmousedown = _ => {
        for (let p of document.getElementsByClassName('photo-wrapper')) {
            p.style.zIndex = (parseInt(p.style.zIndex) - 1).toString()
        }
        wrapper.style.zIndex = PHOTO_COUNT
    }

    return wrapper
}

const photosContainer = document.getElementById('photos-container')
for (let i = 0; i < PHOTO_COUNT; i++) {
    photosContainer.appendChild(_new_photo(
        `assets/photos_optimized/${i + 1}.jpg`,
    ))
}




const photos = document.querySelectorAll('#photos-container > .photo-wrapper');

photos.forEach(e => {
    make_draggable(e)
})

make_draggable(document.getElementById('test-div'))