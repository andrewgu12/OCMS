/**
 * Purpose: Contains all the JS functionality for frontend
 */
$(function () {
    // Login the user. If failure, sets error message; otherwise redirect to authenticated page
    $("form#login-form button").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/login",
            data: $("form#login-form").serialize()
        }).done(function (data) {
            var redirectURL = window.location.protocol + "//" + window.location.host + data.redirect;
            $(location).attr("href", redirectURL);
        }).fail(function (error) {
            $("form#login-form input#username").addClass("danger");
            $("form#login-form input#password").addClass("danger");
            $("form#login-form p.error-message").show();
        });
    });
});
