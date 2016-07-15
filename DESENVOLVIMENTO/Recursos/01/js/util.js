/*
* SimpleModal Contact Form
* http://www.ericmmartin.com/projects/simplemodal/
* http://code.google.com/p/simplemodal/
*
* Copyright (c) 2010 Eric Martin - http://ericmmartin.com
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Revision: $Id: contact.js 236 2010-03-09 06:04:40Z emartin24 $
*
*/
;

function radioExclusivo() {
    $().ready(
        function () {
            $('span.radio input[type=radio]').click(
                function () {
                    var $item = $(this);

                    //busca todos os outros radios com mesmo value e ids diferentes
                    $('span.radio input[type=radio]:checked:value=' + $item.val()).not('#' + $item.attr('id')).each(
                        function () {
                            var $otherItem = $(this);
                            $otherItem.removeAttr('checked');
                        }
                    );
                }
            );
        }
    );
}

function mask() {
    $().ready(
        function () {
            $('input[Mask]').each(
                function () {
                    var $item = $(this);
                    var espacoReservado = "_";
                    var parcial = false;

                    if ($item.attr('EspacoReservado') != null)
                        espacoReservado = $item.attr('EspacoReservado');

                    if ($item.attr('Parcial') != null)
                        parcial = ($item.attr('Parcial') == 'true');
                    $item.unmask();
                    $item.mask($item.attr('Mask'), { placeholder: espacoReservado, allowPartials: parcial });
                }
            );
        }
    );
}

function maskNumber() {
    $().ready(
        function () {
            $('input[MaskNumber=]').each(
                function () {
                    var $item = $(this);
                    $item.keypress(function (event) {
                        var keyCode = (window.event != null ? event.keyCode : event.which);

                        if (keyCode != null && (keyCode >= 32 && keyCode <= 125) || keyCode > 186) { //caracteres digitaveis
                            if ((keyCode < 48 || keyCode > 57)) { //)
                                var keyChar = String.fromCharCode(keyCode);

                                if ($(this).attr('MaskNumber').indexOf(keyChar) < 0) {
                                    //verificar se o caracter esta entre as excecoes
                                    event.preventDefault();
                                }
                            }
                        }
                    });
                }
            );
        }
    );
}

