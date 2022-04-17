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

// Datepicker
const departureDate = document.querySelector('input[name="datepicker-departure"]');
const returnDate = document.querySelector('input[name="datepicker-return"]');
let prev = document.querySelectorAll('.booking__prev');
let next = document.querySelectorAll('.booking__next');

const departureDatePicker = new Datepicker(departureDate, {
    autohide: true,
    format: 'D dd M',
    orientation: 'left',
    todayHighlight: true,

    beforeShowDay(date) {
        if (date < new Date()) {
            return false;
        }
    }
});


const returnDatePicker = new Datepicker(returnDate, {
    autohide: true,
    format: 'D dd M',
    orientation: 'left',
    todayHighlight: true
});


// updateData = (dateInput, datapicker, index) => {
//     dateInput.addEventListener('changeDate', () => {
//         datapicker.dates.forEach(el => {
//             prev[index].addEventListener('click', () => {
//                 // if (el >= new Date()) {
//                 el = el - 86400000;
//                 datapicker.setDate(el);
//                 // }
//             });
//             next[index].addEventListener('click', () => {
//                 el = el + 86400000;
//                 datapicker.setDate(el);
//             });
//         });

//     });
// };


departureDate.addEventListener('changeDate', () => {
    departureDatePicker.dates.forEach(el => {



        prev[0].addEventListener('click', () => {
            if (el >= new Date()) {
                el = el - 86400000;
                departureDatePicker.setDate(el);
            }
        });

        next[0].addEventListener('click', () => {
            el = el + 86400000;
            departureDatePicker.setDate(el);
        });




    });
});







returnDate.addEventListener('changeDate', () => {

    returnDatePicker.dates.forEach(el => {

        prev[1].addEventListener('click', () => {
            if (el >= Date.now()) {
                el = el - 86400000;
                returnDatePicker.setDate(el);
            }
        });

        next[1].addEventListener('click', () => {
            el = el + 86400000;
            returnDatePicker.setDate(el);
        });

    })
});


console.log('Hello')
// updateData(departureDate, departureDatePicker, 0);
// updateData(returnDate, returnDatePicker, 1);



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

let bookingArrows = document.querySelectorAll('.booking__arrow');
let bookingHeaders = document.querySelectorAll('.booking__link-header');

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

const header = document.querySelector('.header');


document.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('_fixed');
    } else {
        header.classList.remove('_fixed')
    }
})
console.log(window.scrollY)


// Scroll for sections

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(el => {
        el.addEventListener('click', onMenuClickLink)
    });


    function onMenuClickLink(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const goToBlock = document.querySelector(menuLink.dataset.goto);
            const goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY - header.offsetHeight;

            window.scrollTo({
                top: goToBlockValue,
                behavior: "smooth"
            });

            e.preventDefault();
        }
    }
}