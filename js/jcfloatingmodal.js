/**
 * floating modal wrapped as a plugin
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
        float_left:20,
        float_modal_url:""
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

            var loadfloating_modal =function () {
                $(".floating_icon").find("img").after('<div style="vertical-align: top; float: left;"><div class="floating_modal" > </div></div>');
                $.ajax({
                    url: settings.float_modal_url,
                    type: "GET"
                }).done(function (data) {
                    $(".floating_modal").html(data);
                    $(".floating_icon").css({
                        width: function () {
                            return $(".floating_icon").width() + $(".floating_modal").width();
                        },
                        left: - $(".floating_modal").width()
                    });
                });
            }
            var call_floating_modal = function () {
                if (settings.floating_modal_notshow){
                    $(".floating_icon").animate({
                        left: settings.float_left
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
            }
            /**
             * plugin initialised
             */
            var init = function () {
                $this.append('<div class="floating_icon" style="cursor: pointer; position: absolute; top: 140px;z-index: 999;"><img style="width: 45px;height: 45px;background-color: transparent;"></div>');
                $(".floating_icon").css({
                    top:settings.floating_top
                });
                $(".floating_icon").find("img").bind("click",function(){
                    call_floating_modal();
                });
                $(".floating_icon").find("img").attr({
                    src: settings.floating_icon_src
                });
                loadfloating_modal();
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
            };

            init();

            return $this;

        })
    };

}));