function datePicker() {
    $().ready(
        function () {
            $('input[DatePicker=]').each(
                function () {
                    var $item = $(this);
                    var mudarAno = false;
                    var mudarMes = false;
                    var rangeYear = '-10:+10';
                    var dataMinima = null;
                    var dataMaxima = null;

                    if ($item.attr('MudarAno') != null)
                        mudarAno = $item.attr('MudarAno');

                    if ($item.attr('MudarMes') != null)
                        mudarMes = $item.attr('MudarMes');

                    if ($item.attr('RangeYear') != null)
                        rangeYear = $item.attr('RangeYear');

                    if ($item.attr('minDate') != null)
                        dataMinima = new Date($item.attr('minDate'));


                    if ($item.attr('maxDate') != null)
                        dataMaxima = new Date($item.attr('maxDate'));

                    $item.datepicker({ changeYear: mudarAno, yearRange: rangeYear, changeMonth: mudarMes, selectOtherMonths: true, minDate: dataMinima, maxDate: dataMaxima });
                    $item.mask('99/99/9999', { placeholder: '_' });
                }
            );
        }
    );
}
function multiFile() {
    $().ready(
        function () {
            $('input[type=file]').each(
                function () {
                    var $item = $(this);
                    var extencoes = null;
                    var maxlength = 10;

                    if ($item.attr('accept') != null)
                        extencoes = $item.attr('accept');
                    if ($item.attr('maxlength') != null)
                        maxlength = $item.attr('maxlength');

                    $item.MultiFile({
                        max: maxlength,
                        accept: extencoes,
                        STRING: { remove: '<img src="../Interface/icones/icon-excluir.gif" height="15" width="16" alt="Excluir"/>'
                        }
                    });
                }
            );
        }
    );
}
function validaCpf(value, args) {
    var cpf = args.Value;

    cpf = retirar(cpf, '.');
    cpf = retirar(cpf, '-');
    cpf = retirar(cpf, '_');

    if (cpf != "")
        args.IsValid = validaCpfSomenteNumeros(cpf);
    else
        args.IsValid = true;
}

 function ValidaCNPJ(txt) {
	var cnpj = txt.value;
	var i = 0;
	var l = 0;
	var strNum = "";
	var strMul = "6543298765432";
	var character = "";
	var iValido = 1;
	var iSoma = 0;
	var strNum_base = "";
	var iLenNum_base = 0;
	var iLenMul = 0;
	var iSoma = 0;
	var strNum_base = 0;
	var iLenNum_base = 0;

	l = cnpj.length;
	for (i = 0; i < l; i++) {
		caracter = cnpj.substring(i, i + 1)
		if ((caracter >= '0') && (caracter <= '9'))
			strNum = strNum + caracter;
	};


	if (strNum.length != 14 && cnpj != "") {
		alert("CNPJ invalido.");
		txt.value = "";
		//txt.focus();
		return false;
	}

	strNum_base = strNum.substring(0, 12);
	iLenNum_base = strNum_base.length - 1;
	iLenMul = strMul.length - 1;
	for (i = 0; i < 12; i++)
		iSoma = iSoma +
	parseInt(strNum_base.substring((iLenNum_base - i), (iLenNum_base - i) + 1), 10) *
	parseInt(strMul.substring((iLenMul - i), (iLenMul - i) + 1), 10);

	iSoma = 11 - (iSoma - Math.floor(iSoma / 11) * 11);
	if (iSoma == 11 || iSoma == 10)
		iSoma = 0;

	strNum_base = strNum_base + iSoma;
	iSoma = 0;
	iLenNum_base = strNum_base.length - 1
	for (i = 0; i < 13; i++)
		iSoma = iSoma +
	parseInt(strNum_base.substring((iLenNum_base - i), (iLenNum_base - i) + 1), 10) *
	parseInt(strMul.substring((iLenMul - i), (iLenMul - i) + 1), 10)

	iSoma = 11 - (iSoma - Math.floor(iSoma / 11) * 11);
	if (iSoma == 11 || iSoma == 10)
		iSoma = 0;
	strNum_base = strNum_base + iSoma;

	if (strNum != strNum_base && cnpj != "") {
		alert("CNPJ invalido.");
		txt.value = "";
		//  txt.focus();
		return false;
	}


	return true;
}

//valida um CPF, retorna True caso esteja valido
function validaCpfSomenteNumeros(cpf) {
    var i;
    s = cpf;

    var c = s.substr(0, 9);
    var dv = s.substr(9, 2);

    if (s.length != 11)
        return false;

    var d1 = 0;

    for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i);
    }

    if (d1 == 0) {
        return false;
    }

    d1 = 11 - (d1 % 11);
    if (d1 > 9)
        d1 = 0;

    if (dv.charAt(0) != d1) {
        return false;
    }

    d1 *= 2;
    for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i);
    }

    d1 = 11 - (d1 % 11);
    if (d1 > 9)
        d1 = 0;

    if (dv.charAt(1) != d1) {
        return false;
    }

    return true;
}

 function validaCPFPorInput(txt) {
	var cpf = txt.value;
	var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;

	cpf = cpf.replace(/\./g, "");
	cpf = cpf.replace(/\-/g, "");
	cpf = cpf.replace(/\_/g, "");

	if (cpf != "") {
		if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
	cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
	cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
	cpf == "88888888888" || cpf == "99999999999") {
			alert("CPF invalido.");
			txt.value = "";
			//txt.focus();
			return false;
		}
	}
	soma = 0;
	for (i = 0; i < 9; i++) {
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	}

	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11) {
		resto = 0;
	}

	if (cpf != "") {
		if (resto != parseInt(cpf.charAt(9))) {
			alert("CPF invalido.");
			txt.value = "";
			// txt.focus();

			return false;
		}
	}
}    

function showModal(strPagina) {
    var retorno = null;

    if (strPagina != null) {
        if (window.showModalDialog) {
            var sFeatures = "dialogHeight: 800px;dialogWidth: 1000px";
            retorno = window.showModalDialog(strPagina, "", sFeatures);
        }
        else {
            retorno = window.open(strPagina, "modal=yes");
        }
    }

    return retorno;
};

