$(function(){
  var currentDocumentId = $("#docId").val(),
    socket = io.connect();
  socket.on(currentDocumentId, function (data) {
    $("#content").html(data);
  });
});