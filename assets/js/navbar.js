$(function() {

  var $navbar = $("nav");
  var $navItems = $("nav li a");
  var $navAbout = $("#navAbout");
  var $navProjects = $("#navProjects");
  var $navContact = $("#navContact");

  var $projects = $("#projects");
  var $contact = $("#contact");

  var animating = false;

  // when user clicks on a navbar section, scroll doc to anchor then underline selection
  $navItems.on("click", function () {
    var $this = $(this);

    // anchor to scroll to
    var $anchor = $this.attr("data-id");

    // set to true to override user scroll function
    animating = true;

    $('html, body').animate({
      // make sure section begins below navbar
      scrollTop: $($anchor).offset().top - $navbar.outerHeight() + 1
    }, 400, function() {
        // on complete, underline in navbar
        animating = false;
        removeCurrent();
        $this.addClass("currentPage");
      });
  });

  // user scroll function
  $(document).on( 'scroll', function(){
    if(!animating) {
      removeCurrent();
      addCurrent();
    }
 });

 // removes underline from selection
 function removeCurrent() {
  $navItems.removeClass("currentPage");
 }

 // adds underline to current section
 function addCurrent() {
  var scrollPos = $(document).scrollTop() + $navbar.outerHeight() + 1;
  var projectsPos = $projects.offset().top;
  var contactPos = $contact.offset().top;

  if(scrollPos < projectsPos) {
    $navAbout.addClass("currentPage");
  }
  else if(scrollPos < contactPos) {
    $navProjects.addClass("currentPage");
  }
  else {
    $navContact.addClass("currentPage");
  }
 }

 addCurrent();
});