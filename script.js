var clickmenu = document.querySelector("nav i");
var menu = document.querySelector(".menu");
var closemenu = document.querySelector(".menu-icon");


clickmenu.addEventListener("click", function() {
    gsap.to(menu, {
        height: "100vh",
        width: "70%",
        opacity: 1,
    });
});
closemenu.addEventListener("click", function() {
    gsap.to(menu, {
        height: "0",
        width: "0",
        opacity: 0,

    });
});


var swiper = new Swiper("#swiper-1", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true
});
var swiper = new Swiper("#swiper-2", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 70,
        shadowScale: 0.94,
    },
    autoplay: {
        delay: 1501,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    loop: true,
});

Shery.mouseFollower({
    //Parameters are optional.
});
Shery.makeMagnet("nav i , .menu-icon , nav a , .topbar h4 ,  .bottom-btn , a", {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});
Shery.imageMasker("#swiper-1 img", {

    mouseFollower: true,
    text: "HEY",
    fontFamily: "Poppins",

    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});
Shery.textAnimate("nav a , nav i", {
    //Parameters are optional.
    style: 1,
    y: 10,
    delay: 0.1,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
});

function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco();

var swiper = new Swiper("#swiper-3", {
    effect: "cards",
    grabCursor: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },

});

function toggleIcon(expandIconPlus, expandIconMinus, isOpen) {
    if (isOpen) {
        expandIconPlus.style.display = 'none';
        expandIconMinus.style.display = 'block';
    } else {
        expandIconPlus.style.display = 'block';
        expandIconMinus.style.display = 'none';
    }
}

function createAccordion(el) {
    let animation = null;
    let isClosing = false;
    let isExpanding = false;
    const summary = el.querySelector('summary');
    const content = el.querySelector('.faq-content');
    const expandIconPlus = summary.querySelector('.icon-tabler-circle-plus');
    const expandIconMinus = summary.querySelector('.icon-tabler-circle-minus');

    function onClick(e) {
        e.preventDefault();
        el.style.overflow = 'hidden';
        if (isClosing || !el.open) {
            open();
        } else if (isExpanding || el.open) {
            shrink();
        }
    }

    function shrink() {
        isClosing = true;
        const startHeight = `${el.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight}px`;
        if (animation) {
            animation.cancel();
        }
        animation = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
        animation.onfinish = () => {
            toggleIcon(expandIconPlus, expandIconMinus, false);
            onAnimationFinish(false);
        };
        animation.oncancel = () => {
            toggleIcon(expandIconPlus, expandIconMinus, false);
            isClosing = false;
        };
    }

    function open() {
        el.style.height = `${el.offsetHeight}px`;
        el.open = true;
        window.requestAnimationFrame(expand);
    }

    function expand() {
        isExpanding = true;
        const startHeight = `${el.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;
        if (animation) {
            animation.cancel();
        }
        animation = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 350,
            easing: 'ease-out'
        });
        animation.onfinish = () => {
            toggleIcon(expandIconPlus, expandIconMinus, true);
            onAnimationFinish(true);
        };
        animation.oncancel = () => {
            toggleIcon(expandIconPlus, expandIconMinus, true);
            isExpanding = false;
        };
    }

    function onAnimationFinish(open) {
        el.open = open;
        animation = null;
        isClosing = false;
        isExpanding = false;
        el.style.height = el.style.overflow = '';
    }

    summary.addEventListener('click', onClick);
}

document.querySelectorAll('details').forEach(createAccordion);