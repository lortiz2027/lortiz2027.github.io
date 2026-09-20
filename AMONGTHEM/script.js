let navbar = document.querySelector('.navbar');
let menu = document.querySelector('#menu');
let header = document.querySelector('header');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

ScrollReveal({
    distance: '30px',
    duration: 600,    
    delay: 100        
});

ScrollReveal().reveal('.home_content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .photos-container, .photos-box', { origin: 'bottom' });
ScrollReveal().reveal('.home_content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home_content p, .about-content', { origin: 'right' });


// --- Scroll Behavior & Active Links ---
window.onscroll = () => { 
    let top = window.scrollY; 

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) { 
            navLinks.forEach(links => {
                links.classList.remove('active'); 
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    // Fixed typo: classList instead of classlist
    header.classList.toggle('sticky', window.scrollY > 100);

    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};


// --- Mobile Navigation Toggle ---
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// --- Carousel Logic (Scoped per .summary_box) ---
const summaryBoxes = document.querySelectorAll('.summary_box');

summaryBoxes.forEach((box) => {
    const slides = box.querySelectorAll('.summary_slide');
    const dots = box.querySelectorAll('.dot');
    const prevBtn = box.querySelector('.carousel_btn.prev');
    const nextBtn = box.querySelector('.carousel_btn.next');

    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
});