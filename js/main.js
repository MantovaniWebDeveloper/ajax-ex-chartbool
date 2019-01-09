$(document).ready(function() {
  //alert("vivo");
  //variabilizzo la mia uri
  var url = "http://157.230.17.132:4006/sales"

  //invoco una chiamata ajax in get per leggere tutti i dati
  $.ajax({
    url: url,
    type: "GET",
    success: function(data){
      console.log(data);
    },
    error: function(errore){
      console.log(errore);
    }
  });

});
