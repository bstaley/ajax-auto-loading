Aspect Oriented Ajax
=================

Hooks into ajax requests to execute a pre/post ajax functions. Pure JavaScript. Accepts a function for pre and post. 

Demo fiddle: http://jsfiddle.net/bstaley/k4SBw/

Should be used like so:

    new ajaxAspect(function () {
            document.getElementById('loading').style.display = 'block';
        }, function () {
            document.getElementById('loading').style.display = 'none'; 
        });

