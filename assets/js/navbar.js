$(document).ready(function () {
  // globals for hamburger nav

  var $navItems = $("nav li a");
  var $navAbout = $("#navAbout");
  var $navProjects = $("#navProjects");
  var $navContact = $("#navContact");

  var $steveDay = $("#steveDay");
  var $projects = $("#projects");
  //var $cntact = $("#cntact");

  var animating = false;

  $navItems.on("click", function () {
    var $this = $(this);
    var $anchor = $this.attr("data-id");

    animating = true;

    $('html, body').animate({
      scrollTop: $($anchor).offset().top - $("nav").height() + 1
    }, 400, function() {
        animating = false;
        removeCurrent();
        $this.addClass("currentPage");
      });
  });

  $(document).on( 'scroll', function(){
    if(!animating) {
      removeCurrent();
      addCurrent();
    }
 });

 function removeCurrent() {
  $navItems.removeClass("currentPage");
 }

 function addCurrent() {
  var scrollPos = $(document).scrollTop() + $("nav").height() + 1;
  var projectsPos = $projects.offset().top;

  if(scrollPos < projectsPos) {
    $navAbout.addClass("currentPage");
  }
  else {
    $navProjects.addClass("currentPage");
  }
 }

 addCurrent();
});