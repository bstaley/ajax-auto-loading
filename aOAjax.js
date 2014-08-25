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
*Purpose: Hooks into ajax requests to execute a pre/post ajax functions. Pure JavaScript. Accepts a function for pre and post.
*Dependencies: javascript
*Tested on browsers: Chrome 28+, Firefox 22+, IE 9+, O 16+
*Usage: In theory it should be able to be used on any browser.
*Contributers:
*/

/**
 Hooks into ajax requests to execute a pre/post ajax functions. Pure JavaScript. Accepts a function for pre and post.
 *@param   Function    pre      a function that will be called when the loading process begins.
 *@param   Function    post     a function that will be called when all loading processes are complete.
 */
var ajaxAspect = function (pre, post) {

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

        //hold on to anything coming in as onreadystatechange
        xhr.originalonreadystatechange = xhr.onreadystatechange;
        
        //monitor the state of the ajax call
        xhr.onreadystatechange = function (e) {
            //if there was an original function in place for onreadystate change, then execute it.
            if (this.originalonreadystatechange) { this.originalonreadystatechange.apply(this, [e]); }
            
            //is request complete
            if (this.readyState === 4) {

                loading.count--;

                //if the outstanding ajax requests are 0 then the post function needs to execute
                if (loading.count === 0) {
                    post.apply(this, [e]);
                }

                //no more reason to monitor these
                this.onreadystatechange = null;
                this.originalonreadystatechange = null;
            }
        };

        //if the count is 0 then you will need to execute the pre function
        if (loading.count === 0) {
            pre.apply(this,[xhr]);
        }

        //note that there is an outstanding request
        loading.count++;
    };
};
