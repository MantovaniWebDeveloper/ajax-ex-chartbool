$(document).ready(function() {
  //alert("vivo");
  //variabilizzo la mia uri
  var url = "http://157.230.17.132:4006/sales"
  //metto un target su html
  var graficoVenditeCanvas = $("#myChart");

  //creo il grafico
  var graficoVenditeMensili = new Chart(graficoVenditeCanvas, {
      type: 'line',
      data: {
          labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno","Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
          datasets: [{
            label: "Vendite",
            data: [1230, 2000, 500, 2800, 3500, 1000, 3980,1230, 2000, 500, 2800, 3500, 1000]
          }]
      }

  });
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
