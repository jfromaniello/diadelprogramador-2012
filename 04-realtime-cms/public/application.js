
$(function(){
  var currentDocumentId = $("#docId").val(); 
  $("#save").click(function(){
    var url = "/documents" + (currentDocumentId ? "/" + currentDocumentId : ""),
      method = !currentDocumentId ? "POST" : "PUT";

    $.ajax({
      url:  url,
      type: method,
      contentType: "application/json",
      data: JSON.stringify({content: $("#editor").val()}),
      success: function(result){
        if(currentDocumentId) return;
        currentDocumentId = result.id;
        $("#linkph")
          .html("")
          .append($("<a href='/edit/" + result.id + "'>permalink</a>")); 
      },
      error: function(){
        alert("error!!");
      }
    });

  });

});