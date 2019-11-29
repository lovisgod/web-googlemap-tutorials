getLocation();

function myMap(position) {
  console.log(position.coords.latitude);
  const map = new google.maps.Map(document.getElementById('googleMap'), {
    center: { lat: 4.629420206913925, lng: 7.946661114692688 },
    zoom: 15
  })
  var marker = new google.maps.Marker({
    position: { lat: 4.629420206913925, lng: 7.946661114692688 },
    map: map,
    title: 'Click to zoom'
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'This is my location'
  });
  marker.addListener('click', function () {
    infowindow.open(marker.get('map'), marker);
    map.setCenter(marker.getPosition());
  });

  // load geojson
  // map.data.loadGeoJson('polygon.json');
  const layer = map.data.loadGeoJson('points.json');
  // map.data.setStyle({
  //   fillColor: 'green'
  // });
  map.data.addListener('click', function(event) {
    var infowindow = new google.maps.InfoWindow({
      content:  event.feature.getProperty('name')
    });
    infowindow.open(map, marker);
    // map.data.overrideStyle(event.feature, {fillColor: 'red'});
 });

 const heatMap = [
  new google.maps.LatLng(4.630591180761991,7.945470213890076),
  new google.maps.LatLng(4.630591180761991,7.945470213890076),
  new google.maps.LatLng(4.630591180761991,7.945470213890076),
  new google.maps.LatLng(4.639420206913925,7.947661114692688),
  new google.maps.LatLng(4.635520206913925,7.945661114692688),
  new google.maps.LatLng(4.637420206913925,7.957661114692688),
  new google.maps.LatLng(4.629420206913925,7.946661114692688),
 ];
 var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMap
});
heatmap.setMap(map);
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myMap, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showError(error) {
  switch (error.code) {
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