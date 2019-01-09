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
            data: [1230, 2000, 500, 2800, 3500, 1000, 3980,1230, 2000, 500, 2800, 3500, 1000],
            lineTension: 0,
            backgroundColor: 'transparent',
          }]
      }

  });

  /*var mese = moment("27-11-1984","DD-MM-YYY");
  console.log(mese.format("M"));
  $("h1").append(mese.format("M"));*/

  //invoco una chiamata ajax in get per leggere tutti i dati
  $.ajax({
    url: url,
    type: "GET",
    success: function(data){
      console.log(data);

      var totaleGennaio = 0 ;

      for (var i = 0; i < data.length; i++) {
        /*FORMATTATO TUTTE LE DATE IN NUMERO MESE*/
        var dataGenerale = data[i].date;
        var mese = moment(dataGenerale,"DD/MM/YYY");
        var meseFormattato = mese.format("M");
        console.log(meseFormattato);
        
      }
    },
    error: function(errore){
      console.log(errore);
    }
  });

});
