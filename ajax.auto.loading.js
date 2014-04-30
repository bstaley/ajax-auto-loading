/*
*Check out my site site here: http://cssvariableshim.azurewebsites.net/
*
*   Copyright 2014 Brandon R Staley
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*
*Developed by: Brandon R Staley(bstaley0@gmail.com)
*Purpose: Hooks into ajax requests to show/hide a waiting symbol. Pure JavaScript. Accepts a function for hiding and showing. 
*Dependencies: javascript
*Tested on browsers: Chrome 28+, Firefox 22+, IE 9+, O 16+
*Usage: In theory it should be able to be used on any browser.
*Contributers:
*/

/**
 *Hooks into ajax requests to show/hide a waiting symbol. Pure JavaScript. Accepts a function for hiding and showing.
 *@param   Function    show     a function that will be called when the loading process begins.
 *@param   Function    hide     a function that will be called when all loading processes are complete.
 */
var ajaxLoading = function (show, hide) {

    //keep the scope
    var loading = this;

    //keeps track of the outbound request are not complete
    loading.count = 0;

    //keep the original sends function
    XMLHttpRequest.prototype.originalSend = XMLHttpRequest.prototype.send;

    //assign a new function to the orginal function, this way we can stuff some code in
    XMLHttpRequest.prototype.send = function (body) {

        //keep scope
        var xhr = this;

        //call the original send function
        xhr.originalSend(body);

        //monitor the state of the ajax call
        xhr.onreadystatechange = function (e) {
            //is request complete
            if (this.readyState === 4) {

                loading.count--;

                //if the outstanding ajax requests are 0 then hide the symbol
                if (loading.count === 0) {
                    hide.apply();
                }

                //no more reason to monitor this
                this.onreadystatechange = null;
            }
        };

        //if the count is 0 then you will need to show the symbol
        if (loading.count === 0) {
            show.apply();
        }

        //note that there is an outstanding request
        loading.count++;
    };
}
