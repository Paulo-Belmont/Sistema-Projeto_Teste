function Upper() {

    $('input:text, textarea').change(function () {
        if (event.which == 36) return;

        var valor = $(this).val();

        if (valor.indexOf("_") != -1 || valor.indexOf("/") != -1)
            return;

        $(this).val(valor.toUpperCase());
    });

    $('input:text, textarea').keyup(function (event) {
        if (event.which == 36) return;

        var valor = $(this).val();

        if (valor.indexOf("_") != -1 || valor.indexOf("/") != -1)
            return;

        $(this).val(valor.toUpperCase());
    });

}

function maskCodigo() {
    $().ready(
        function () {
            $('input[MaskCodigo]').each(
                function () {
                    var $item = $(this);
                    $item.mask($item.attr('MaskCodigo'), { reverse: true });

                    $(this).bind('paste', function (e) {
                        return false;
                    });

                    $(this).blur(function (e) {
                        var length = $item.attr('MaskCodigo').length;

                        while (length > $(this).val().length) {
                            var texto = $(this).val();
                            $(this).val('0' + texto);
                        }
                    });
                }
            );
        }
    );
}

jQuery(document).ready(function () {
    /* ABRE MODAL DE CADASTRO */
    jQuery('.js-modal-cadastro').click(function () {
        jQuery('#myModal').modal('show');
    });

    /*COLOCA O TOOLTIP NO PADRÃO BOOTSTRAP*/
    function maskTooltip() {
        $().ready(
        function () {
            $('.js-tooltip').tooltip('hide');
        });
    }

    /* MASCARA PARA CPF */
    jQuery(".js-cpf").mask("999.999.999-99");

    /*Evento Tooltip*/
    jQuery('.js-tooltip').tooltip('hide');

    jQuery('.acao').click(function () {
        var selecionado = jQuery('.combo').find(":selected").val();
        if (selecionado == '-1') {
            jQuery('.js-alert').show();
            jQuery('.js-alert-label').html('<p>Informe o municipio.</p>');
            return false;
        }

    });

    jQuery('.modal').on('shown', function () {
        jQuery('.js-alert').hide();
    });




});

function OnlyLetters() {
    jQuery(document).ready(function () {
        jQuery(".OnlyLetters").keyup(function () {
            var valor = jQuery(".OnlyLetters").val().replace(/[^a-zA-Z]+/g, '');
            jQuery(".OnlyLetters").val(valor);
        });
    });
}

function maskTooltip() {
    jQuery().ready(
        function () {
            jQuery('.js-tooltip').tooltip('hide');
        });
}

/* FUNCAO PARA MODAL - CRIADA PARA SER REGISTRADA NO SERVER SIDE */
function registroScript() {
    jQuery(document).ready(function () {
        jQuery('.js-modal-cadastro').click(function () {
            jQuery('#myModal').modal('show');
        });

        jQuery('.acao').click(function () {
            var selecionado = jQuery('.combo').find(":selected").val();
            if (selecionado == '-1') {
                jQuery('.js-alert').show();
                jQuery('.js-alert-label').html('<p>Informe o municipio.</p>');
                return false;
            }

        });

        jQuery(".js-cpf").mask("999.999.999-99");
    });
}

function registroRegra() {
    jQuery(document).ready(function () {


        jQuery('.js-alert').show();
        jQuery('.js-alert-label').html('<p>Limite de inscritos pelo Município já foi atingido!</p>');
        return false;

    });
}

function maskMoney() {
    $().ready(
        function () {
            $('input[MaskMoney=]').each(
                function () {
                    $(this).maskMoney({ symbol: "R$", decimal: ",", thousands: ".", maxlength: "10" });
                }
            );
        }
    );
}



    
