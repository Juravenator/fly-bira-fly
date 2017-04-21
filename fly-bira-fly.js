window.onload = function flyBiraFlyOnload() {
  var catimages = ["/test.jpg"];

  /*
   * preloading
   */
  catimages.forEach(function(url) {
    // <link rel="prefetch" href="(url)">
    var link = document.createElement("link");
    link.setAttribute("rel", "prefetch");
    link.setAttribute("href", url);
    document.head.appendChild(link);
  });

  var magicword = "catcatcat";
  var pos = 0;
  document.addEventListener('keydown', function flyBiraFlyKeyDown(event) {
    if (event.key === magicword[pos]) {
      pos += 1;
      if (pos === magicword.length) {
        makeBiraFly();
        document.removeEventListener('keydown', flyBiraFlyKeyDown);
        magicword = pos = null;
      }
    }
    else {
      pos = 0;
    }
  });

  function throwBira() {
    console.log("throwBira");
  }

  var maxBiraTimeout = 10 * 1000;
  window.makeBiraFly = function() {
    throwBira();
    setTimeout(makeBiraFly, maxBiraTimeout);
  }
}
