$(function () {

    var showMessage = function (message) {
        $('#messages').append($('<li/>').append(message));
    };

    var getMessages = function () {
        $.ajax({
            type: 'GET',
            url: '/wait',
            cache: false,
            success: function (data) {
                showMessage(data.message);
            },
            complete: function (q, s) {
                getMessages();
            }
        });
    };

    var sendMessage = function (message) {
        $.ajax({
            type: 'POST',
            url: '/send',
            data: JSON.stringify({message: message}),
            contentType: "application/json"
        });
    };

    $('#sendmsg').submit(function (e) {
        e.preventDefault();
        var m = $('#message').val();
        
        sendMessage(m);

        $('#message').val("").focus();
    });

    getMessages();

});