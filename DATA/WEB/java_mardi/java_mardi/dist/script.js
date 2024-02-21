// AccesToken
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaWNpYTM1IiwiYSI6ImNsc2tkc2V3NzAyenoyanE5aGMzdm5jbDQifQ.gyRQ_bcA6d82MPspunG0wA';

    // Configuration de la carte
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/felicia35/clskdxicr019p01ql0otr27ta', // Fond de carte
    center: [-1.68, 48.12], // lat/long
    zoom: 12, // zoom
    pitch: 0, // Inclinaison
    bearing: 0 ,// Rotation
    customAttribution : '<a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT</a>',
    minZoom : 10,
    maxZoom : 17
});


//debut du mapON
map.on('load', function () {
 
 map.addSource('mapbox-streets-v8', {
   type: 'vector',
   url: 'mapbox://mapbox.mapbox-streets-v8'});
 
 
   map.addLayer({
        "id": "Water",
        "type": "fill",
        "source": "mapbox-streets-v8",
        "layout": {'visibility': 'visible'},
        "source-layer": "water",
        "paint": {"fill-color": "#6290C8"}
    });
 
  map.addLayer({
        "id": "Routes",
        "type": "line",
        "source": "mapbox-streets-v8",
        "layout": {'visibility': 'visible'},
        "source-layer": "road",
        "filter": ["all",  ["in", "class", "motorway", "trunk","primary"]],
        "paint": {'line-color': ['match',['get', 'class'],
              		 'trunk', 'red',
               	 'primary', 'blue',
                  '#ccc'],
                  "line-width": 1.5}
            
    });
 
 
 //Mes datas

map.addSource('orgasource', {
        type: 'vector',
        url: 'mapbox://felicia35.2dzxl1o6'});
   
map.addLayer({
        'id': 'organisme',
        'type': 'circle',
        'source': 'orgasource',
        'source-layer': 'base-orga-var-2ig8t8',
        'layout': {'visibility': 'none'},
        'paint': {'circle-radius': {'base': 1.5,'stops': [[13, 2], [22, 60]]},
                  'circle-color': '#618985',
                  'circle-stroke-color' : "black",
                   'circle-stroke-witdh' : {'base': 1.5,'stops': [[13, 0.2], [22, 6]]}}  });
 
 
  map.addSource('sourceschemavelo', {
        type: 'geojson',
        data: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/sd_velo_iti_2018/exports/geojson'});
 
    map.addLayer({
        "id": "schemavelo",
        "type": "line",
        "source": "sourceschemavelo",
        "layout": {'visibility': 'none'},
        "paint": {"line-color": "#A7D3A6", "line-width": 1.5}
    });
 
   // AJOUT DU CADASTRE ETALAB

map.addSource('Cadastre', { type: 'vector',
                           url: 'https://openmaptiles.geo.data.gouv.fr/data/cadastre.json'    });


map.addLayer({
                          'id': 'Cadastre',
                          'type': 'line',
                          'source': 'Cadastre',
                          'source-layer': 'parcelles',
                          'layout': {'visibility': 'visible'},
                          'paint': {'line-color': '#000000'},
                          'minzoom':16, 'maxzoom':19 });

  map.addLayer({
                          'id': 'Cadastrerempl',
                          'type': 'fill',
                          'source': 'Cadastre',
                          'source-layer': 'parcelles',
                          'layout': {'visibility': 'visible'},
                          'paint': {'fill-color': '#ffffff', 'fill-opacity': 0},
                          'minzoom':16, 'maxzoom':19 });
 
map.setPaintProperty('communeslimites', 'line-width', ["interpolate",["exponential",1],["zoom"],16,0.3,18,1]);
   
 // Ajout BDTOPO

map.addSource('BDTOPO', {
type: 'vector',
url: 'https://wxs.ign.fr/topographie/geoportail/tms/1.0.0/BDTOPO/metadata.json',
minzoom: 15,
maxzoom: 19
     });

 map.addLayer({
'id': 'batiments',
'type': 'fill',
'source': 'BDTOPO',
'source-layer': 'batiment',
'paint': {'fill-color': '#dedbd2',
         'fill-opacity' : 0.7}
});
 
// Contours communes API
dataCadastre = 'https://apicarto.ign.fr/api/cadastre/commune?code_insee=35238';
   
  jQuery.when( jQuery.getJSON(dataCadastre)).done(function(json) {
    for (i = 0; i < json.features.length; i++) {
      json.features[i].geometry = json.features[i].geometry;
    };
       
map.addLayer(
{'id': 'Contourcommune',
 'type':'line',
 'source': {'type': 'geojson','data': json},
 'paint' : {'line-color': 'black',
              'line-width':2.5},
 'layout': {'visibility': 'visible'},
    });

  });
 
  dataRPG = 'https://apicarto.ign.fr/api/rpg/v2?annee=2021&geom=%7B%22type%22%3A%20%22Point%22%2C%22coordinates%22%3A%5B%20-1.6456491038020253%2C48.14503589320046%5D%7D';
   
  jQuery.when( jQuery.getJSON(dataRPG)).done(function(json) {
    for (i = 0; i < json.features.length; i++) {
      json.features[i].geometry = json.features[i].geometry;
    };
       
    map.addLayer(
    { 'id': 'RPG',
      'type':'fill',
      'source': {'type': 'geojson','data': json},
      'paint' : {'fill-color': 'red'},
      'layout': {'visibility': 'none'}
    });

  });
 
 dataPLU = 'https://apicarto.ign.fr/api/gpu/zone-urba?partition=DU_243500139';

jQuery.when(jQuery.getJSON(dataPLU)).done(function(json) {
  // Filtrer les entités pour ne garder que celles avec typezone = 'U'
  var filteredFeatures = json.features.filter(function(feature)
  {return feature.properties.typezone === 'N';});

  // Créer un objet GeoJSON avec les entités filtrées
  var filteredGeoJSON = { type: 'FeatureCollection', features: filteredFeatures};

  map.addLayer({
    'id': 'PLU',
    'type': 'fill',
    'source': {'type': 'geojson',
               'data': filteredGeoJSON},
    'paint': {'fill-color': 'green',
              'fill-opacity': 0.5},
    'layout': {'visibility': 'none'}
  });

 });
 
 
 //station relais
  $.getJSON('https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/tco-parcsrelais-star-etat-tr/records?limit=20',
function(data) {var geojsonData4 = {
                type: 'FeatureCollection',
                features: data.results.map(function(element) {
                    return {type: 'Feature',
                            geometry: {type: 'Point',
                            coordinates: [element.coordonnees.lon, element.coordonnees.lat]},
                            properties: { name: element.nom,
                                          capacity: element.jrdinfosoliste}};
                })
            };
   
   map.addLayer({ 'id': 'Parcrelais',
                  'type':'circle',
                   'source': {'type': 'geojson',
                                    'data': geojsonData4},
                 'paint': {'circle-color': 'orange', 'circle-radius' : 10}
    });
  });
 
 
// sation velo
 
 $.getJSON('https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-etat-tr/records?limit=57',
function(data) {var geojsonvls = {
                type: 'FeatureCollection',
                features: data.results.map(function(element) {
                    return {type: 'Feature',
                            geometry: {type: 'Point',
                            coordinates: [element.coordonnees.lon, element.coordonnees.lat]},
                            properties: { name: element.nom,
                                          capacity: element.nombrevelosdisponibles}};
                })
            };
   
   map.addLayer({ 'id': 'VeloStar',
                  'type':'circle',
                   'source': {'type': 'geojson',
                              'data': geojsonvls},
                 'paint': {'circle-color': 'purple',
                           'circle-stroke-color':'white',
                           'circle-stroke-width':0.5,
                  'circle-radius': {property: 'capacity',
                  type: 'exponential',
                  stops: [[0, 0],[50, 25]]},
                  'circle-opacity': 0.8
                  },
    });
  });
 
  //bus
   map.addSource('bus', {
        type: 'geojson',
        data: 'https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-vehicules-position-tr/exports/geojson?lang=fr&refine=etat%3AEn%20ligne'});
 
    map.addLayer({
        "id": "bus",
        "type": "circle",
        "source": "bus",
        "layout": {'visibility': 'none'},
        "paint": {"circle-color": "#9593D9", "circle-radius": 5}
    });
 
  const ville = "Rennes";
 
 
  //bar
$.getJSON(`https://overpass-api.de/api/interpreter?data=[out:json];area[name="${ville}"]->.searchArea;(node["amenity"="bar"](area.searchArea););out center;`,
         
 function(data) {var geojsonData = {
    type: 'FeatureCollection',
    features: data.elements.map(function(element) {
      return {type: 'Feature',
        geometry: { type: 'Point',coordinates: [element.lon, element.lat] },
        properties: {}};
    })
  };
 
  map.addSource('customData', {
    type: 'geojson',
    data: geojsonData
  });
 
  map.addLayer({
    'id': 'pubs',
    'type': 'circle',
    'source': 'customData',
    'paint': {'circle-color': 'green',
                  'circle-radius': 3},
    'layout': {'visibility': 'none'}
  });
                 
});
//  map.addSource('iris', {
//         type: 'geojson',
//         data: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/consommation-electrique-par-secteur-dactivite/exports/geojson?lang=fr&refine=annee%3A%222022%22&refine=code_grand_secteur%3A%22RESIDENTIEL%22&timezone=Europe%2FBerlin'});
 
//     map.addLayer({
//       'id': 'IRIS',
//     'type': 'fill',
//       'source': 'iris',
//         "layout": {'visibility': 'visible'},
//         "paint":{'fill-color': {'property': 'conso_moyenne_mwh',
//             'stops': [[1, '#1a9850'],
//                         [2, '#91cf60'],
//                         [3, '#d9ef8b'],
//                         [4, '#ffffbf'],
//      	                  [5, '#fee08b'],
// 	                      [6, '#fc8d59'],
//                         [7, '#d73027']]}, 
//                         'fill-opacity': 0.9}
//     });
  
  
  
  
  
 });
// Fin du mapON



//Interactivité HOVER

var popup = new mapboxgl.Popup({
    className: "popupstyle2",
    closeButton: false,
    closeOnClick: false });

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['VeloStar'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return; }

    var feature = features[0];
        popup.setLngLat(feature.geometry.coordinates)
        .setHTML('<h5>'+feature.properties.name+'</h5><hr>'+ feature.properties.capacity+' vélos disponibles')
        .addTo(map);

});

