$(function () {
  var $form = $("#contactForm");
  var $status = $("#status");
  var $name = $("#formName");
  var $email = $("#formEmail");
  var $message = $("#formMessage");

  $form.submit(function (e) {
    e.preventDefault();

    // turns form data into key value pairs
    var formData = $form.serialize();

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
    })
      .done(function (response) {
        // display response
        $status.removeClass("error");
        $status.addClass("success");
        $status.text(response);

        // clear form
        $name.val("");
        $email.val("");
        $message.val("");
      })
      .fail(function (data) {
        var response = data.responseText;

        // display response
        $status.removeClass("success");
        $status.addClass("error");

        if (response !== "") {
          $status.text(response);
        } else {
          $status.text("An error occurred and your message could not be sent.");
        }
      });
  });
});
