getLocation();

function myMap(position) {
    console.log(position.coords.latitude);
        const map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 15
          })
          var marker = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng:position.coords.longitude},
            map: map,
            title: 'Click to zoom'
          });

          var infowindow = new google.maps.InfoWindow({
            content: 'This is my location'
          });
          marker.addListener('click', function() {
            infowindow.open(marker.get('map'), marker);
            map.setCenter(marker.getPosition());
          });
};

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myMap, showError);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
       alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }