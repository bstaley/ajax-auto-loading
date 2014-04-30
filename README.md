ajax-auto-loading
=================

Hooks into ajax requests to show/hide a waiting symbol. Pure JavaScript. Accepts a function for hiding and showing. 

Should be used like so:
`new ajaxLoading(function () {`
    `document.getElementById('loading').style.display = 'block';`
    `}, function () {`
    `document.getElementById('loading').style.display = 'none'; `
    `});`