//Interactivité CLICK

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['Parcrelais'] });

    if (!features.length) {
        return;
    }

    var feature = features[0];
    var popup = new mapboxgl.Popup({ className: "popupstyle", offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h5>' + feature.properties.name + '</h5><hr>'
+"Places disponibles : " + feature.properties.capacity  )  
   .addTo(map);
});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['Arrets'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

//Interactivité CLICK sur cadastre

map.on('click', function (e) {
var features = map.queryRenderedFeatures(e.point, { layers: ['Cadastrerempl'] });
if (!features.length) {
return;
}
var feature = features[0];
var popup3 = new mapboxgl.Popup({ className: "Mypopup2", offset: [0, -15] })
.setLngLat(e.lngLat)
.setHTML(feature.properties.id + '<br>' + 'Numéro:' + feature.properties.numero + '<br>' + feature.properties.contenance + '  m2')
.addTo(map);
});
map.on('mousemove', function (e) {
var features = map.queryRenderedFeatures(e.point, { layers: ['Cadastrerempl'] });
map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

//affichage menu
 switchlayer = function (lname) {
            if (document.getElementById(lname + "CB").checked) {
                map.setLayoutProperty(lname, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(lname, 'visibility', 'none');
           }
        }

// Boutons de navigation

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// Ajout Echelle cartographique
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 120,
    unit: 'metric'}));

// Bouton de géolocalisation

map.addControl(new mapboxgl.GeolocateControl
({positionOptions: {enableHighAccuracy: true},
trackUserLocation: true,
showUserHeading: true}));


// Configuration onglets géographiques

document.getElementById('Rennes').addEventListener('click', function ()
{ map.flyTo({zoom: 12,
           center: [-1.672, 48.1043],
         pitch: 0,
            bearing:0 });
});

document.getElementById('Gare').addEventListener('click', function ()
{ map.flyTo({zoom: 16,
           center: [-1.672, 48.1043],
         pitch: 20,
            bearing: -197.6 });
});


document.getElementById('Rennes1').addEventListener('click', function ()
{ map.flyTo({zoom: 16,
           center: [-1.6396, 48.1186],
         pitch: 20,
            bearing: -197.6 });
});

document.getElementById('Rennes2').addEventListener('click', function ()
{ map.flyTo({zoom: 16,
           center: [-1.7023, 48.1194],
         pitch: 30,
            bearing: -197.6 });
});