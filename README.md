ajax-auto-loading
=================

Hooks into ajax requests to show/hide a waiting symbol. Pure JavaScript. Accepts a function for hiding and showing. 

Demo fiddle: http://jsfiddle.net/bstaley/k4SBw/

Should be used like so:

    new ajaxLoading(function () {
            document.getElementById('loading').style.display = 'block';
        }, function () {
            document.getElementById('loading').style.display = 'none'; 
        });

