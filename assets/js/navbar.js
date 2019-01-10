$(document).ready(function () {

  /* image preloader. otherwise the icons will flicker the first time you hover them
    and we can't have that! */

  var path = "https://stevenrobday.github.io/ProfessionalPortfolio/assets/svg/";
  var files = [
    "githubHover.svg", "linkedInHover.svg", "resumeHover.svg", "emailHover.svg", "closeHover.svg", "hamburgerHover.svg"
  ];
  var images = new Array();

  function preload(files) {
    for (i = 0; i < files.length; i++) {
      images[i] = new Image();
      images[i].src = path + files[i];
    }
  }

  preload(files);

  // globals for hamburger nav
  var isOpen = false;

  var $pages = $("#pages");
  var $icons = $("#icons");

  // click the hamburger
  $("#hamburgerImg").on("click", function () {

    var position = $pages.offset().left;
    isOpen = !isOpen;

    // open navbar
    if (isOpen) {

      // if #pages is absolute, it will be on the left edge
      if (position === 0) {

        // reposition nav pages and icons
        $pages.css("top", "calc(var(--font-size-l) * 1.5)");
        $icons.css("top", "calc(var(--font-size-l) * 3)");
      }
      else {

        // #pages is relative here, so only reposition icons
        $icons.css("top", "calc(var(--font-size-l) * 1.5)");
      }
    }

    // close navbar
    else {
      $icons.css("top", "calc(var(--font-size-l) * -1.5)");

      if (position === 0) {
        $pages.css("top", "calc(var(--font-size-l) * -1.5)");
      }
    }
  });

  // reset to default css on window resize,
  // otherwise $pages and $icons will keep jquery css attributes
  $(window).resize(function () {
    isOpen = false;
    $pages.css("top", "");
    $icons.css("top", "");
  });
});