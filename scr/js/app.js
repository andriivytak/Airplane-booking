const destinations = document.querySelectorAll('.booking__destination');
const buttonRevert = document.querySelector('.booking__revert');
const chapterItem = document.querySelectorAll('.chapter__item');
const booking = document.querySelector('.booking');
const perfomanceIcons = document.querySelectorAll('.card');
const airPlane = document.querySelector('.perfomance__airplane');
const luxury = document.querySelector('.luxury');
const memberShip = document.querySelector('.membership');

const lazyImages = document.querySelectorAll('img[data-src]');
let lazyImagesPositions = [];
const windowHeight = document.documentElement.clientHeight;

if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
        }
    });
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowHeight
    );

    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        }
        delete lazyImagesPositions[imgIndex];
        lazyScrollCheck();
    }
}

buttonRevert.addEventListener('click', () => {
    [destinations[0].innerHTML, destinations[1].innerHTML] = [destinations[1].innerHTML, destinations[0].innerHTML];

});


window.addEventListener('scroll', () => {
    lazyScrollCheck();
    if (window.scrollY > 250) {
        booking.classList.add('visible');
    }

    if (window.scrollY > 685) {
        chapterItem[0].classList.add('lazy');
    }

    if (window.scrollY > 1200) {
        chapterItem[1].classList.add('lazy');
    }

    if (window.scrollY > 1950) {
        perfomanceIcons[0].classList.add('lazy');
        perfomanceIcons[2].classList.add('lazy');
    }

    if (window.scrollY > 1950) {
        perfomanceIcons[1].classList.add('lazy');
        perfomanceIcons[3].classList.add('lazy');
    }
    if (window.scrollY > 2300) {
        airPlane.classList.add('fly');
    }

    if (window.scrollY > 2700) {
        luxury.classList.add('lazy');
    }

    if (window.scrollY > 3140) {
        memberShip.classList.add('lazy');
    }
});