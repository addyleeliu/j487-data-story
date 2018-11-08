$(function() {

  console.log('jQ loaded all systems go');

  // Building Chart 1: Annual Mean Global Land and Ocean Temperature Anomalies
  var url = 'js/temp_anomalies.json';
  var data = [];
  var xCat = []; // x axis
  var tempAnomalies = []; // y-axis

  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: data,
    url: url,
    async: true,
    success: function(data) {
      console.log(data);

      for (i=0; i < data.length; i++) {
        // build array by looping through data
        xCat.push(data[i].year);
        tempAnomalies.push(data[i].temp_anomaly);
      }
      buildChart();
    }
  }); // close AJAX call for Chart 1 data

  // Building Chart 2: Global Greenhouse Gas Emissions by Gas
  var url = 'js/ghg_gases.json';
  var data = [];
  var gases = []; // x axis
  var ghgPercent = []; // y-axis

  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: data,
    url: url,
    async: true,
    success: function(data) {
      console.log(data);

      for (i=0; i < data.length; i++) {
        // build array by looping through data
        gases.push(data[i].gas);
        ghgPercent.push(data[i].ghg_percent);
      }
      buildChart();
    }
  }); // close AJAX call for Chart 2 data

  // building Charts 1 and 2
  function buildChart() {
    var myChart1 = Highcharts.chart('chart-temp_anomalies', {
        chart: {
            type: 'column',
            marginTop: 15,
            spacingBottom: 40
        },
        title: {
            text: null
        },
        credits: {
            enabled: true,
            text: 'Source: NASA Goddard Institute for Space Studies (GISS)',
            href: 'javascript:window.open("https://climate.nasa.gov/vital-signs/global-temperature/", "_blank")'
        },
        xAxis: {
            categories: xCat
        },
        yAxis: {
            title: {
                text: 'Temperature Anomaly (ºC) Relative to 1951-1980 Average Temperatures'
            }
        },
        plotOptions: {
          column: {
              zones: [{
                  value: 0,
                    color: 'blue' // Negative values are blue
                },{
                  color: 'red' // Non-negative values are red (0 and up)
                }]
            }
        },
        series: [{
            name: 'Temperature Anomaly (ºC)',
            showInLegend: false,
            data: tempAnomalies
        }]
    }); // close myChart1


    var myChart2 = Highcharts.chart('chart-ghg_gases', {
        chart: {
            type: 'column',
            marginTop: 15,
            spacingBottom: 40
        },
        title: {
            text: null
        },
        credits: {
            enabled: true,
            text: 'Source: Intergovernmental Panel on Climate Change Fifth Assessment Report',
            href: 'javascript:window.open("https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data", "_blank")'
        },
        xAxis: {
            categories: gases
        },
        yAxis: {
            title: {
                text: 'Percentage (%) of 2010 Global GHG Emissions'
            }
        },
        series: [{
            name: 'Percentage of Global GHG Emissions (%)',
            showInLegend: false,
            color: 'green',
            data: ghgPercent
        }]
    }); // close myChart2

  } // close building Charts 1 and 2

  // Building Table 1: Cumulative 1988-2015 Global Greenhouse Gas Emissions
  $('#ajax-table').DataTable({
    "ajax": "/js/ghg_producers.txt",
    "columns": [
      {"data": "producer"},
      {"data": "ghg_percent"}
    ],
    "columnDefs": [{
      "targets": [0, 1],
      "createdCell": function(td, cellData, rowData, row, col) {
        if(cellData > 2) {
          $(td).css('color', 'red');
        }
        $(td).on({
          mouseenter: function() {
            var txt = $(this).text();
            console.log(txt);
            $('#' + txt).toggleClass('hidden');
          },
          mouseleave: function() {
            var txt = $(this).text(); // have to redeclare variable bc it's local
            $('#' + txt).toggleClass('hidden');
          }
        });
      } // close createdCell
    }] // close columnDefs
  }); // close DataTables
  // close Building Table 1: Cumulative 1988-2015 Global Greenhouse Gas Emissions

});
