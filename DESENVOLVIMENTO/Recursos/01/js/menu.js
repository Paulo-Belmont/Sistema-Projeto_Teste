/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/* -------------------------------- FUNCAO MENU HOME */

jQuery(function () {
    jQuery('.subnivel').each(function () {
        jQuery(this).parent().eq(0).hoverIntent({
            // fade in do menu
            timeout: 100,
            over: function () {

                var contador = jQuery('.item');
                contador = contador.length;

                //pega largura da div global, divide por 2 e centraliza o menu
                var largura = jQuery('.global .container').width();
                var margin = (largura / 2);


                if (largura < 460) {
                    if (largura < 245) {
                        var largura = 245;
                        var margin = 122;
                        jQuery('.subnivel li').css('clear', 'both');
                        jQuery('.subnivel').css('margin-left', -margin + 'px');
                        jQuery('.subnivel').width(largura - 20);
                        jQuery('.subnivel li.lista').width(largura);
                    }
                    else {
                        var largura = jQuery('.global .container').width();
                        var margin = (largura / 2);
                        jQuery('.subnivel li').css('clear', 'both');
                        jQuery('.subnivel').css('margin-left', -margin + 'px');
                        jQuery('.subnivel').width(largura - 20);
                        jQuery('.subnivel li.lista').width(largura);
                    }
                }
                else {

                    //verifica se o menu está maior q o monitor e o redimensiona
                    var largura = jQuery('.global .container').width();
                    var larguraMonitor = window.screen.width;

                    if (largura > 940) {
                        if (contador < 4) {
                            largura = largura - 460;
                        }
                    }

                    if (largura == 940) {
                        if (contador < 4) {
                            largura = largura - 230;
                        }
                    }

                    if (larguraMonitor < largura) {
                        largura = larguraMonitor - 20;
                    }

                    var margin = (largura / 2);

                    jQuery('.subnivel li').css('clear', 'none');
                    jQuery('.subnivel').css('margin-left', -margin + 'px');
                    jQuery('.subnivel').width(largura - 20);
                    jQuery('.subnivel li.lista').width(largura - 245);
                }

                var current = jQuery('.subnivel:eq(0)', this);
                current.fadeIn(150);
            },

            out: function () {
                var current = jQuery('.subnivel:eq(0)', this);
                current.fadeOut(150);
            }
        });
    });

});

