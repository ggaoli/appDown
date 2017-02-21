;
(function($, window, document, undefined) {
    var _buffer = null,
        _watch = [],
        $window = $(window),
        Plugin = function() {};

    $.expr[":"].hasClassStartingWith = function(el, i, selector) {
        var re = new RegExp("\\b" + selector[3]);
        return re.test(el.className);
    };

    Plugin.prototype = {
        globals: {
            pluginName: "fadeThis",
            bufferTime: 300
        },
        defaults: {
            baseName: "slide-",
            speed: 500,
            easing: "swing",
            offset: 0,
            reverse: true,
            distance: 50,
            scrolledIn: null,
            scrolledOut: null,
            afterLoad: null
        },
        init: function(elem, options) {
            this.addElements(elem, options);

            this._setEvent();
            this._checkVisibleElements();
        },
        addElements: function(elem, options) {
            var element = elem === document.body ? window : elem,
                $element = element === window ? $("body") : $(element),
                base = this,
                classBaseName = (options && options.baseName) ? options.baseName : this.defaults.baseName;

            if (!$element.is(":hasClassStartingWith('" + classBaseName + "')")) {

                $element.find(":hasClassStartingWith('" + classBaseName + "')").each(function() {
                    base._addElement($(this), options);
                });
            } else {
                base._addElement($element, options);
            }

            return $element;
        },
        _addElement: function($elem, options) {
            var metadata = $elem.data("plugin-options"),
                localOptions = $.extend({}, this.defaults, options, metadata),
                item = {
                    element: $elem,
                    options: localOptions,
                    invp: false
                };
            _watch.push(item);
            this._prepareElement(item);
            return $elem;
        },
        _prepareElement: function(item) {
            var cssOptionsIn = {
                    opacity: 0,
                    visibility: "visible",
                    position: "relative"
                },
                direction = null;

            if (item.element.hasClass(item.options.baseName + "right")) {
                direction = "left";
            } else if (item.element.hasClass(item.options.baseName + "left")) {
                direction = "right";
            } else if (item.element.hasClass(item.options.baseName + "top")) {
                direction = "bottom";
            } else if (item.element.hasClass(item.options.baseName + "bottom")) {
                direction = "top";
            } else {
                return false;
            }

            cssOptionsIn[direction] = item.options.distance;
            item.element.filter = "alpha(opacity=0)"; /* IE8 */
            item.element.css(cssOptionsIn);
        },
        _setEvent: function() {
            var base = this;

            $window.on("scroll", function(e) {
                if (!_buffer) {
                    _buffer = setTimeout(function() {
                        base._checkVisibleElements(e);
                        _buffer = null;
                    }, base.globals.bufferTime);
                }
            });
        },
        _checkVisibleElements: function(e) {
            var base = this;

            $.each(_watch, function(key, item) {
                if (base._isVisible(item)) {
                    if (!item.invp) {
                        item.invp = true;
                        base._triggerFading(item);

                        if (item.options.afterLoad) {
                            item.options.afterLoad();
                        }

                        if (item.options.scrolledIn) {
                            item.options.scrolledIn.call(item.element, e);
                        }
                        item.element.trigger("fadethisscrolledin", e);
                    }
                } else if (item.invp) {
                    item.invp = false;
                    if (item.options.reverse) {
                        base._triggerFading(item, false);
                    }
                    if (item.options.scrolledOut) {
                        item.options.scrolledOut.call(item.element, e);
                    }
                    item.element.trigger("fadethisscrolledout", e);
                }
            });
        },
        _isVisible: function(item) {
            var docViewTop = $window.scrollTop() + item.options.offset,
                docViewBottom = docViewTop + $window.height() - 2 * item.options.offset,
                elemTop = item.element.offset().top,
                elemBottom = elemTop + item.element.height();

            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        },
        _triggerFading: function(item, appear) {
            appear = typeof appear !== "undefined" ? appear : true;

            var stateAnimIn = {
                    opacity: 1
                },
                stateAnimOut = {
                    opacity: 0
                },
                direction = null;

            if (item.element.hasClass(item.options.baseName + "right")) {
                direction = "left";
            } else if (item.element.hasClass(item.options.baseName + "left")) {
                direction = "right";
            } else if (item.element.hasClass(item.options.baseName + "top")) {
                direction = "bottom";
            } else if (item.element.hasClass(item.options.baseName + "bottom")) {
                direction = "top";
            } else {
                return false;
            }

            stateAnimIn[direction] = 0;
            stateAnimOut[direction] = item.options.distance;

            if (appear) {
                item.element.stop(true).animate(stateAnimIn, item.options.speed, item.options.easing);

            } else {
                item.element.stop(true).animate(stateAnimOut, item.options.speed, item.options.easing);
            }

        }
    };

    Plugin.defaults = Plugin.prototype.defaults;
    Plugin.globals = Plugin.prototype.globals;

    window.Plugin = new Plugin();

    $.fn[Plugin.globals.pluginName] = function(options) {
        this.each(function() {
            if (!$.data(window, "plugin_" + Plugin.globals.pluginName)) {
                $.data(window, "plugin_" + Plugin.globals.pluginName, "set");
                $.data(this, "plugin_" + Plugin.globals.pluginName, window.Plugin.init(this, options));
            } else if (!$.data(this, "plugin_" + Plugin.globals.pluginName)) {
                $.data(this, "plugin_" + Plugin.globals.pluginName, window.Plugin.addElements(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);





$(function() {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
        $('.section-6').find('.step10').css({
            top: '176px',
            left: '130px'
        }).find('img').attr('src', 'images/sec631.png');
    }
    $(window).fadeThis({
        speed: 800,
        distance: 300,
        reverse: false
    });
    var section = {
        sec1: $('.section-1'),
        sec2: $('.section-2'),
        sec3: $('.section-3'),
        sec4: $('.section-4'),
        sec5: $('.section-5'),
        sec6: $('.section-6')
    };
    section.sec2.fadeThis({
        speed: 800,
        distance: 300,
        reverse: false,
        afterLoad: function() {
            section.sec2.find('.step5').animate({
                opacity: '1'
            }, 300, function() {
                section.sec2.find('.step6').animate({
                    opacity: '1'
                }, 300, function() {
                    section.sec2.find('.step7').animate({
                        opacity: '1'
                    }, 300, function() {
                        section.sec2.find('.step8').animate({
                            opacity: '1'
                        }, 300, function() {
                            section.sec2.find('.step9').animate({
                                opacity: '1'
                            }, 300, function() {
                                section.sec2.find('.step10').animate({
                                    opacity: '1'
                                }, 300, function() {
                                    section.sec2.find('.step11').animate({
                                        opacity: '1'
                                    }, 300)
                                })
                            })
                        })
                    })
                })
            })
        }
    });
    section.sec3.fadeThis({
        speed: 800,
        distance: 300,
        reverse: false,
        afterLoad: function() {
            section.sec3.find('.step2').animate({
                opacity: '1'
            }, 500, function() {
                section.sec3.find('.step3').animate({
                    opacity: '1'
                }, 500)
            })
        }
    });
    section.sec4.fadeThis({
        speed: 800,
        distance: 300,
        reverse: false,
        afterLoad: function() {
            section.sec4.find('.step5').animate({
                opacity: '1'
            }, 400, function() {
                section.sec4.find('.step6').animate({
                    opacity: '1'
                }, 400, function() {
                    section.sec4.find('.step7').animate({
                        opacity: '1'
                    }, 400, function() {
                        section.sec4.find('.step8').animate({
                            opacity: '1'
                        }, 400)
                    })
                })
            })
        }
    });
    section.sec5.fadeThis({
        speed: 800,
        distance: 300,
        reverse: false,
        afterLoad: function() {
            section.sec5.find('.step2').animate({
                opacity: '1'
            }, 1500, function() {
                section.sec5.find('.step3').animate({
                    opacity: '1'
                }, 3000)
            })
        }
    });
    section.sec6.fadeThis({
        speed: 800,
        distance: 300,
        reverse: false,
        afterLoad: function() {
            section.sec6.find('.step5').animate({
                opacity: '1'
            }, 300, function() {
                section.sec6.find('.step6').animate({
                    opacity: '1'
                }, 300, function() {
                    section.sec6.find('.step7').animate({
                        opacity: '1'
                    }, 300, function() {
                        section.sec6.find('.step8').animate({
                            opacity: '1'
                        }, 300, function() {
                            section.sec6.find('.step9').animate({
                                opacity: '1'
                            }, 300, function() {
                                section.sec6.find('.step10').animate({
                                    opacity: '1'
                                }, 300);
                            })
                        })
                    })
                })
            })
        }
    });


    var x1 = section.sec1.offset().left;
    var y1 = section.sec1.offset().top;
    section.sec1.on('mousemove', function(e) {
        check(e);
    });
    section.sec2.on('mousemove', function(e) {
        check(e);
    });

    function check(e) {
        var x2 = e.offsetLeft - x1;
        var y2 = e.clientY - y1;
        var LorR = x2 - 610;
        var RorL = y2 - 250;
        var x3 = x1 + 610 - e.clientX;
        var y3 = y1 + 250 - e.clientY;
        if (LorR >= 0) {
            if (RorL >= 0) {
                section.sec1.css("transform", "perspective(3000px)rotateX(" + y2 / 500 * 8 + "deg)rotateY(" + -(-x2 / 1220 * 8) + "deg)");
            }
        } else {
            section.sec1.find('.step1,.step2,.step3').css("transform", "perspective(3000px)rotateX(" + (y3 / 500 * 8) + "deg)rotateY(" + -x3 / 1220 * 8 + "deg)");
        }
    }

});