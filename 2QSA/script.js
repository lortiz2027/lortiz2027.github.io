ScrollReveal().reveal('.home_content, heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .photos-container, .photos-box ', {origin: 'bottom'});
ScrollReveal().reveal('.home_content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home_content p, .about-content', {origin: 'right'});


ScrollReveal({
    distance:'80px',
    duration: 2000,
    delay: 200
});


window.onscroll = () => { 
    sections.forEach(sec => {
     let top = window.scrollY; 
     let offset = sec.offsetTop - 150;
     let height = sec.offsetHeight;
     let id = sec.getAttribute('id');
    
    if(top >= offset && top < offset + height) { 
        navLinks.forEach (links => {
            links.classList.remove('active'); 
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
         });
        };
    });


    let header = document.querySelector('header');

    header.classlist.toggle('sticky', window.scrollY>100)

    menu.classList.remove('bx-x')
    navbar.classList.remove('active')
};

let menu = document.querySelector('#menu')
let navbar = document.querySelector('.navbar')

menu.onclick=()=>{
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

let sections = document.querySelectorAll('section'); 
let navLinks = document.querySelectorAll('header nav a'); 



var typed = new Typed('.multiple_text', {
    strings: ['Cycling', 'Taekwondo', 'Swimming', 'Basketball', 'Badminton', 'Sepak', 'Guitar', 'Drums'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop:true

});