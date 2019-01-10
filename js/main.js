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



  function calcoloFatturatoMensile(data) {
    var totaleGennaio = 0;
    var totaleFebbraio = 0;
    var totaleMarzo = 0;
    var totaleAprile = 0;
    var totaleMaggio = 0;
    var totaleGiugno = 0;
    var totaleLuglio = 0;
    var totaleAgosto = 0;
    var totaleSettembre = 0;
    var totaleOttobre = 0;
    var totaleNovembre = 0;
    var totaleDicembre = 0;


    for (var i = 0; i < data.length; i++) {
      console.log("id " + data[i].id);
      /*FORMATTATO TUTTE LE DATE IN NUMERO MESE*/
      var dataGenerale = data[i].date;
      var mese = moment(dataGenerale, "DD/MM/YYY");
      var meseFormattato = mese.format("M");
      console.log("mese " + meseFormattato);
      /*VENDITE*/
      var vendita = data[i].amount;
      console.log("vendita " + vendita);

      switch (meseFormattato) {

        case "1":
          totaleGennaio = totaleGennaio + vendita;
          break;

        case "2":
          totaleFebbraio = totaleFebbraio + vendita;
          break;

        case "3":
          totaleMarzo = totaleMarzo + vendita;
          break;

        case "4":
          totaleAprile = totaleAprile + vendita;
          break;

        case "5":
          totaleMaggio = totaleMaggio + vendita;
          break;

        case "6":
          totaleGiugno = totaleGiugno + vendita;
          break;

        case "7":
          totaleLuglio = totaleLuglio + vendita;
          break;

        case "8":
          totaleAgosto = totaleAgosto + vendita;
          break;

        case "9":
          totaleSettembre = totaleSettembre + vendita;
          break;

        case "10":
          totaleOttobre = totaleOttobre + vendita;
          break;

        case "11":
          totaleNovembre = totaleNovembre + vendita;
          break;

        case "12":
          totaleDicembre = totaleDicembre + vendita;
          break;
      };
    }
    console.log("totale gennaio " + totaleGennaio);
    console.log("totale febbraio " + totaleFebbraio);
    console.log("totale marzo " + totaleMarzo);
    console.log("totale aprile " + totaleAprile);
    console.log("totale maggio " + totaleMaggio);
    console.log("totale giugno " + totaleGiugno);
    console.log("totale Luglio " + totaleLuglio);
    console.log("totale Agosto " + totaleAgosto);
    console.log("totale Settembre " + totaleSettembre);
    console.log("totale ottobre " + totaleOttobre);
    console.log("totale Novembre " + totaleNovembre);
    console.log("totale dicembre " + totaleDicembre);

    //metto un target su html
    var graficoVenditeCanvas = $("#myChart");

    //creo il grafico
    var graficoVenditeMensili = new Chart(graficoVenditeCanvas, {
      type: 'line',
      data: {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        datasets: [{
          label: "Vendite",
          data: [totaleGennaio, totaleFebbraio, totaleMarzo, totaleAprile, totaleMaggio, totaleGiugno, totaleLuglio, totaleAgosto, totaleSettembre, totaleOttobre, totaleNovembre, totaleDicembre],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'blue',
        }]
      }

    });
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
  function stampaNomiHtml(arrayNomi){

      for (var i = 0; i < arrayNomi.length; i++) {
        $("#nomiVenditori").append("<option id="+[i]+">"+ arrayNomi[i] + "</option>")
        $("#nomiVenditori").html();
      }
    }
  }

);