function preencherAutoComplite(idControleTexto, idControleVal, retorno) {

    if (retorno != null && retorno != '') {
        retorno = JSON.parse(retorno);

        $('#' + idControleTexto).val(retorno.Apresentacao);
        $('#' + idControleVal).val(retorno.Codigo);

        $('#' + idControleTexto).focus();
    }
}

function obterArrayAddParam(idControle) {
    var retorno = [];

    var umTexto = $('#' + idControle).val();

    retorno.push({ key: "texto", value: umTexto });

    return retorno;
}

function SomenteTexto() {

    $().ready(function () {
        $('input[Mode="Text"]').each(function () {

            $(this).bind('paste', function (e) {
                return false;
            });

            $(this).keypress(function (event) {
                var keyCode = (window.event != null ? event.keyCode : event.which);
                if (keyCode > 47 && keyCode < 59)
                    event.preventDefault();
            });
        });
    });
}

function retirarAcentos() {
    $().ready(function () {
        $('input[Mode="SemAcento"]').each(function () {

            $(this).bind('paste', function (e) {
                return false;
            });

            $(this).keyup(function (event) {

                var texto = $(this).val();

                var acento = 'àáâãäèéêëìíîïòóôõöùúûüÀÁÂÃÄÈÉÊËÌÍÎÒÓÔÕÖÙÚÛÜçÇñÑ';
                var semacento = 'aaaaaeeeeiiiiooooouuuuAAAAAEEEEIIIOOOOOUUUUcCnN';
                var nova = '';

                for (i = 0; i < texto.length; i++) {
                    if (acento.indexOf(texto.substr(i, 1)) > -1)
                        nova += semacento.substr(acento.search(texto.substr(i, 1)), 1);
                    else
                        nova += texto.substr(i, 1);
                }

                $(this).val(nova);
            });
        });
    });
}
//funções para o modal popup
function Inicializar() {
    $(document).ready(function () {

        //seta o valor e o id do item selecionado no grid 
        $('.executa').click(function () {

            var descricao = $(this).next().val();
            var id = $(this).next().next().val();

            var ancora = $(this).attr('elemento-raiz');

            $(ancora).find('#hdfValor').val(id);
            $(ancora).find('#hdfDescricao').val(descricao);
            $(ancora).find('#txtDescricao').val(descricao);

            if ($(ancora).find('.enviarSelecao').val() == 'True')
                $(ancora).find('.selecionarPOPUP').click();

        });

        //limpar a seleçao
        $('.clear').click(function () {

            var attr = $(this).attr('href');

            // For some browsers, `attr` is undefined; for others,
            // `attr` is false.  Check for both.
            if (typeof attr == 'undefined' || attr == false) {
                return;
            }

            var ancora = $(this).attr('elemento-raiz');

            $(ancora).find('#hdfValor').val('');
            $(ancora).find('#hdfDescricao').val('');
            $(ancora).find('#txtDescricao').val('');

            if ($(ancora).find('.enviarSelecao').val() == 'True')
                $(ancora).find('.selecionarPOPUP').click();

        });

        //colocar o foco no campo de pesquisa ao abrir o popup
        $('.modal').on('shown', function () {
            $(this).find('.pesquisa').focus();
        });

        //anula o enter na caixa de pesquisa e coloca o foco no botão pesquisar
        $('.pesquisa').keypress(function (event) {
            if (event.keyCode == 13) {
                $(this).next().focus();
                return false;
            }
        });


        //a ancora que abre o popup será habilitada pela seguinte condição:

        //input hidden '.habilitarPOPUP' atribuido value True ou False no servidor
        //ancora com atributo customizado 'idEnable' com valor igual ao id do input hidden acima 
        //(para identificar qual popup deve ser tratado , pois pode haver mais de um na tela)
        //ex:

        //<input type="hidden" runat="server" id="hfEnable_UCPesquisa1" class="habilitarPOPUP" />

        //<a id='modal' href="#" idmodal='# myModal.ClientID ' idenable='hfEnable_UCPesquisa1' class='icon-plus-sign' data-toggle="modal"></a>
        $('.habilitarPOPUP').each(function () {

            var habilitarPOPUPvalue = $(this).val();

            var ancoraPopup = 'a[idEnable =' + $(this).attr('id') + ']';
            var botaoClear = 'a[idenableclear =' + $(this).attr('id') + ']';

            if (habilitarPOPUPvalue == 'True') {
                $(ancoraPopup).attr('data-toggle', 'modal');
                
                $(ancoraPopup).attr('href', '#');
                $(botaoClear).attr('href', '#');
            }
            else {
                $(ancoraPopup).attr('data-toggle', '');
                
                $(ancoraPopup).removeAttr('href');
                $(botaoClear).removeAttr('href');
            }
        });

        $('.espaco-table-ie7').each(function () {
            var linha = $(this).html();
            linha = ' ' + linha;
            $(this).html(linha);
        });

        $('#checkAll').change(function () {

            var marcado = $(this).prop("checked");

            $('input:checkbox').each(function (index) {
                if (marcado)
                    $(this).attr('checked', 'checked');
                else
                    $(this).removeAttr('checked');
            });

        });

        $("textarea[maxlength]").keypress(function (event) {
            var key = event.which;

            //todas as teclas incluindo enter
            if (key >= 33 || key == 13) {
                var maxLength = $(this).attr("maxlength");
                var length = this.value.length;
                if (length >= maxLength) {
                    event.preventDefault();
                }
            }
        });
    });
}

