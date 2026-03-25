/*
* iSOON - Ideal Coming Soon Template
* Release Date: April 2017
* Last Update: April 2017
* Author: Madeon08
* Copyright (C) 2017 Madeon08
* This is a premium product available exclusively here : http://themeforest.net/user/Madeon08/portfolio
*/

/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. Basic functions
    3. Fullpage
    4. Countdown
    5. Photo galleries
    6. Menu animations
    7. Newsletter
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).load(function() {
    "use strict";

    $("#right-block-top , #right-block-bottom , #fullpage , #fp-nav , #menu-access , .social-footer").css("opacity", "0");
    $("#fullpage").css("top", "100vh");
    setTimeout(function() {
        $("#loading").fadeOut();
    }, 1000);
    setTimeout(function() {
        $("#fullpage").css({
            top: "0",
            opacity: "1"
        });
        $("#right-block-top").addClass("animated-quick fadeInUp").css("opacity", "1");
    }, 1500);
    setTimeout(function() {
        $("#right-block-bottom").addClass("animated-quick fadeInUp").css("opacity", "1");
    }, 1600);
    setTimeout(function() {
        $("#fp-nav , #menu-access , .social-footer").css("opacity", "1");
        $("#right-block-bottom , #right-block-top").removeClass("animated-middle fadeInUp");
    }, 2210);
});

/* ------------------------------------- */
/* 2. Basic functions .................. */
/* ------------------------------------- */

function selectedfield() {
    var a = document.getElementById("reason");
    "placeholder" !== a.options[a.selectedIndex].value && $("#reason").removeClass("no-selection");
}

function menuclosing() {
    $("#menu , #fullpage , .holdscroll , #fp-nav , #menu-access").removeClass("menu-opened");
    $("#menu-access .icon_menu").removeClass("display-none");
    $("#menu-access .icon_close").addClass("display-none");
}
$("#menu-access").on("mouseenter mouseleave", function() {
    $(this).toggleClass("hovered");
});
$(".form-control").on("focusin focusout", function() {
    $(this).siblings(".icon-fields").toggleClass("active");
});
$(document).ready(function() {
    "use strict";

    var homeVideo = document.getElementById("home-bg-video");
    if (homeVideo) {
        homeVideo.muted = true;
        homeVideo.defaultMuted = true;
        homeVideo.playsInline = true;
        var tryPlayVideo = function() {
            var playPromise = homeVideo.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(function() {});
            }
        };
        homeVideo.addEventListener("canplay", tryPlayVideo, { once: true });
        tryPlayVideo();
        document.addEventListener("visibilitychange", function() {
            if (!document.hidden && homeVideo.paused) {
                tryPlayVideo();
            }
        });
        window.addEventListener("pageshow", function(ev) {
            if (ev.persisted && homeVideo.paused) {
                tryPlayVideo();
            }
        });
        homeVideo.addEventListener("ended", function() {
            homeVideo.currentTime = 0;
            tryPlayVideo();
        });
    }

    /* ------------------------------------- */
    /* 3. Fullpage ......................... */
    /* ------------------------------------- */

    $("#fullpage").fullpage({
        anchors: "12345".split(""),
        navigationTooltips: ["Main", "Our Work", "How We Work", "Why Me", "Contact"],
        showActiveTooltip: !1,
        menu: "#menu",
        css3: !0,
        scrollingSpeed: 800,
        responsiveWidth: 1025
    });

    var $fpNav = $("#fp-nav");
    if ($fpNav.length && !$fpNav.find(".clinicians-site-home-item").length) {
        $fpNav.find("ul").before(
            '<div class="clinicians-site-home-item">' +
                '<button type="button" class="clinicians-site-home-btn" aria-label="Go to JBPC home page">' +
                    "<span></span>" +
                    '<div class="fp-tooltip">Home</div>' +
                "</button>" +
            "</div>"
        );
        $fpNav.on("click", ".clinicians-site-home-btn", function(event) {
            event.stopPropagation();
            window.location.href = "index.html";
        });
    }

    /* ------------------------------------- */
    /* 4. Countdown ........................ */
    /* ------------------------------------- */

                                  // Year/Month/Day Hour:Minute:Second
    $("#getting-started").countdown("2017/10/24 15:30:30", function(a) {
        $(this).html(a.strftime('%D Days <br> <span class="time">%Hh %Mm %Ss</span> <span class="text">... Before the launch</span>'));
    });

    /* ------------------------------------- */
    /* 5. Photo galleries .................. */
    /* ------------------------------------- */

    $("#gallery-1").on("click", function() {
        $.swipebox([{
            href: "img/gallery-1.jpg",
            title: "Carefully designed"
        }, {
            href: "img/gallery-2.jpg",
            title: "Colors of life"
        }, {
            href: "img/gallery-3.jpg",
            title: "Where the energy is"
        }]);
    });
    $("#gallery-2").on("click", function() {
        $.swipebox([{
            href: "img/gallery-2.jpg",
            title: "Carefully designed"
        }, {
            href: "img/gallery-3.jpg",
            title: "Colors of life"
        }, {
            href: "img/gallery-1.jpg",
            title: "Where the energy is"
        }]);
    });

    /* ------------------------------------- */
    /* 6. Menu animations .................. */
    /* ------------------------------------- */

   $(window).on("click", function(a) {
        var t = a.target;
        if (t.id === "fp-nav") {
            return;
        }
        if ($("#menu-access , #fp-nav li, #fp-nav a").find(t).length) {
            return;
        }
        if ($(t).closest(".clinicians-site-home-btn").length) {
            return;
        }
        menuclosing();
    });

    $("#menu-access").on("click", function(event) {
        event.stopPropagation();
        $("#menu , #fullpage , #fp-nav").toggleClass("menu-opened");
        $("#menu-access .icon_to_act").toggleClass("display-none");
    });
    
    $(document).on("keyup", function(a) {
        27 == a.keyCode && (menuclosing());
    });

    // The "slide" class is added by JS below, after the fullpage launching to avoid any conflict with the fullpage's slides.
    $("#carousel-services").addClass("slide");

    /* ------------------------------------- */
    /* 7. Newsletter ....................... */
    /* ------------------------------------- */

    $("#notifyMe").notifyMe();
});