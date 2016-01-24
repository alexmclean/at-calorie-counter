$(document).ready(function() {

  $('#weight').on('change', function (e, val) {
    var newWeight = $(this).val();
    $('#weightLabel').text(newWeight + " pounds");
    updateCals();
  });

  $('#speed').on('change', function (e, val) {
    var newSpeed = $(this).val();
    $('#speedLabel').text(newSpeed + " MPH");
    updateCals();
  });
  
  $('#ageEntry').on('change', function (e, val) {
    $('#ageLabel').text($(this).val() + " years old");
    updateCals();
  });

  $('#ageEntry').on('slide', function (e, val) {
    console.log($(this).val());
  });

  $('#trailPicker').on('change', function (e) {
    var addr = "https://demo9253916.mockable.io/api/alltrails/trails/" + $(this).val();
    updateTrail(addr);
  });

  var updateTrail = function (address) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: address,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        var miles = Math.round((data.trails[0].trailGeoStats.length * 0.00056818) * 100) / 100;
        var elevationGain = Math.round(data.trails[0].trailGeoStats.elevationGain * 3 * 100) / 100;
        $('#distanceLabel').text(miles + " miles");
        $('#elevationLabel').text(elevationGain + " feet gained");
        updateCals();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Failed to retrieve data');
      }
    });
  };

  var updateCals = function () {
    var weight = $('#weight').val();
    var speed = $('#speed').val();
    var distance = $('#distanceLabel').text().split(' ')[0];
    var elevationGain = $('#elevationLabel').text().split(' ')[0];
    var age = $('#ageLabel').text().split(' ')[0];
    var metabolism = 0.3 + speed * 0.14;

    var totalTime = (distance / speed) * 60;
    //hr = (220 - age) * .6
    var heartRate = (220 - age) * metabolism;
    //([age * .2017] - [weight * .09036] + [heart rate * .6309] - 55.0969) * (time / 4.184)
    var cals = ((age * 0.2017) + (weight * 0.09036) + (heartRate * 0.6409) - 55.0969) * (totalTime / 4.184);

    cals = Math.round(cals * 100) / 100;
    $('#calorieLabel').text(cals + " calories");
  };

  updateTrail("https://demo9253916.mockable.io/api/alltrails/trails/" + $('#trailPicker').val());

});