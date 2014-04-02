/**
 * jcfloatingmodal v1.0.0
 * by Joe Chang - http://www.anztc.com
 *
 * @license http://www.anztc/licenses/by/1.0/
 * - Free for use in both personal and commercial projects
 * - Attribution requires leaving author name, author link, and the license info intact
 */


'use strict';
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var defaults = {
        floating_icon_src: "/img/Setting-icon.png",
        floating_top: "140px",
        floating_modal_notshow: true,
        float_position: "left",
        float_range:20,
        float_modal_url:"",
        init_callback: null
    };

    $.fn.floating_modal = function (suppliedSettings, options) {
        return this.each(function () {
            var settings = $.extend(true, {}, defaults);
            var $this = $(this);
            if (typeof suppliedSettings === "object") {
                $.extend(true, settings, suppliedSettings);
            } else {
                options = suppliedSettings;
            }

            var loadfloating_modal =function (e) {
                if (settings.float_position == "left"){
                    $(".floating_icon").find("img").after('<div style="vertical-align: top; float: left;"><div class="floating_modal" > </div></div>');
                } else if (settings.float_position == "right"){
                    $(".floating_icon").find("img").after('<div style="vertical-align: top; float: right;"><div class="floating_modal" > </div></div>');
                }
                $.ajax({
                    url: e,
                    type: "GET"
                }).done(function (data) {
                    $(".floating_modal").html(data);
                    if (settings.float_position == "left"){
                        $(".floating_icon").css({
                            left: - $(".floating_modal").width()
                        });
                    } else if (settings.float_position == "right"){
                        $(".floating_icon").css({

                            right: - $(".floating_modal").width()
                        });
                    }
//                    $(".floating_icon").css({
////                        width: function () {
////                            return $(".floating_icon").width() + $(".floating_modal").width();
////                        },
//                        left: - $(".floating_modal").width()
//                    });
                });
            }
            var call_floating_modal = function () {
                if (settings.float_position == "left"){
                    if (settings.floating_modal_notshow){
                        $(".floating_icon").animate({
                            left: settings.float_range
                        }, 500, function() {
                            // Animation complete
                        });
                        settings.floating_modal_notshow = false;
                    } else {
                        $(".floating_icon").animate({
                            left: - $(".floating_modal").width()
                        }, 500, function() {
                            // Animation complete
                        });
                        settings.floating_modal_notshow = true;
                    }
                } else if (settings.float_position == "right"){
                    if (settings.floating_modal_notshow){
                        $(".floating_icon").animate({
                            right: settings.float_range
                        }, 500, function() {
                            // Animation complete
                        });
                        settings.floating_modal_notshow = false;
                    } else {
                        $(".floating_icon").animate({
                            right: - $(".floating_modal").width()
                        }, 500, function() {
                            // Animation complete
                        });
                        settings.floating_modal_notshow = true;
                    }
                }
//                if (settings.floating_modal_notshow){
//                    $(".floating_icon").animate({
//                        left: settings.float_range
//                    }, 500, function() {
//                        // Animation complete
//                    });
//                    settings.floating_modal_notshow = false;
//                } else {
//                    $(".floating_icon").animate({
//                        left: - $(".floating_modal").width()
//                    }, 500, function() {
//                        // Animation complete
//                    });
//                    settings.floating_modal_notshow = true;
//                }
            }
            /**
             * plugin initialised
             */
            var init = function () {
                $this.append('<div class="floating_icon" style="cursor: pointer; position: absolute;z-index: 999;"><img></div>');
                $("body").css("overflow-x","hidden");
                $(".floating_icon").css({
                    top:settings.floating_top
                });

                $(".floating_icon").find("img").bind("click",function(){
                    call_floating_modal();
                });
                $(".floating_icon").find("img").attr({
                    src: settings.floating_icon_src
                });
                $(document).scroll(function() {
                    var currentpx = parseInt(settings.floating_top);
                    var scrolledpx = parseInt($(document).scrollTop());
                    var sum = currentpx+scrolledpx;
                    $( ".floating_icon" ).animate({
                        top: sum
                    }, 20, function() {
                        // Animation complete.
                    });
                })

                if ($.isFunction(settings.init_callback) && !settings.float_modal_url) {

                    if (settings.float_position == "left"){
                        $(".floating_icon").css({
                            left: 45
                        });
                    } else if (settings.float_position == "right"){
                        $(".floating_icon").css({
                            right: 45
                        });
                    }
                    setTimeout(settings.init_callback, 0);

                }else if ($.isFunction(settings.init_callback) && settings.float_modal_url){

                    setTimeout(settings.init_callback, 0);
                    loadfloating_modal(settings.float_modal_url);

                }else if (settings.float_modal_url){

                    loadfloating_modal(settings.float_modal_url);

                }
            };

            init();

            return $this;

        })
    };

}));