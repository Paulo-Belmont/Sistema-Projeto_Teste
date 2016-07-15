/*
plugin para impedir que números sejam aceitos na entrada

@author: Fabio Elias / Paulo Belmont
@params:
@license: 
@version: 1.0
@changes: .
@date: 08-02-2012
*/

(function($) {

    $.fn.textOnly = function() {

        //vincula o evento de colar ao textarea
        //visa cancelar o mesmo via ctrl + c ou botão direto do mouse
        $(this).bind('paste', function(e) {
            return false;
        });


        var texto = $(this).val();
        
        /* para aceitar letras use: 0-9
        para aceitar número use: a-z */
        texto = texto.replace(/([0-9])/g, "");
        $(this).val(texto);

    };
})(jQuery);
