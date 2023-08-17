/* eslint-disable */
// import * as maptilersdk from '@maptiler/sdk';

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidW1hbmcwNyIsImEiOiJjbGtsaHY2ZmIxYzJzM29yenA0bGE0dmxyIn0.25lXLxcIg50m8LsKyRmjaw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/umang07/clklluulb000301qx7h0iat25', // style URL
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add a morker
    const el = document.createElement('div');
    el.className = 'marker';

    //   Create Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
