$(document).ready(function() {
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