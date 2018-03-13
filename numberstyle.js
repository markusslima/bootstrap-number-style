/*
 * Numberstyle
 * doc: http://markusslima.github.io/bootstrap-filestyle/
 * github: https://github.com/markusslima/bootstrap-filestyle
 *
 * Copyright (c) 2017 Markus Vinicius da Silva Lima
 * Version 2.1.0
 * Licensed under the MIT license.
 */
(function($) {
    "use strict";

    var nextId = 0;

    var Numberstyle = function(element, options) {
        this.options = options;
        this.$elementNumberstyle = [];
        this.$element = $(element);
    };

    Numberstyle.prototype = {
        destroy : function() {
            this.$element.removeAttr('style').removeData('numberstyle');
            this.$elementNumberstyle.remove();
        },

        goMin : function(value) {
            if (value === true || value === false) {
                this.options.disabled = value;
                this.$element.prop('disabled', this.options.disabled);
                this.$elementNumberstyle.find('label').prop('disabled', this.options.disabled);

                if (this.options.disabled)
                    this.$elementNumberstyle.find('label').css('opacity', '0.65');
                else
                    this.$elementNumberstyle.find('label').css('opacity', '1');
            } else {
                return this.options.disabled;
            }
        },

        goMax : function(value) {
            if (value === true || value === false) {
                this.options.dragdrop = value;
            } else {
                return this.options.dragdrop;
            }
        },

        onPlusBefore : function(value) {},

        onPlusAfter : function() {},
        
        onMinusBefore : function(value) {},

        onMinusAfter : function(value) {},

        setVal: function () {},

        placeholder : function(value) {
            if (value !== undefined) {
                this.options.placeholder = value;
                this.$elementNumberstyle.find('input').attr('placeholder', value);
            } else {
                return this.options.placeholder;
            }
        },

        constructor : function() {
            var _self = this,
                clone = _self.$element.clone(),
                spinner = $('<div class="quantity"></div>')
                            .append(clone)
                            .append('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>');

            _self.$element.before(spinner);
            _self.$element.remove();

            var input = spinner.find('input[type="number"]'),
                btnUp = spinner.find(".quantity-up"),
                btnDown = spinner.find(".quantity-down"),
                step = Number(input.attr("step")) || 1,
                min = Number(input.attr("min")),
                max = Number(input.attr("max"));

            input.keydown(function (e) {
                var k = e.keyCode;
                if ((k < 48 || k > 57) && (k < 96 || k > 105) && !String(k).match(/^(8|9|38|40|46)/)) {
                    return false;
                } else if (!String(k).match(/^(8|9|38|40|46)/)) {
                    if (Number($(this).val()) + Number(String.fromCharCode(57)) > max) {
                        return false;
                    }
                }
            }).focus(function () {
                $(this)[0].selectionStart = this.selectionEnd;
            });

            btnUp.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + parseFloat(step);
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - parseFloat(step);
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        }
    };

    var old = $.fn.numberstyle;

    $.fn.numberstyle = function(option, value) {
        var get = '', element = this.each(function() {
            if ($(this).attr('type') === 'file') {
                var $this = $(this), data = $this.data('numberstyle'), options = $.extend({}, $.fn.numberstyle.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('numberstyle', ( data = new Filestyle(this, options)));
                    data.constructor();
                }

                if ( typeof option === 'string') {
                    get = data[option](value);
                }
            }
        });

        if ( typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.numberstyle.defaults = {
        'text' : 'Choose file',
        'htmlIcon' : '',
        'btnClass' : 'btn-secondary',
        'size' : 'nr',
        'input' : true,
        'badge' : false,
        'badgeName': 'badge-light',
        'buttonBefore' : false,
        'dragdrop' : true,
        'disabled' : false,
        'placeholder': '',
        'onChange': function () {}
    };

    $.fn.numberstyle.noConflict = function() {
        $.fn.numberstyle = old;
        return this;
    };

    $(function() {
        $('.numberstyle').each(function() {
            var $this = $(this), options = {
                'input' : $this.attr('data-input') !== 'false',
                'htmlIcon' : $this.attr('data-icon'),
                'buttonBefore' : $this.attr('data-buttonBefore') === 'true',
                'disabled' : $this.attr('data-disabled') === 'true',
                'size' : $this.attr('data-size'),
                'text' : $this.attr('data-text'),
                'btnClass' : $this.attr('data-btnClass'),
                'badge' : $this.attr('data-badge') === 'true',
                'dragdrop' : $this.attr('data-dragdrop') !== 'false',
                'badgeName' : $this.attr('data-badgeName'),
                'placeholder': $this.attr('data-placeholder')
            };

            $this.numberstyle(options);
        });
    });

    $.fn.numberstyle = function () {
    $(this).each(function() {
        
    });
}
})(window.jQuery);