window.onload = function flyBiraFlyOnload() {

  var dir = document.querySelector('script[src$="fly-bira-fly.js"]').getAttribute('src').slice(0,-"fly-bira-fly.js".length);
  var catpics = new Array(16);
  for (var i = 0; i < catpics.length;) {
    catpics[i] = dir + "catpics/" + ++i + ".jpg"
  }

  var catsounds = new Array(35);
  for (i = 0; i < catsounds.length;) {
    catsounds[i] = dir + "catsounds/item_" + i++ + ".mp3"
  }


  /*
   * preloading
   */
  catpics.concat(catsounds).forEach(function(url) {
    // <link rel="prefetch" href="url">
    var link = document.createElement("link");
    link.setAttribute("rel", "prefetch");
    link.setAttribute("href", url);
    document.head.appendChild(link);
  });
  // stylesheet
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", dir + "fly-bira-fly.css");
  document.head.appendChild(link);

  /*
   * detect user typing the magic word
   */
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

  /*
   * periodically schedule Bira
   */
  var maxBiraTimeout = 5 * 1000;
  window.makeBiraFly = function() {
    throwBira();
    setTimeout(makeBiraFly, maxBiraTimeout);
  }

  /*
   * show Bira
   */
  function throwBira() {

    var img = document.createElement('img');
    var catpic = catpics[Math.floor(Math.random()*catpics.length)];
    img.setAttribute('src', catpic);
    img.setAttribute('fly-bira-fly', '');
    var duration = Math.floor(Math.random() * 4000 + 3000); // between 3-7s
    img.style.animationDuration = duration + "ms";
    var ypos = Math.floor(Math.random() * (window.innerHeight - 500));
    img.style.top = ypos + "px";
    if (Math.random() > .5) {
      img.style.animationDirection = 'reverse';
      img.style.transform = "scaleX(-1)";
      img.style.animationTimingFunction = "ease-out";
    }
    else {
      img.style.animationTimingFunction = "ease-in";
    }
    document.body.appendChild(img);

    var sound = document.createElement('audio');
    var catsound = catsounds[Math.floor(Math.random()*catsounds.length)];
    sound.setAttribute('src', catsound);
    sound.setAttribute('autoplay', '');

    setTimeout(function () {
      document.body.removeChild(img);
    }, duration);
  }
}
