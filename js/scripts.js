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

});
