// thanks to (link codrops site src code) for code and design inspiration

window.addEventListener('scroll', () => {
    document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
})
// ////////
{
    class animationCircleItem {
        constructor(el) {
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
        // once animationBlobItem is constructed, set up mouse/touch listeners
        initEvents() {
            this.mouseenterFn = () => {
                this.mouseTimeout = setTimeout(() => {
                    this.isActive = true;
                    this.animate();
                }, 400);
            }
            this.mouseleaveFn = () => {
                clearTimeout(this.mouseTimeout);
                if (this.isActive) {
                    this.isActive = false;
                    this.animate();
                }
            }

            this.scrollKickoffFn = () => {
                if (!this.isActive && window.pageYOffset > 15) {
                    this.scrollTimeout = setTimeout(() => {
                        this.isActive = true;
                        this.animate();
                    }, 75);
                }
                else {
                    if (window.pageYOffset===0){
                        console.log('back at top');
                        clearTimeout(this.scrollTimeout);
                        if (this.isActive) {
                            this.isActive = false;
                            this.animate();
                        }
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
    class pageItem {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.item = this.DOM.el.querySelector('.item');
            this.DOM.offsetTopP = this.DOM.el.querySelector('.offset-top');
            this.DOM.offsetNumber = this.DOM.offsetTopP.offsetTop;
            this.DOM.svg = this.DOM.item.querySelector('.item__svg');
            this.DOM.path = this.DOM.svg.querySelector('path');
            this.DOM.deco = this.DOM.svg.querySelector('.item__deco');
            this.DOM.image = this.DOM.svg.querySelector('image');
            this.paths = {};
            this.paths.start = this.DOM.path.getAttribute('d');
            this.paths.end = this.DOM.item.dataset.morphPath;
            this.CONFIG = {
                animation: {
                    path: {
                        duration: this.DOM.el.dataset.animationPathDuration || 1500,
                        delay: this.DOM.el.dataset.animationPathDelay || 0,
                        easing: this.DOM.el.dataset.animationPathEasing || 'easeOutElastic',
                        elasticity: this.DOM.el.dataset.pathElasticity || 400,
                        scaleX: this.DOM.el.dataset.pathScalex || 1,
                        scaleY: this.DOM.el.dataset.pathScaley || 1,
                        translateX: this.DOM.el.dataset.pathTranslatex || 0,
                        translateY: this.DOM.el.dataset.pathTranslatey || 0,
                        rotate: this.DOM.el.dataset.pathRotate || 0
                    },
                    image: {
                        duration: this.DOM.el.dataset.animationImageDuration || 2000,
                        delay: this.DOM.el.dataset.animationImageDelay || 0,
                        easing: this.DOM.el.dataset.animationImageEasing || 'easeOutElastic',
                        elasticity: this.DOM.el.dataset.imageElasticity || 400,
                        scaleX: this.DOM.el.dataset.imageScalex || 1.1,
                        scaleY: this.DOM.el.dataset.imageScaley || 1.1,
                        translateX: this.DOM.el.dataset.imageTranslatex || 0,
                        translateY: this.DOM.el.dataset.imageTranslatey || 0,
                        rotate: this.DOM.el.dataset.imageRotate || 0
                    },
                    deco: {
                        duration: this.DOM.el.dataset.animationDecoDuration || 2500,
                        delay: this.DOM.el.dataset.animationDecoDelay || 0,
                        easing: this.DOM.el.dataset.animationDecoEasing || 'easeOutQuad',
                        elasticity: this.DOM.el.dataset.decoElasticity || 400,
                        scaleX: this.DOM.el.dataset.decoScalex || 0.9,
                        scaleY: this.DOM.el.dataset.decoScaley || 0.9,
                        translateX: this.DOM.el.dataset.decoTranslatex || 0,
                        translateY: this.DOM.el.dataset.decoTranslatey || 0,
                        rotate: this.DOM.el.dataset.decoRotate || 0
                    }
                }
            };
            this.initEvents();
        }
        initEvents() {
            this.writeOffsets=()=>{
                this.DOM.offsetTopP.innerHTML=this.DOM.offsetNumber
            }
            window.addEventListener('load', this.writeOffsets);

            this.mouseenterFn = () => {
                // after 75 milliseconds, set isActive to true and run animate function
                this.mouseTimeout = setTimeout(() => {
                    this.isActive = true;
                    this.animate();
                }, 75);
            }
            this.mouseleaveFn = () => {
                // after 75 milliseconds, set isActive to false and run animate function
                clearTimeout(this.mouseTimeout);
                if (this.isActive) {
                    this.isActive = false;
                    this.animate();
                }
            }
            this.animateBasedOnScroll = () => {
                if (window.pageYOffset==this.DOM.el.offsetTop){
                    this.DOM.offsetTopP.innerHTML = "BOOM"
                    this.mouseenterFn();
                }
                
            }
            // account for touchstreens
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
            this.DOM.el.addEventListener('touchend', this.mouseleaveFn);

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
                rotate: this.isActive ? this.CONFIG.animation[targetStr].rotate : 0
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

    const firstPageCircleArray = Array.from(document.querySelectorAll('.first-page-circle'));
    const initCircle = (() => firstPageCircleArray.forEach(item => new animationCircleItem(item)))();

    const pageArray = Array.from(document.querySelectorAll('.page'));
    const initPages = (() => pageArray.forEach(item => new pageItem(item)))();



    setTimeout(() => document.body.classList.remove('loading'), 2000);
};


window.addEventListener('load', function () {
    window.onscroll = function () { stickLogo() };
    function stickLogo() {   
        let logo = document.getElementById("main-logo");
        let scrollTop = window.pageYOffset;
        let logoOffset = document.querySelector('#main-logo').offsetTop;
        let wrapperOffset = document.querySelector("#wrapper").offsetTop;
        let distance = (logoOffset + wrapperOffset - scrollTop);
        let vw = (document.querySelector('#main-logo').offsetLeft);        

        if (window.innerHeight>window.innerWidth) {
            if (distance < 1.5 * vw) {
                 logo.classList.add("sticky");
            } else {
                logo.classList.remove("sticky");
            } 
        } else if (window.innerHeight<window.innerWidth) {            
            if (distance < .05*window.innerHeight) {
                logo.classList.add("sticky");
            } else {
                logo.classList.remove("sticky");
            } 
        }  
    }
});

