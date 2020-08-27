$(function() {
  
  var isModal = false;
  var isSuper = false;
  var imgRatio;
  var imgWidth;
  var imgHeight;

  var $html = $("html");
  var $body = $("body");
  var $modalShade = $("#modalShade");
  var $superShade = $("#superShade");
  var $superModal = $("#superModal");
  var $superModalImgWrap = $("#superModalImgWrap");
  var $superModalImg = $("#superModalImg");
  var $dataId;
  var imgTag;

  var newGames = false;

  // function to adjust modal heights so they don't get cut off on bottom on mobile.
  function setModalHeights() {
    var viewportHeight = window.innerHeight;
    $dataId.height(`calc(${viewportHeight}px - var(--font-size-l) * 4)`);
    $superModal.height(`calc(${viewportHeight}px - var(--font-size-l) * 4)`);
    console.log($superModal.height());
  }
  
  // show the project modal
  function showModal() {

    // disable background scrolling
    $html.css('overflow', 'hidden');
    $body.css('overflow', 'hidden');

    // place modal relative to scroll position, adjust for navbar height
    $dataId.css('margin-top', `calc(${$(document).scrollTop()}px + var(--font-size-l) * 2)`);
    
    $dataId.show("fast");
  }

  // modal for thumbnails inside project modal (called "super modals" here)
  function showSuper() {
    var superModalWidth = $superModal.width();
    var superModalHeight = $superModal.height();
    var modalRatio = superModalWidth / superModalHeight;

    // for smaller super modal ratio, size image container to the width of the super modal and proportionate height
    if(modalRatio < imgRatio) {
      var imgWrapWidth = superModalWidth; 
      var imgWrapHeight = imgHeight * superModalWidth / imgWidth; 
    }

    // for larger super modal ratio, size image container to the height of the super modal and proportionate width
    else {
      var imgWrapHeight = superModalHeight; 
      var imgWrapWidth = imgWidth * superModalHeight / imgHeight; 
    }

    $superModalImgWrap.height(imgWrapHeight);
    $superModalImgWrap.width(imgWrapWidth);

    $superModal.css('margin-top', `calc(${$(document).scrollTop()}px + var(--font-size-l) * 2)`);

    // now place the image inside the super modal image container
    $superModalImg.html(imgTag);

    $superShade.fadeIn("fast");
    $superModal.show("fast");
  }

  // display project modal
  $(".moreInfo").on("click", function () {
    isModal = true;
    $modalShade.fadeIn("fast");
    $dataId = $($(this).attr("data-id"));
    setModalHeights();
    showModal();
  });

  // close modal
  $(".close, #modalShade").on("click", function () {
    isModal = false;
    $modalShade.fadeOut("fast");
    $dataId.hide("fast");
    $html.css('overflow', 'auto');
    $body.css('overflow', 'auto');
  });

  // display super modal
  $(".thumbnail").on("click", function () {
    getImg(this);
  });

  // display Beaver
  $("#beaver").on("click", function () {
    newGames = true;
    $html.css('overflow', 'hidden');
    $body.css('overflow', 'hidden');
    var viewportHeight = window.innerHeight;
    
    $superModal.height(`calc(${viewportHeight}px - var(--font-size-l) * 4)`);
    console.log($superModal.height());
    getImg('#beaverGif');
  });

  // display Pudding
  $("#rar").on("click", function () {
    newGames = true;
    $html.css('overflow', 'hidden');
    $body.css('overflow', 'hidden');
    var viewportHeight = window.innerHeight;
    $superModal.height(`calc(${viewportHeight}px - var(--font-size-l) * 4)`);
    getImg('#puddingGif');
  });

  function getImg(img)
  {
    var src = $(img).attr("src");
    imgTag = new Image();
    imgTag.src = src;

    imgWidth = imgTag.width;
    imgHeight = imgTag.height;
    imgRatio = imgWidth / imgHeight;

    isSuper = true;
    showSuper();
  }
  // close super modal
  $("#superCloseWrap, #superClose, #superShade, #superModal").on("click", function (e) {
    // prevent closing if you click on the image
    if($(e.target).is('img')){
      return false;
    }
    
    isSuper = false;
    $superShade.fadeOut("fast");
    $superModal.hide("fast");
    if (newGames) {
      newGames = false;
      $html.css('overflow', 'auto');
      $body.css('overflow', 'auto');
    }
  });

  // listener for closing modals on escape
  window.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {  

      // super modal
      if (isSuper) {
        isSuper = false;
        $superShade.fadeOut("fast");
        $superModal.hide("fast");
        if (newGames) {
          newGames = false;
          $html.css('overflow', 'auto');
          $body.css('overflow', 'auto');
        }
      }

      // project modal
      else if (isModal) {
        isModal = false;
        $modalShade.fadeOut("fast");
        $dataId.hide("fast");
        $html.css('overflow', 'auto');
        $body.css('overflow', 'auto');
      } 
    }
  });

  // resize the modals and body on any window size change
  $(window).resize(function () {
    if (isModal) {
      showModal();
      setModalHeights();
    }
    if (isSuper) {
      showSuper();
    }
  });
});