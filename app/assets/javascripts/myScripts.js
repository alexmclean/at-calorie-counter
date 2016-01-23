$(document).ready(function() {
    console.log( "ready!" );

  $('#points').on('change', function(e, val) {
    var newWeight = $(this).val();
    console.log("data:", newWeight);
    $('#weightLabel').text(newWeight + " pounds");
  });

});