/*
 * Bootstrap Number Style
 * Docs: http://markusslima.github.io/bootstrap-number-style/
 * github: https://github.com/markusslima/bootstrap-number-style
 * Copyright (c) 2018 Markus Vinicius da Silva Lima
 * Version 1.0.0
 * Licensed under the MIT license.
 */
(function($) {
    "use strict";

    var nextId = 0;

    var BNumberStyle = function(element, options) {
        this.options = options;
        this.$elementBNumberStyle = [];
        this.$element = $(element);
    };

    BNumberStyle.prototype = {
        destroy : function () {
            var clone = this.$element.clone();
            this.$element.remove();
            this.$elementBNumberStyle.before(clone);
            this.$elementBNumberStyle.remove();
            this.$element.removeData('bNumberStyle');
        },

        min : function (value) {
            if (value != undefined) {
                this.options.min = value;
                if (this.$element.val() < this.options.min) {
                    this.$element.val(this.options.min)
                }
            } else {
                return this.options.min;
            }
        },

        max : function (value) {
            if (value != undefined) {
                this.options.max = value;
                if (this.$element.val() > this.options.max) {
                    this.$element.val(this.options.max)
                }
            } else {
                return this.options.max;
            }
        },

        step : function (value) {
            if (value != undefined) {
                this.options.step = value;
            } else {
                return this.options.step;
            }
        },

        onCreate : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onCreate = value;
                } else {
                    console.error('This "onCreate" not a function.')
                }
            } else {
                return this.options.onCreate;
            }
        },

        onBefore : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onBefore = value;
                } else {
                    console.error('This "onBefore" not a function.')
                }
            } else {
                return this.options.onBefore;
            }
        },

        onAfter : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onAfter = value;
                } else {
                    console.error('This "onAfter" not a function.')
                }
            } else {
                return this.options.onAfter;
            }
        },

        onPlusBefore : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onPlusBefore = value;
                } else {
                    console.error('This "onPlusBefore" not a function.')
                }
            } else {
                return this.options.onPlusBefore;
            }
        },

        onPlusAfter : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onPlusAfter = value;
                } else {
                    console.error('This "onPlusAfter" not a function.')
                }
            } else {
                return this.options.onPlusAfter;
            }
        },

        onMinusBefore : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onMinusBefore = value;
                } else {
                    console.error('This "onMinusBefore" not a function.')
                }
            } else {
                return this.options.onMinusBefore;
            }
        },

        onMinusAfter : function (value) {
            if (value !== undefined) {
                if (typeof value == 'function') {
                    this.options.onMinusAfter = value;
                } else {
                    console.error('This "onMinusAfter" not a function.')
                }
            } else {
                return this.options.onMinusAfter;
            }
        },

        disabled : function (value) {
            if (value != undefined) {
                this.options.disabled = value;

                if (this.options.disabled) {
                    this.$element.prop('disabled', true);
                    this.$elementBNumberStyle.addClass('disabled');
                } else {
                    this.$element.prop('disabled', false);
                    this.$elementBNumberStyle.removeClass('disabled');
                }
            } else {
                return this.options.disabled;
            }
        },

        constructor : function() {
            var _self = this,
                clone = this.$element.clone();
            
            this.$elementBNumberStyle = $('<div class="bNumberStyle"></div>')
                .append(clone)
                .append('<div class="bNumberStyle-nav"><div class="bNumberStyle-button bNumberStyle-up">+</div><div class="bNumberStyle-button bNumberStyle-down">-</div></div>');

            this.$element.before(this.$elementBNumberStyle);
            this.$element.remove();

            this.$element = clone;

            if (this.options.min == '' && !isNaN(this.$element.attr('min'))) {
                this.options.min = this.$element.attr('min');
            }
            if (this.options.max == '' && !isNaN(this.$element.attr('max'))) {
                this.options.max = this.$element.attr('max');
            }
            if (this.options.step == 1 && !isNaN(this.$element.attr('step'))) {
                this.options.step = this.$element.attr('step');
            }

            if (this.options.disabled) {
                this.$elementBNumberStyle.addClass('disabled');
                this.$element.prop('disabled', true);
            } else {
                this.$elementBNumberStyle.removeClass('disabled');
                this.$element.prop('disabled', false);
            }

            this.$element.on('keydown', function (e) {
                var k = e.keyCode;
                if ((k < 48 || k > 57) && (k < 96 || k > 105) && !String(k).match(/^(8|9|38|40|46)/)) {
                    return false;
                } else if (!String(k).match(/^(8|9|38|40|46)/)) {
                    if (_self.options.max > 0) {
                        if (Number($(this).val()) + Number(String.fromCharCode(57)) > _self.options.max) {
                            return false;
                        }
                    }
                }
            });

            this.$elementBNumberStyle.find('.bNumberStyle-up').on('click', function () {
                var oldValue = parseFloat(_self.$element.val());
                if (oldValue >= _self.options.max && _self.options.max != '') {
                    var newVal = oldValue;
                } else {
                    if (typeof _self.options.onBefore == 'function') {
                        _self.options.onBefore(_self.$element);
                    }
                    if (typeof _self.options.onPlusBefore == 'function') {
                        _self.options.onPlusBefore(_self.$element);
                    }

                    var newVal = oldValue + parseFloat(_self.options.step);
                    _self.$element
                        .val(newVal)
                        .trigger("change");

                    if (typeof _self.options.onPlusAfter == 'function') {
                        _self.options.onPlusAfter(_self.$element);
                    }
                    if (typeof _self.options.onAfter == 'function') {
                        _self.options.onAfter(_self.$element);
                    }
                }
            });

            this.$elementBNumberStyle.find('.bNumberStyle-down').on('click', function () {
                var oldValue = parseFloat(_self.$element.val());
                if (oldValue <= _self.options.min && _self.options.max != '') {
                    var newVal = oldValue;
                } else {
                    if (typeof _self.options.onBefore == 'function') {
                        _self.options.onBefore(_self.$element);
                    }
                    if (typeof _self.options.onMinusBefore == 'function') {
                        _self.options.onMinusBefore(_self.$element);
                    }
                    var newVal = oldValue - parseFloat(_self.options.step);
                    _self.$element
                        .val(newVal)
                        .trigger("change");
                    if (typeof _self.options.onMinusAfter == 'function') {
                        _self.options.onMinusAfter(_self.$element);
                    }
                    if (typeof _self.options.onAfter == 'function') {
                        _self.options.onAfter(_self.$element);
                    }
                }
            });

            if (typeof this.options.onCreate == 'function') {
                this.options.onCreate(this.$element);
            }
        }
    };

    var old = $.fn.bNumberStyle;

    $.fn.bNumberStyle = function(option, value) {
        var get = '', element = this.each(function() {
            var $this = $(this), data = $this.data('bNumberStyle'), options = $.extend({}, $.fn.bNumberStyle.defaults, option, typeof option === 'object' && option);

            if (!data) {
                $this.data('bNumberStyle', ( data = new BNumberStyle(this, options)));
                data.constructor();
            }

            if ( typeof option === 'string') {
                get = data[option](value);
            }
        });

        if ( typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.bNumberStyle.defaults = {
        'min' : '',
        'max' : '',
        'step' : 1,
        'disabled' : false,
        'onCreate' : function () {},
        'onBefore' : function () {},
        'onAfter' : function () {},
        'onPlusBefore' : function () {},
        'onPlusAfter' : function () {},
        'onMinusBefore' : function () {},
        'onMinusAfter' : function () {}
    };

    $.fn.bNumberStyle.noConflict = function() {
        $.fn.bNumberStyle = old;
        return this;
    };
})(window.jQuery);