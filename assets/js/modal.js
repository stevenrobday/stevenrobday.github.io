$(document).ready(function() {

  /* preload modal pngs and gifs */

  var path = "https://stevenrobday.github.io/ProfessionalPortfolio/assets/";
  var files = [
                "png/hangman/dukakis.png", "png/hangman/gameOver.png", "png/hangman/guess.png",
                "png/pacmental/leaderboard.png",
                "png/triviaGame/question.png",
                "gif/employee/add.gif", "gif/employee/edit.gif", "gif/employee/nav.gif", "gif/employee/search.gif", "gif/employee/viewSort.gif",
                "gif/pacmental/air.gif", "gif/pacmental/earth.gif", "gif/pacmental/fire.gif", "gif/pacmental/intermission2.gif", "gif/pacmental/level3.gif", "gif/pacmental/level6.gif", "gif/pacmental/water.gif",
                "gif/pebbles/ending.gif", "gif/pebbles/pebblesCommercial.gif", "gif/pebbles/stageOne.gif", "gif/pebbles/stageThree.gif", "gif/pebbles/stageTwo.gif", "gif/pebbles/tutorial.gif",
                "gif/triviaGame/answer.gif", "gif/triviaGame/results.gif",
                "gif/writeUps/addEmp.gif", "gif/writeUps/addRecord.gif", "gif/writeUps/editEmp.gif", "gif/writeUps/editRecord.gif", "gif/writeUps/login.gif", "gif/writeUps/navigate.gif", "gif/writeUps/search.gif", "gif/writeUps/view.gif"
              ];
  var images = new Array();

  function preload(files) {
    for (i = 0; i < files.length; i++) {
      images[i] = new Image();
      images[i].src = path + files[i];
    }
  }

  preload(files);

  // globals
  var isModal = false;
  var isSuper = false;
  var imgRatio;
  var imgWidth;
  var imgHeight;

  var $body = $("body");
  var $modalShade = $("#modalShade");
  var $superShade = $("#superShade");
  var $superModal = $("#superModal");
  var $superModalImgWrap = $("#superModalImgWrap");
  var $superModalImg = $("#superModalImg");
  var $dataId;
  var $imgTag;
  
  // show the project modal
  function showModal() {

    // disable background scrolling
    $body.css('overflow', 'hidden');

    // place modal relative to scroll position
    $dataId.css('margin-top', 'calc(' + $(document).scrollTop() + 'px + var(--font-size-l) * 2)');
    
    $dataId.show("fast");
  }

  // modal for thumbnails inside project modal (called "super modals" here)
  function showSuper() {
    var superModalWidth = $superModal.width();
    var superModalHeight = $superModal.height()
    var modalRatio = superModalWidth / superModalHeight;

    // for smaller super modal ratio, stretch image container to the width of the super modal and calculate height based on ratio
    if(modalRatio < imgRatio){
      var tmpWidth = superModalWidth; 
      var tmpHeight = superModalWidth / imgWidth * imgHeight; 
    }

    // for equal or larger modal ratio, stretch image container to the height of the super modal and calculate width
    else{
      var tmpWidth = superModalHeight / imgHeight * imgWidth; 
      var tmpHeight = superModalHeight; 
    }

    $superModalImgWrap.height(tmpHeight);
    $superModalImgWrap.width(tmpWidth);

    $superModal.css('margin-top', 'calc(' + $(document).scrollTop() + 'px + var(--font-size-l) * 2)');

    // now place the image inside the super modal image container
    $superModalImg.html($imgTag);

    $superShade.fadeIn("fast");
    $superModal.show("fast");
  }

  // display project modal
  $(".exampleThumb").on("click", function () {
    isModal = true;
    $modalShade.fadeIn("fast");
    $dataId = $("#" + $(this).attr("data-id"));
    showModal();
  });

  // close modal
  $(".close, #modalShade").on("click", function () {
    isModal = false;
    $modalShade.fadeOut("fast");
    $dataId.hide("fast");
    $body.css('overflow', 'auto');
  });

  // display super modal
  $(".thumbnail").on("click", function () {
    var src = $(this).attr("src");
    $imgTag = $('<img>');
    $imgTag.attr("src", src);

    imgWidth = $(this).width();
    imgHeight = $(this).height();
    imgRatio = imgWidth / imgHeight;

    isSuper = true;
    showSuper();
  });

  // close supermodal
  $("#superCloseWrap, #superClose, #superShade, #superModal").on("click", function (e) {
    // prevent closing if you click on the image
    if($(e.target).is('img')){
      return false;
    }
    
    isSuper = false;
    $superShade.fadeOut("fast");
    $superModal.hide("fast");
  });

  // listener for closing modals on escape
  window.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {  

      // super modal
      if (isSuper) {
        isSuper = false;
        $superShade.fadeOut("fast");
        $superModal.hide("fast");
      }

      // project modal
      else if (isModal) {
        isModal = false;
        $modalShade.fadeOut("fast");
        $dataId.hide("fast");
        $body.css('overflow', 'auto');
      } 
    }
  });

  // resize the modals on any size change
  // return scroll to top first, otherwise modal will get misplaced when scrolled down on small window then maximized
  $(window).resize(function () {
    if (isModal) {
      $(document).scrollTop(0);
      showModal();
    }
    if (isSuper) {
      $(document).scrollTop(0);
      showSuper();
    }
  });
});