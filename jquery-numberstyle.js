/**
     * @description Plugin para formatar um input para number com incremento
     * @function
     * @public
     * @name inputNumber
     */
    $.fn.inputNumber = function () {
        $(this).each(function() {
            var clone = $(this).clone(),
                spinner = $('<div class="quantity"></div>')
                    .append(clone)
                    .append('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>');

            $(this).before(spinner);
            $(this).remove();

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
        });
    }