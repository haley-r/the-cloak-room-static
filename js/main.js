// design inspiration and starter code from:
// https://github.com/codrops/OrganicShapeAnimations/

{ // make js objects out of html elements
    //this class is basically the same as pageItem, could reintegrate it probably
    class animationCircleItem {
        constructor(el) {
            this.body = body;
            this.background = this.body.querySelector('#fullbackground');
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.svg = this.DOM.el.querySelector('.item__svg');
            this.DOM.path = this.DOM.svg.querySelector('path');
            this.DOM.border = this.DOM.svg.querySelector('.border');
            this.DOM.image = this.DOM.svg.querySelector('image');

            this.paths = {};
            this.paths.start = this.DOM.path.getAttribute('d');
            this.paths.end = this.DOM.el.dataset.morphPath;

            this.opacity = {};
            this.opacity.start = 1;
            this.opacity.end = 0;

            this.CONFIG = {
                animation: {
                    path: {
                        duration: this.DOM.el.dataset.animationPathDuration || 3500,
                        delay: this.DOM.el.dataset.animationPathDelay || 0,
                        easing: this.DOM.el.dataset.animationPathEasing || 'easeOutElastic',
                        elasticity: this.DOM.el.dataset.pathElasticity || 400,
                        scaleX: this.DOM.el.dataset.pathScalex || 1,
                        scaleY: this.DOM.el.dataset.pathScaley || 1,
                        opacity: 0,
                    },
                    image: {
                        duration: this.DOM.el.dataset.animationImageDuration || 4000,
                        delay: this.DOM.el.dataset.animationImageDelay || 0,
                        easing: this.DOM.el.dataset.animationImageEasing || 'easeOutElastic',
                        elasticity: this.DOM.el.dataset.imageElasticity || 400,
                        scaleX: this.DOM.el.dataset.imageScalex || 1.1,
                        scaleY: this.DOM.el.dataset.imageScaley || 1.1,
                        opacity: 0,
                    },
                    border: {
                        duration: this.DOM.el.dataset.animationBorderDuration || 4000,
                        delay: this.DOM.el.dataset.animationBorderDelay || 0,
                        easing: this.DOM.el.dataset.animationBorderEasing || 'easeOutElastic',
                        elasticity: this.DOM.el.dataset.borderElasticity || 400,
                        scaleX: this.DOM.el.dataset.borderScalex || 1.1,
                        scaleY: this.DOM.el.dataset.borderScaley || 1.1,
                        opacity: 0,
                    },
                }
            };
            this.initEvents();
        }
        // once object is constructed, set up mouse/touch listeners
        initEvents() {
            let scrollDiv = document.querySelector("#scroll-div");
            this.scrollKickoffFn = () => {
                if (!this.isActive && window.pageYOffset > 15) {
                    this.scrollTimeout = setTimeout(() => {
                        this.isActive = true;
                        this.animate();
                        scrollDiv.classList.add("unhide");
                    }, 75);
                    document.querySelector("#fullbackground").style.backgroundColor = this.DOM.el.dataset.backgroundColor;
                }
                else {
                    if (window.pageYOffset===0){
                        clearTimeout(this.scrollTimeout);
                        if (this.isActive) {
                            this.isActive = false;
                            this.animate();
                            scrollDiv.classList.remove("unhide");
                        }
                        document.querySelector("#fullbackground").style.backgroundColor = this.DOM.el.dataset.backgroundColorStart;
                    }
                }
            }
            window.addEventListener('scroll', this.scrollKickoffFn);
        }
        getAnimeObj(targetStr) {
            const target = this.DOM[targetStr];
            //this is what's passed to anime function
            let animeOpts = {
                targets: target,
                duration: this.CONFIG.animation[targetStr].duration,
                delay: this.isActive ? this.CONFIG.animation[targetStr].delay : 0,
                easing: this.CONFIG.animation[targetStr].easing,
                elasticity: this.CONFIG.animation[targetStr].elasticity,
                scaleX: this.isActive ? this.CONFIG.animation[targetStr].scaleX : 1,
                scaleY: this.isActive ? this.CONFIG.animation[targetStr].scaleY : 1,
                opacity: this.isActive ? 0 : 1,
            };

            if (targetStr === 'path') {
                animeOpts.d = this.isActive ? this.paths.end : this.paths.start;
            }

            anime.remove(target);
            return animeOpts;
        }
        animate() {
            anime(this.getAnimeObj('path'));
            anime(this.getAnimeObj('image'));
            anime(this.getAnimeObj('border'));
        }
    }
    // pageItems are the group of elements that are affected by animation on each page
    class pageItem {
        constructor(el, body) {
            function getPosition(element) {
                var distanceFromTopOfDocument = 0;
                while (element) {
                    distanceFromTopOfDocument += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }
                return distanceFromTopOfDocument;
            }

            this.body = body;
            this.background = this.body.querySelector('#fullbackground');
            this.scrollbar = this.body.querySelector('#scroll-div');
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.item = this.DOM.el.querySelector('.item');
            this.DOM.offsetTopP = this.DOM.el.querySelector('.offset-top');
            this.DOM.offsetTopO = this.DOM.el.querySelector('.other-offset');
            this.DOM.offsetNumber = this.DOM.el.offsetTop;
            this.DOM.svg = this.DOM.item.querySelector('.item__svg');
            this.DOM.path = this.DOM.svg.querySelector('path');
            this.DOM.deco = this.DOM.svg.querySelector('.item__deco');
            this.DOM.image = this.DOM.svg.querySelector('image');
            this.DOM.pageText = this.DOM.el.querySelector(".page-text")

            this.DOM.itemOffsetTop = getPosition(this.DOM.item);
            this.DOM.pageTextOffsetTop = getPosition(this.DOM.pageText);


            this.paths = {};
            this.paths.start = this.DOM.path.getAttribute('d');
            this.paths.end = this.DOM.item.dataset.morphPath;
            this.CONFIG = {
                animation: {
                    path: {
                        duration: this.DOM.item.dataset.animationPathDuration || 1500,
                        delay: this.DOM.item.dataset.animationPathDelay || 0,
                        easing: this.DOM.item.dataset.animationPathEasing || 'easeOutElastic',
                        elasticity: this.DOM.item.dataset.pathElasticity || 400,
                        scaleX: this.DOM.item.dataset.pathScalex || 1,
                        scaleY: this.DOM.item.dataset.pathScaley || 1,
                        translateX: this.DOM.item.dataset.pathTranslatex || 0,
                        translateY: this.DOM.item.dataset.pathTranslatey || 0,
                        rotate: this.DOM.item.dataset.pathRotate || 0,
                        opacity: 1,
                    },
                    image: {
                        duration: this.DOM.item.dataset.animationImageDuration || 2000,
                        delay: this.DOM.item.dataset.animationImageDelay || 0,
                        easing: this.DOM.item.dataset.animationImageEasing || 'easeOutElastic',
                        elasticity: this.DOM.item.dataset.imageElasticity || 400,
                        scaleX: this.DOM.item.dataset.imageScalex || 1.1,
                        scaleY: this.DOM.item.dataset.imageScaley || 1.1,
                        translateX: this.DOM.item.dataset.imageTranslatex || 0,
                        translateY: this.DOM.item.dataset.imageTranslatey || 0,
                        rotate: this.DOM.item.dataset.imageRotate || 0,
                        opacity: 1,
                    },
                    deco: {
                        duration: this.DOM.item.dataset.animationDecoDuration || 2500,
                        delay: this.DOM.item.dataset.animationDecoDelay || 0,
                        easing: this.DOM.item.dataset.animationDecoEasing || 'easeOutQuad',
                        elasticity: this.DOM.item.dataset.decoElasticity || 400,
                        scaleX: this.DOM.item.dataset.decoScalex || 0.9,
                        scaleY: this.DOM.item.dataset.decoScaley || 0.9,
                        translateX: this.DOM.item.dataset.decoTranslatex || 0,
                        translateY: this.DOM.item.dataset.decoTranslatey || 0,
                        rotate: this.DOM.item.dataset.decoRotate || 0,
                        opacity: 0,
                    }
                }
            };
            this.initEvents();
        }
        initEvents() {
            this.initiateAnimation = () => {
                this.mouseTimeout = setTimeout(() => {
                    this.isActive = true;
                    this.animate();
                }, 75);                
                this.background.style.backgroundColor = this.DOM.item.dataset.backgroundColor;
                this.scrollbar.style.color = this.DOM.item.dataset.backgroundColor;
            }
            this.closeAnimation = () => {
                clearTimeout(this.mouseTimeout);
                if (this.isActive) {
                    this.isActive = false;
                    this.animate();
                }
            }
            this.animateBasedOnScroll = () => {
                let target= this.DOM.el.offsetTop;
                let windowPosition = window.pageYOffset;
                let distancePageTopToWindowTop = target - windowPosition
                let ratio = distancePageTopToWindowTop/window.innerHeight;
                if (ratio > -.1 && ratio<.6){
                    this.DOM.offsetTopP.innerHTML = `activated ${target}`
                    this.DOM.el.classList.add("active");
                    this.DOM.el.classList.remove("deactive");
                    this.initiateAnimation();
                } else{
                    this.DOM.offsetTopP.innerHTML = `deactivated ${target}`
                    this.DOM.el.classList.remove("active");
                    this.DOM.el.classList.add("deactive");
                    this.closeAnimation();
                }

                let item=this.DOM.item;
                let pagetext = this.DOM.pageText;
                if (this.DOM.itemOffsetTop - windowPosition < 20){
                    item.classList.add("conceal");
                }
                else {
                    item.classList.remove("conceal");
                }
                if (this.DOM.pageTextOffsetTop - windowPosition < 100) {
                    pagetext.classList.add("conceal");
                }
                else {
                    pagetext.classList.remove("conceal");
                }
            }
            window.addEventListener('scroll', this.animateBasedOnScroll)
        }
        getAnimeObj(targetStr) {
            const target = this.DOM[targetStr];
            let animeOpts = {
                targets: target,
                duration: this.CONFIG.animation[targetStr].duration,
                delay: this.CONFIG.animation[targetStr].delay,
                easing: this.CONFIG.animation[targetStr].easing,
                elasticity: this.CONFIG.animation[targetStr].elasticity,
                scaleX: this.isActive ? this.CONFIG.animation[targetStr].scaleX : 1,
                scaleY: this.isActive ? this.CONFIG.animation[targetStr].scaleY : 1,
                translateX: this.isActive ? this.CONFIG.animation[targetStr].translateX : 0,
                translateY: this.isActive ? this.CONFIG.animation[targetStr].translateY : 0,
                rotate: this.isActive ? this.CONFIG.animation[targetStr].rotate : 0,
                opacity: this.isActive ? this.CONFIG.animation[targetStr].opacity : 1
            };
            if (targetStr === 'path') {
                animeOpts.d = this.isActive ? this.paths.end : this.paths.start;
            }
            anime.remove(target);
            return animeOpts;
        }
        animate() {
            anime(this.getAnimeObj('path'));
            anime(this.getAnimeObj('image'));
            anime(this.getAnimeObj('deco'));
        }
    }

    const body = document.querySelector("body")
    const firstPageCircleArray = Array.from(document.querySelectorAll('.page-0-circle'));
    const initCircle = (() => firstPageCircleArray.forEach(item => new animationCircleItem(item, body)))();
    const pageArray = Array.from(document.querySelectorAll('.page'));
    const initPages = (() => pageArray.forEach(item => new pageItem(item, body)))();
};

