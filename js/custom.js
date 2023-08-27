/* ------------------------------------------------
Template Name: Hevin - Personal Portfolio/CV HTML Template
Author: jandj team
------------------------------------------------ */

(function($) {
    "use stict";

    /*====================/====================/
                        Mouse cursor
    /====================/====================*/

    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');
    const mouse = {
        x: -100,
        y: -100
    };
    const pos = {
        x: 0,
        y: 0
    };
    const speed = 0.1;
    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
        const rotate = 'rotate(' + angle + 'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    const cursorModifiers = document.querySelectorAll('[cursor-class]');
    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });
        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });


    /*====================/====================/
                       Skill
    /====================/====================*/

    jQuery(document).ready(function() {
        jQuery('.jnj-skill-percent').appear(function() {
            setTimeout(function() {
                var elements = document.querySelectorAll('.jnj-skill-percent');
                for (var i = 0; i < elements.length; i++) {
                    document.getElementById(elements[i].id).innerHTML = document.getElementById(elements[i].id).getAttribute('data-number');
                }
            }, 1000);
        });
    });

    jQuery(document).ready(function($) {


        /*====================/====================/
                           Menu Item
        /====================/====================*/
        if (!jQuery("body").hasClass("home")) {
            var href_attr = jQuery('a.jnj-logo').attr('href');
            jQuery('.navbar ul li a, .widget ul.menu li a').each(function() {
                var jnj_a_attr = jQuery(this).attr('href');
                if (!jnj_a_attr) {
                    return;
                }
                if (jnj_a_attr.indexOf("#") != -1) {
                    var jnj_mini_url = href_attr + jnj_a_attr;
                    jQuery(this).attr("href", jnj_mini_url)
                }
            });
        }

        if (jQuery("body").hasClass("home")) {
            jQuery(window).on("scroll", WindowScroll);
            jQuery('header #jnj-menu a[href^="#"]').on('click', function(e) {
                jQuery('.jnj-sticky').addClass('jnj-header-fix');
                jQuery(window).off("scroll");
                jQuery('header #jnj-menu a').each(function() {
                    jQuery(this).parent().removeClass('current_page_item');
                })
                jQuery(this).parent().addClass('current_page_item');
                var link_target = this.hash;
                var url_nav = jQuery(link_target);
                if (url_nav.length) {
                    var top_item = url_nav.offset().top;
                    jQuery('html, body').stop().animate({
                        'scrollTop': top_item
                    }, 500, 'swing', function() {
                        window.location.hash = link_target;
                        jQuery(window).on("scroll", WindowScroll);
                    });
                }
            });
        }

        /*====================/====================/
                     Line Progressbar
        /====================/====================*/
        jQuery('.progress-bar').each(function() {
            var tlthis = jQuery(this);
            tlthis.appear(function() {
                jQuery(this).find('.progress-content').animate({
                    width: jQuery(this).attr('data-percentage')
                }, 2000);
                jQuery(this).find('.progress-number-mark').animate({
                    left: jQuery(this).attr('data-percentage')
                }, {
                    duration: 2000,
                    step: function(now, fx) {
                        var data = Math.round(now);
                        jQuery(this).find('.percent').html(data + '%');
                    }
                });
            });
        });

        window.dispatchEvent(new Event('resize'));

    });
    /*====================/====================/
                Counter
    /====================/====================*/
    jQuery('.jnj-counter-numbers').each(function() {
        var tlthis = jQuery(this);
        tlthis.appear(function() {
            jQuery(this).prop('Counter', 0).animate({
                Counter: jQuery(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                    jQuery(this).text(Math.ceil(now));
                }
            });
        });
    });
    /*====================/====================/
                Circle Progressbar
    /====================/====================*/
    jQuery(".chart").each(function() {
        var tlthis = jQuery(this);
        setTimeout(function() {
            tlthis.appear(function() {
                tlthis.easyPieChart({
                    easing: 'easeOutElastic',
                    delay: 3000,
                    barColor: '#e83e8c',
                    trackColor: '#e2e8ea',
                    scaleColor: false,
                    lineWidth: 10,
                    trackWidth: 10,
                    size: 250,
                    lineCap: 'square',
                    onStep: function(from, to, percent) {
                        this.el.children[0].innerHTML = Math.round(percent);
                    }
                });
            });
        }, 600);
    });


    /*====================/====================/
                       Loader
    /====================/====================*/

    jQuery(window).on('load', function(e) {

        jQuery('.jnj-loader').fadeOut("slow", function() {
            jQuery(this).remove();
        });

    });

    jQuery(document).ready(function($) {

        jQuery('.jnj-padding-0').parent().addClass('jnj-padding');

        /*====================/====================/
                          Scroll up
        /====================/====================*/
        var btn = jQuery('#jnj-scroll-up');
        jQuery(window).scroll(function() {
            if (jQuery(window).scrollTop() > 10) {
                btn.addClass('show');
            } else {
                btn.removeClass('show');
            }
        });
        btn.on('click', function(e) {
            e.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, '10');
        });

    });



    /*====================/====================/
                     Dropdown Menu
    /====================/====================*/
    jQuery(document).ready(function($) {
        jQuery('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
            if (!jQuery(this).next().hasClass('show')) {
                jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var jQuerysubMenu = jQuery(this).next(".dropdown-menu");
            jQuerysubMenu.toggleClass('show');
            jQuery(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
                jQuery('.dropdown-submenu .show').removeClass("show");
            });
            return false;
        });
        jQuery('a[href*="#"]:not([href="#"]):not([href="#show"]):not([href="#hide"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });


    /*====================/====================/
                    Contact Form
    /====================/====================*/
    jQuery(document).ready(function($) {
        jQuery('#contact-form').on('submit', function(e) {

            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                var url = "php/contact.php";

                // POST values in the background the the script URL
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: jQuery(this).serialize(),
                    success: function(data) {
                        // data = JSON object that contact.php returns

                        // we recieve the type of the message: success x danger and apply it to the 
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            jQuery('#contact-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
                            // empty the form
                            jQuery('#contact-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        })
    });

    /*====================/====================/
                   Header Sticky
    /====================/====================*/
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > 100) {
            jQuery('.jnj-sticky').addClass('jnj-header-fix');
        } else {
            jQuery('.jnj-sticky').removeClass('jnj-header-fix');
        }
    });

    if (document.getElementsByClassName('jnj-theme-preferences').length > 0) {
        const jnj_toggle_slide = document.querySelector('.jnj-theme-preferences input[type="checkbox"]');
        const jnj_current_mode = localStorage.getItem('preferences');

        if (jnj_current_mode) {
            document.documentElement.setAttribute('data-preferences', jnj_current_mode);

            if (jnj_current_mode === 'dark') {
                jnj_toggle_slide.checked = true;
            }
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-preferences', 'dark');
                localStorage.setItem('preferences', 'dark');
            } else {
                document.documentElement.setAttribute('data-preferences', 'light');
                localStorage.setItem('preferences', 'light');
            }
        }

        jnj_toggle_slide.addEventListener('change', switchTheme, false);
    }






    /*====================/====================/
                    Image Move
    /====================/====================*/
    jQuery(".jnj-move-cursor").each(function() {
        let curs = document.querySelector(".jnj-move-cursor");
        document.addEventListener("mousemove", (e) => {
            let x = e.clientX;
            let y = e.clientY;
            curs.style.left = x - 25 + "px";
            curs.style.top = y - 25 + "px";
        });

        let images = document.querySelectorAll(".jnj-service-area-images .jnj-service-area");

        var ima_inner = document.querySelectorAll('.jnj-inner-image');
        for (var i = 0; i < ima_inner.length; i++) {

            images.forEach((image, i) => {
                image.addEventListener("mouseover", (e) => {
                    curs.classList.add("jnj-cursor-show");
                    curs.style.backgroundImage = "url('" + ima_inner[i].getAttribute('data-image') + "')";
                });
                image.addEventListener("mouseleave", (e) => {
                    curs.classList.remove("jnj-cursor-show");
                    curs.style.backgroundImage = "none";
                });
            });

        }
    });


})(jQuery);



/*====================/====================/
                Menu Active
/====================/====================*/

function WindowScroll(event) {
    var jnj_target_area = jQuery(window).scrollTop() + 83;
    var scroll = jQuery(window).scrollTop();
    jQuery('header #jnj-menu a[href^="#"]').each(function() {
        if (jQuery(this).attr("href").indexOf('https://') == -1) {
            var jnj_href_ele = jQuery(jQuery(this).attr("href"));
        } else {
            var jnj_href_ele = jQuery(this);
        }
        if (jQuery(this).attr("href").indexOf('https://') == -1) {
            if (!jnj_href_ele.length) return;
            if (jnj_href_ele.position().top <= jnj_target_area) {
                jQuery(document).find('.menu-item').removeClass("current_page_item current-menu-parent");
                jQuery(this).parent().addClass("current_page_item");
            } else {
                jQuery(this).parent().removeClass("current_page_item");
            }
            if (scroll <= 0) {
                jQuery(".menu-item-type-custom").first().addClass("current_page_item");
            }

        }
    });
}