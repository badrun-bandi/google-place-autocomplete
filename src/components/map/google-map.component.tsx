import * as React from 'react';

export default function GoogleMap(request: { placeId: string;})  {

  React.useEffect(() => {
    loadGoogleMap(request);
  }, [request]);

  function loadGoogleMap(request: { placeId: string;}){
    let map: google.maps.Map;
    if ((window as any).google) {
      map = new (window as any).google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 10
    });
    var service = new google.maps.places.PlacesService(map);
      if(request && request.placeId){
        service.getDetails(request, loadMarker);
      }
    }
  }

  function loadMarker(place: { geometry: { location: any; }; }, status: any){
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let map: google.maps.Map;
      map = new (window as any).google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 41.0082, lng: 28.9784 },
        zoom: 10
      });
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      const pos: google.maps.LatLng = marker.getPosition()!;
      map.setCenter(pos);
    }
  }

  return (
      <div id="map" />
  );
}
