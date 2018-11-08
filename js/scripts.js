$(function() {

  console.log('jQ loaded all systems go');

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









// BUILD A TABLE WITH AJAX LOADED DATA
var url = 'js/temp_anomalies.json';
var data = [];
var xCat = []; // categories on the x axis (bottom of chart)\
var tempAnomalies = []; // y axis values

$.ajax({
  type: 'GET',
  dataType: 'json',
  data: data,
  url: url,
  async: true,
  success: function(data) {
    console.log(data);

    for (i=0; i < data.length; i++) {
      // LOOP THROUGH THE DATA AND BUILD AN ARRAY
      xCat.push(data[i].year);
      tempAnomalies.push(data[i].temp_anomaly);
    }
    buildChart();
  }
}); // close ajax call

function buildChart() {
  var myChart = Highcharts.chart('ajax-chart', {
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
  }); // close myChart
} // close buildChart

});