function maxlengthTextArea() {
    $().ready(function() {
        $('[Mode=MaxLength]').each(function() {

            var MaxLength = $(this).attr('Tamanho');
            var TotalLengh = $(this).val().length;

            var rotulo = this.selector + 'label';

            //cria o <p> com informações de quantidade de caracteres dinamicamente
            if ($(rotulo).length == 0) {

                var conteudo = '<div class="linha">';
//                conteudo = conteudo + '<label></label>';
                conteudo = conteudo + '<p id="' + $(this)[0].id + 'label' + '" >Caracteres digitados: <b>' + TotalLengh + '</b> de ' + MaxLength + '.</p>';
                conteudo = conteudo + '</div>';
                $(conteudo).insertAfter(this);
            }
            //vincula o evento de colar ao textarea
            //visa cancelar o mesmo via ctrl + c ou botão direto do mouse
            //            $(this).bind('paste', function(e) {
            //                return false;
            //            });

            $(this).bind('paste', function(e) {

                var textarea = $(this);
                var maxLength = parseInt(MaxLength);

                setTimeout(function() {
                    textarea.val(textarea.val().substring(0, maxLength));                    
                }, 100);

            });

            $(this).keypress(function(e) {
                if (($(this).val().length == 0 && e.keyCode == 32) || $(this).val().length >= MaxLength) {
                    e.preventDefault();
                }
            });
            $(this).keyup(function(e) {
                var total = parseInt($(this).val().length);

                var rotulo = this.id + 'label';

                if ($('#' + rotulo).length > 0) {
                    $('#' + rotulo).html('Caracteres digitados <b>' + total + '</b> de ' + MaxLength + '.');

                }
            });

        }); //each
    });                //read
} //function

//validar se a data é valida
  function VerificaData(txt) {

	var digData = txt.value;
	var bissexto = 0;
	var data = digData;
	var tam = data.length;
	if (tam == 10) {
		var dia = data.substr(0, 2)
		var mes = data.substr(3, 2)
		var ano = data.substr(6, 4)
		if ((ano > 1900) || (ano < 2100)) {
			switch (mes) {
				case '01':
				case '03':
				case '05':
				case '07':
				case '08':
				case '10':
				case '12':
					if ((dia <= 31) && (dia > 0)) {
						return true;
					}
					break

				case '04':
				case '06':
				case '09':
				case '11':
					if ((dia <= 30) && (dia > 0)) {
						return true;
					}
					break
				case '02':
					/* Validando ano Bissexto / fevereiro / dia */
					if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0)) {
						bissexto = 1;
					}
					if ((bissexto == 1) && (dia <= 29) && (dia > 0)) {
						return true;
					}
					if ((bissexto != 1) && (dia <= 28) && (dia > 0)) {
						return true;
					}
					break
			}
		}
	}

	if (data != "") {
		alert("A Data " + data + " é inválida!");
		txt.value = "";
		return false;
	}
}