Aspect Oriented Ajax
=================

Hooks into ajax requests to execute a pre/post ajax functions. Pure JavaScript. Accepts a function for pre and post. 

Demo fiddle: http://jsfiddle.net/bstaley/k4SBw/

Should be used like so:

    new AjaxAspect(function () {
            document.getElementById('loading').style.display = 'block';
        }, function () {
            document.getElementById('loading').style.display = 'none'; 
        });


Debug File
================

The debug file will console log what request are being made and how long they took. It does this by overriding the open method to get a reference point of time and to store the url. This should only be used to debug, but wouldn't be the worst thing if it made it into production.
