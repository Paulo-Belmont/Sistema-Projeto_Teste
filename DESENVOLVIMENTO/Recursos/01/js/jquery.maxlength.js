/*
@author: Fabio Elias
@params:
length - o tamanho máximo que o textarea pode aceitar
@license: 
@version: 1.0
@changes: .
*/

(function($) {

    $.fn.maxlengthTextArea = function(length) {

        var MaxLength = length;
        var TotalLengh = $(this).val().length;

        var rotulo = this.selector + 'label';

        //cria o <p> com informações de quantidade de caracteres dinamicamente
        if ($(rotulo).length == 0) {

            var conteudo = '<div class="linha">';
            conteudo = conteudo + '<label class="label2"></label>';
            conteudo = conteudo + '<p id="' + this[0].id + 'label' + '" >Caracteres digitados: <b>' + TotalLengh + '</b> de ' + length + '.</p>';
            conteudo = conteudo + '</div>';


            // var conteudo = '<p id="' + this[0].id + 'label' + '" >Caracteres digitados: <b>0</b> de ' + length + '.</p>';
            $(conteudo).insertAfter(this);
            //$(rotulo).addClass('label2');
        }

        //envelopa o textarea para manter o <p> alinhado com o mesmo
        //$(this.selector).wrap('<div><label class="label2" /></div>');

        //vincula o evento de colar ao textarea
        //visa cancelar o mesmo via ctrl + c ou botão direto do mouse
        $(this).bind('paste', function(e) {
            return false;
        });


        $(this).keypress(function(e) {
            if ($(this).val().length >= MaxLength) {
                e.preventDefault();
            }
        });
        $(this).keyup(function(e) {
            var total = parseInt($(this).val().length);

            var rotulo = this.id + 'label';

            if ($('#' + rotulo).length > 0) {
                $('#' + rotulo).html('Caracteres digitados <b>' + total + '</b> de ' + length + '.');

            }

        });
    };
})(jQuery);