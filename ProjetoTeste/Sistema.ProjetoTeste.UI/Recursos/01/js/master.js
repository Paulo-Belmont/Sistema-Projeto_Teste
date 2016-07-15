Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(BeginRequestHandler);

function BeginRequestHandler(sender, args) {
    var summary = $('.valErrorSummary');
    $(summary).hide();
    $(summary).removeClass();
    $(summary).addClass('valErrorSummary');
    $(summary).addClass('alert');
    $(summary).addClass('alert-danger');
    var innerHtml = '<h4 class="alert-heading">Aten��o!</h4>';
}

function EndRequestHandler(sender, args) {
    if (args.get_error() != undefined) {
        var errorMessage = args.get_error().message;
        args.set_errorHandled(true);

        if (args.get_error().name == "Sys.WebForms.PageRequestManagerTimeoutException")
            alert('O Servidor n�o respondeu dentro do tempo esperado.');
        else
            alert(errorMessage.replace("Sys.WebForms.PageRequestManagerServerErrorException: ", ""));
    }
}

function mensagem(msn) {
    var summary = $('.valErrorSummary');
    $(summary).removeClass();
    $(summary).addClass('valErrorSummary');
    $(summary).addClass('alert');

    if ((msn == "Opera��o realizada com sucesso!") || (msn == "Registro exclu�do com sucesso!")) {
        $(summary).addClass('alert-success');
        var innerHtml = '<h4 class="alert-success">Finalizado!</h4>' + msn;
    }
    else {
        $(summary).addClass('alert-danger');
        var innerHtml = '<h4 class="alert-heading">Aten��o!</h4>' + msn;
    }


    $(summary).html(innerHtml).show();
}


// Script necess�rio
$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
    $('#navbar').scrollspy();
});
