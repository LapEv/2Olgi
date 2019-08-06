$(document).ready(()=>{
  'use strict';
    $('#check').on('click', function() {
        if ($("#check").prop("checked")) {
            $('#button').attr('disabled', false);
            $('#button').attr('disabled', false).css('cursor', 'pointer');
        } else {
            $('#button').attr('disabled', true);
            $('#button').attr('disabled', true).css('cursor', 'auto');
        }
    });
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        var form = $('#contactForm'),
            button = $('#button'),
            answer = $('#answer'),
            loader = $('#loader');
        $.ajax({
            url: 'mailer/smart.php',
            type: 'POST',
            data: form.serialize(),
            beforeSend: function() {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                loader.fadeOut(300, function() {
                    answer.text(result);
                });
                form.find('.field').val('');
                button.attr('disabled', false);
            },
            error: function() {
                loader.fadeOut(300, function() {
                    answer.text('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });

    });
});