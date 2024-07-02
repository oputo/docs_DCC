/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
* Copyright 2010-2016 Adobe
* All Rights Reserved.
* NOTICE:  All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
*************************************************************************/

(function() {
  var scroll = {
    offset: 50,

    init: function() {
      // Watch the click action
      window.document.body.addEventListener('click', this.preventClick.bind(this));
    },

    scrollIfNeeded: function(href) {
      // 'href' from <a> is in this window
      var needed = window.document.getElementsByName(href.slice(1));

      if(needed && needed.length === 1) {
        var boundingRect = needed[0].getBoundingClientRect();
        var yOffset = window.pageYOffset + boundingRect.top - this.offset;
        window.scrollTo(window.pageXOffset, yOffset);
        return true;
      }

      return false;
    },

    preventClick: function(elem) {
      if(elem.target.nodeName === 'A' // <a>
         && this.scrollIfNeeded(elem.target.getAttribute('href'))
      ) {
        // Do not scroll back
        elem.preventDefault();
      }
    }
  }

  // The document must be loaded to detect clicks
  window.addEventListener('DOMContentLoaded', scroll.init.bind(scroll));
})();
