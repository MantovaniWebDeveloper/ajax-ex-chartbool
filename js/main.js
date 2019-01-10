$(document).ready(function() {
  //alert("vivo");
  //variabilizzo la mia uri
  var url = "http://157.230.17.132:4006/sales"


  /*var mese = moment("27-11-1984","DD-MM-YYY");
  console.log(mese.format("M"));
  $("h1").append(mese.format("M"));*/

  //invoco una chiamata ajax in get per leggere tutti i dati
  //e sommare le vendite per ogni mese
  $.ajax({
    url: url,
    type: "GET",
    success: function(data) {
      console.log(data);
      calcoloFatturatoMensile(data);
      calcoloPercentualeVenditore(data);

    },
    error: function(errore) {
      console.log(errore);
    }
  });

  $("#salva").click(function(){
    //recupero select
    var nomeScelto = $("#nomiVenditori").val();
    console.log(nomeScelto);
    var meseScelto = $("#mesi").val();
    console.log(meseScelto);
    var nuovaVendita = $("#nuovaVenditaText").val();
    console.log(nuovaVendita);
    $.ajax({
      url: url,
      type: "POST",
      data: {
        "salesman": nomeScelto,
        "date": meseScelto,
        "amount" : nuovaVendita
      },
      success: function(data) {
        console.log("dopo post " + data);
        calcoloFatturatoMensile(data);
        calcoloPercentualeVenditore(data);

      },
      error: function(errore) {
        console.log(errore);
      }
    });
  });

  function calcoloFatturatoMensile(data) {
    var meseObj = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0
    };

    for (var i = 0; i < data.length; i++) {
      /*DATA*/
      var dataGenerale = data[i].date;
      var mese = moment(dataGenerale, "DD/MM/YYY");
      var meseFormattato = mese.format("MMMM");
      console.log("mese " + meseFormattato);
      /*VENDITE*/
      var vendita = data[i].amount;

      meseObj[meseFormattato] += vendita;

    }
    console.log(meseObj);

    var arrayMesi = [];
    var arrayVendite = [];

    for (var venditeMese in meseObj) {
      arrayMesi.push(venditeMese);
      arrayVendite.push(meseObj[venditeMese]);
    }

    //metto un target su html
    var graficoVenditeCanvas = $("#myChart");

    //creo il grafico
    var graficoVenditeMensili = new Chart(graficoVenditeCanvas, {
      type: 'line',
      data: {
        labels: arrayMesi,
        datasets: [{
          label: "Vendite",
          data: arrayVendite,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'blue',
        }]
      }

    });

    stampaMesiHtml(arrayMesi);
  }

  function calcoloPercentualeVenditore(data) {

    var venditoriObj = {};
    var vendutoTotale = 0;
    var venditaVenditoreTotale = 0;
    var percentualeVenditore = 0;

    for (var i = 0; i < data.length; i++) {
      var vendita = data[i];
      var nome = vendita.salesman;
      var venditaVenditore = vendita.amount;
      console.log(vendita);
      console.log(venditoriObj[nome]);
      if (venditoriObj[nome] == undefined) {
        venditoriObj[nome] = 0;
      }
      venditoriObj[nome] += venditaVenditore;
      vendutoTotale = vendutoTotale + venditaVenditore;
    }
    console.log("venduto totale: " + vendutoTotale);
    console.log(venditoriObj);

    var arrayNomi = [];
    var arrayVendite = [];

    for (var nomeVenditore in venditoriObj) {
      console.log(nomeVenditore);
      arrayNomi.push(nomeVenditore);
      percentualeVenditore = venditoriObj[nomeVenditore] / vendutoTotale * 100;
      var percentualeVenditoreArrotondata = percentualeVenditore.toFixed(2);
      console.log(percentualeVenditoreArrotondata);
      arrayVendite.push(percentualeVenditoreArrotondata);
    }

    //metto un target su html
    var graficoPercentualeVendite = $("#myChartTorta");

    //creo il grafico
    var graficoVenditeVenditore = new Chart(graficoPercentualeVendite, {
      type: 'doughnut',
      data: {
        labels: arrayNomi,
        datasets: [{
          data: arrayVendite,
          backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF"
          ]
        }]
      }

    });

    stampaNomiHtml(arrayNomi);
  }
  //funzione che stampa i nomi venditori nella select
  function stampaNomiHtml(arrayNomi) {

    for (var i = 0; i < arrayNomi.length; i++) {
      $("#nomiVenditori").append("<option id=" + [i] + ">" + arrayNomi[i] + "</option>")
      $("#nomiVenditori").html();
    }
  }

  function stampaMesiHtml(arrayMesi) {

    for (var i = 0; i < arrayMesi.length; i++) {
      $("#mesi").append("<option id=" + [i] + ">" + arrayMesi[i] + "</option>")
      $("#mesi").html();
    }
  }

});
