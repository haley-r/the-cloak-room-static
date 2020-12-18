console.log('hello from main.js');

window.addEventListener('scroll', function () {
    document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';

});


//  from https://stackoverflow.com/questions/52637835/dynamically-change-background-color-on-scroll
const [red, green, blue] = [69, 111, 225]
const section1 = document.querySelector('.section1')
const circle = document.querySelector('.circle')
const background = document.querySelector('html')
const thingy = document.querySelector('.imgdiv div')


window.addEventListener('scroll', () => {
    // let y = 1 + (window.scrollY || window.pageYOffset) / 150
    // y = y < 1 ? 1 : y // ensure y is always >= 1 (due to Safari's elastic scroll)
    // const [r, g, b] = [red / y, green / y, blue / y].map(Math.round)
    // section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    // circle.style.fill = `rgb(${r + 60}, ${g - 40}, ${b + -50})`
    // background.style.backgroundColor = `rgb(${r + 20}, ${g + 200}, ${b + 70})`

    // // thingy.style.backgroundColor = `rgb(${r}, ${g}, ${b})`



    // document.getElementById('showRGB').innerHTML = `rgb(${r}, ${g}, ${b})`;
console.log('we scrollin!');
    document.querySelector('body').classList.add('scrolled')

})


// CODROPS

{
    class ImgItem {
        // build an instance of the ImgItem class using info from the DOM  
        constructor(el) {
            // build DOM object that based on selectors. basically making variables.
            // need to be specific because we're picking instances of a class
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.svg = this.DOM.el.querySelector('.item__svg');
            this.DOM.path = this.DOM.svg.querySelector('path');
            this.DOM.deco = this.DOM.svg.querySelector('.item__deco');
            this.DOM.image = this.DOM.svg.querySelector('image');

            this.paths = {};
            // start path is the d attribute of the svg thats showing
            this.paths.start = this.DOM.path.getAttribute('d');
            // end path is the data-morph-path attribute of the .item div
            this.paths.end = this.DOM.el.dataset.morphPath;

            // CONFIG - take those HTML data values and put em into this object for EZ access
            this.CONFIG = {
                // Defaults:
                animation: {
                    // anime settings based on what's in html, or defaults
                    // (dashes convert to camelCase)
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
            // call initEvents function to set up mouse/touch listeners
            this.initEvents();
        }
        // once ImgItem is constructed, set up mouse/touch listeners
        initEvents() {
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
            // account for touchstreens
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
            this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
        }
        getAnimeObj(targetStr) {
            const target = this.DOM[targetStr];
            // the targetStr is path, deco, or image- we defined those when we constructed the object
            // this.DOM.path = this.DOM.svg.querySelector('path');
            // this.DOM.deco = this.DOM.svg.querySelector('.item__deco');
            // this.DOM.image = this.DOM.svg.querySelector('image');

            // these are all the defaults defined above, but using strings instead of writing it all out.
            // the data names are very important because of this!
            // this is the object that we give to the anime function
            let animeOpts = {
                // identify the object to animate, and other qualities that are
                // just a part of that object (not a state of being?)
                targets: target,
                duration: this.CONFIG.animation[targetStr].duration,
                delay: this.CONFIG.animation[targetStr].delay,
                easing: this.CONFIG.animation[targetStr].easing,
                elasticity: this.CONFIG.animation[targetStr].elasticity,
                // only change scale, translate, or rotate if is active (hover/touch)
                // if isActive is false, do original scale/no translation/no rotation (revert)
                // scaleX: this.isActive ? this.CONFIG.animation[targetStr].scaleX : 1,
                // scaleY: this.isActive ? this.CONFIG.animation[targetStr].scaleY : 1,



                translateX: this.isActive ? this.CONFIG.animation[targetStr].translateX : 0,
                translateY: this.isActive ? this.CONFIG.animation[targetStr].translateY : 0,
                rotate: this.isActive ? this.CONFIG.animation[targetStr].rotate : 0,
                // ADDED BY ME
                scale: this.isActive ? 2 : 1,
            };

            // if we're building an object to animate the path, we need to tell it what path its animating to
            // if hover/touch, it's the "end" path we got from the dom. 
            // if not hover/touch, it's the start path  (revert)
            if (targetStr === 'path') {
                animeOpts.d = this.isActive ? this.paths.end : this.paths.start;
            }

            anime.remove(target);
            return animeOpts;
        }
        animate() {
            // Animate the path, the image and deco.
            // remember, anime wants an object passed to it to know what to do
            // so we're gonna go make an object for it based on the path, image, and deco 
            // info from the DOM we collected earlier
            anime(this.getAnimeObj('path'));
            anime(this.getAnimeObj('image'));
            anime(this.getAnimeObj('deco'));
        }
    }

    // make an array of object-elements with class 'item', there are multiple in the example
    const items = Array.from(document.querySelectorAll('.animated-blob'));
    // then, for each of those 'item' object-elements, make a new ImgItem object (defined above)
    const init = (() => items.forEach(item => new ImgItem(item)))();
    // wait 2 seconds and then remove 'loading' class from body 
    setTimeout(() => document.body.classList.remove('loading'), 2000);
};