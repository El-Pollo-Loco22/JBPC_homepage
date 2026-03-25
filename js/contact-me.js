$(document).ready(function() {

    $("#contact-form").on("submit", function(e) {
        e.preventDefault();

        if ($('input[name=_gotcha]').val()) {
            return;
        }

        $('#valid-form').html('Sending <i class="fa fa-spinner fa-pulse fa-fw"></i>');

        var form = this;
        var formData = new FormData(form);
        var reason = $('#contact-form [name=reason]').val() || '';
        formData.set('_subject', 'Clinicians page: ' + (reason || 'Contact'));

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        })
            .then(function(response) {
                return response.json().then(function(data) {
                    if (response.ok) {
                        $('#contact-form input:not([name="_gotcha"])').val('');
                        $('#contact-form textarea').val('');
                        $('#contact-form select').val('placeholder').addClass('no-selection');
                        $('#valid-form').html('Sent!');
                        var output = '<div class="success-message"><p>Thank you! Your message has been sent.</p></div>';
                        $("#answer").hide().html(output).fadeIn();
                    } else {
                        $('#valid-form').html('Send Message');
                        var msg =
                            data && (data.error || (data.errors && data.errors[0] && data.errors[0].message))
                                ? data.error || data.errors[0].message
                                : 'Something went wrong. Please try again.';
                        var output = '<div class="error-message"><p>' + msg + '</p></div>';
                        $("#answer").hide().html(output).fadeIn();
                    }
                });
            })
            .catch(function() {
                $('#valid-form').html('Send Message');
                var output =
                    '<div class="error-message"><p>Network error. Please check your connection and try again.</p></div>';
                $("#answer").hide().html(output).fadeIn();
            });
    });

    $("#contact-form input, #contact-form textarea").on("keyup", function() {
        $("#answer").fadeOut();
    });

    $("#contact-form #phone").on("keyup", function() {
        $("#phone").val(this.value.match(/[0-9+() -]*/));
    });

    $('#contact-form').on('change', 'input#ios', function() {
        this.checked ? (this.value = 'Yes') : (this.value = 'No');
    });
});