window.addEventListener('DOMContentLoaded', (event) => {
    //this sets the width of the marquee divs based on window width
    let scrollDivTextWidth = document.querySelector('#scroll-div1').offsetWidth;
    document.querySelector("#scroll-div").style.width= scrollDivTextWidth;    
});

window.addEventListener('load', function () {
    // name elements
    let menuButton=document.querySelector('#menu-button');
    let menu = document.querySelector('#contact-list');
    // set up listen events
    menuButton.addEventListener('click', function(){
        menu.classList.toggle('menu-open')
    })

    let email = document.querySelector("#mail-link a");

    //show actual email address instead of 'email'
    function toggleEmail(){
        if (email.innerHTML=="email"){
            email.innerHTML ="thecloakroomdesign @ gmail.com";     
        } else {
            email.innerHTML = "email";
        }
    }

    email.addEventListener('mouseenter', toggleEmail);
    email.addEventListener('mouseleave', toggleEmail);
    email.addEventListener('touchstart', toggleEmail);
    email.addEventListener('touchend', toggleEmail);

    window.onscroll = function(){   
        // scroll variables
        let scrollFromTop = window.pageYOffset;
        let logo = document.getElementById("main-logo");
        let logoOffset = logo.offsetTop;
        let wrapperOffset = document.querySelector("#wrapper").offsetTop;
        let distance = (logoOffset + wrapperOffset - scrollFromTop);
        let logoOffsetLeft = logo.offsetLeft;  
        // evaluate scroll and put on DOM
        // sticky the logo when appropriate
        if (window.innerHeight>window.innerWidth) {
            if (distance < 1.5 * logoOffsetLeft) {
                document.querySelector('body').classList.add('logo-stuck');
                logo.classList.add("sticky");
            } else {
                document.querySelector('body').classList.remove('logo-stuck');
                logo.classList.remove("sticky");
            } 
        } else if (window.innerHeight<window.innerWidth) {    
            //for horizontal screens, stick/unstick closer to original position        
            if (scrollFromTop>5) {
                logo.classList.add("sticky");
            } else {
                logo.classList.remove("sticky");
            } 
        }          
    }
});

