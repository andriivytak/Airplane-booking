const destinations = document.querySelectorAll('.booking__destination');
const buttonRevert = document.querySelector('.booking__revert');
const chapterItem = document.querySelectorAll('.chapter__item');
const booking = document.querySelector('.booking');
const perfomanceIcons = document.querySelectorAll('.card');
const airPlane = document.querySelector('.perfomance__airplane');
const luxury = document.querySelector('.luxury');
const memberShip = document.querySelector('.membership');
const lazyImages = document.querySelectorAll('img[data-src]');
const departureDate = document.querySelector('input[name="datepicker-departure"]');
const returnDate = document.querySelector('input[name="datepicker-return"]');
const oneDay = 86400000;
const prev = document.querySelectorAll('.booking__prev');
const next = document.querySelectorAll('.booking__next');
const windowHeight = document.documentElement.clientHeight;
const bookingArrows = document.querySelectorAll('.booking__arrow');
const bookingHeaders = document.querySelectorAll('.booking__link-header');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
const burgerIcon = document.querySelector('.menu__icon');
const burgerMenu = document.querySelector('.menu__body');

let lazyImagesPositions = [];

// Lazy image loading
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + window.scrollY);
        }
    });
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => window.scrollY > item - windowHeight
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

// Revert destinations for fly
buttonRevert.addEventListener('click', () => {
    [destinations[0].innerHTML, destinations[1].innerHTML] = [destinations[1].innerHTML, destinations[0].innerHTML];

});

// Animation for lazy loading

function animationLazyImages() {
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
}
// Datepicker

const departureDatePicker = new Datepicker(departureDate, {
    autohide: true,
    format: 'D dd M',
    orientation: 'left',
    todayHighlight: true,
    beforeShowDay(date) {
        if (date < new Date() - oneDay ) {
            return false;
        }
    }
});

const returnDatePicker = new Datepicker(returnDate, {
    autohide: true,
    format: 'D dd M',
    orientation: 'left',
    todayHighlight: true,

    beforeShowDay(date) {
        if (date < new Date() - oneDay ) {
            return false;
        }
    }
});

departureDate.addEventListener('changeDate', () => {  
    departureDatePicker.dates.forEach(el => {
        prev[0].addEventListener('click', () => {
            if (el >= new Date()) {
                el = el - oneDay;
                departureDatePicker.setDate(el);
            }
        });
        next[0].addEventListener('click', () => {
            el = el + oneDay;
            departureDatePicker.setDate(el);
        });
    });
});

returnDate.addEventListener('changeDate', () => {
    returnDatePicker.dates.forEach(el => {
        prev[1].addEventListener('click', () => {
            if (el >= Date.now()) {
                el = el - oneDay;
                returnDatePicker.setDate(el);
            }
        });
        next[1].addEventListener('click', () => {
            el = el + oneDay;
            returnDatePicker.setDate(el);
        });

    })
});

// Check for touch screen

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch')

    bookingArrows.forEach(el => {
        el.addEventListener('click', () => {
            el.parentElement.classList.toggle('_active');
        });
    });

    bookingHeaders.forEach(el => {
        el.addEventListener('click', () => {
            el.parentElement.classList.toggle('_active')
        })

    });

} else {
    document.body.classList.add('_pc')
}

// Fixed header

if (screen.width > 767) {
    document.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('_fixed');
        } else {
            header.classList.remove('_fixed')
        }
    })
}

function fixedHeader() {
    if (screen.width > 767) {
        if (window.scrollY > 50) {
            header.classList.add('_fixed');
        } else {
            header.classList.remove('_fixed')
        }
    } else {
        if (window.scrollY > 55) {
            header.classList.add('_mobile');
        } else {
            header.classList.remove('_mobile')
        }
    }
}

// Burger menu

if (burgerIcon) {
    burgerIcon.addEventListener('click', () => {
        document.body.classList.toggle('_lock');
        burgerIcon.classList.toggle('_active');
        burgerMenu.classList.toggle('_active');
    })
}

// Scroll for sections

if (menuLinks.length > 0) {
    menuLinks.forEach(el => {
        el.addEventListener('click', onMenuClickLink)
    });

    function onMenuClickLink(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const goToBlock = document.querySelector(menuLink.dataset.goto);
            const goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY - header.offsetHeight;
            if (burgerIcon.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                burgerIcon.classList.remove('_active');
                burgerMenu.classList.remove('_active');
            }
            window.scrollTo({
                top: goToBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

animationLazyImages();
window.addEventListener('scroll', () => {
    lazyScrollCheck();
    fixedHeader()
    animationLazyImages();
});

