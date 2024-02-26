// AccesToken
mapboxgl.accessToken = 'pk.eyJ1IjoieWFuaXNzaWdhdCIsImEiOiJjbHNrZHN0MncwMjR5MmtxOXo2MG5zb3d5In0.Ek46DP-ijUuSt3bIUVu_eQ';

    // Configuration de la carte
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yanissigat/clske0h2t007q01qw9dbjgxv5', // Fond de carte
    center: [-1.68, 48.12], // lat/long
    zoom: 12, // zoom
    pitch: 0, // Inclinaison
    bearing: 0 ,// Rotation
    customAttribution : '<a href="https://esigat.wordpress.com/" target="_blank">Master SIGAT</a>',
    // minZoom : 10,
    // maxZoom : 17
});




var dataRPG = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/200m_carreaux_metropole_shapefile_wgs84/exports/geojson?lang=fr&refine=region%3A%22BASSE-NORMANDIE%22&timezone=Europe%2FBerlin';

map.on('load', function() {
    // Assurez-vous que le code pour ajouter la couche est exécuté après que la carte a été chargée.
    jQuery.getJSON(dataRPG).done(function(json) {
        map.addLayer({
            'id': '200m_carreaux_metropole_shapefile_wgs84',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': json
            },
            'paint': {
                'fill-color': 'red'
            },
            'layout': {
                'visibility': 'visible' // La couche est visible dès le chargement
            }
        });
    });
});


// map.addSource('CARRO', {
//     type: 'vector',
//     url: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/200m_carreaux_metropole_shapefile_wgs84/exports/geojson?lang=fr&refine=region%3A%22BASSE-NORMANDIE%22&timezone=Europe%2FBerlin',
//     // minzoom: 15,
//     // maxzoom: 19
//          });
    
//      map.addLayer({
//     'id': 'Donnee',
//     'type': 'fill',
//     'source': 'CARRO',
//     'source-layer': 'Donnee',
//     'paint': {'fill-color': '#dedbd2',
//              'fill-opacity' : 0.7}
//     });






// map.on('load', function() {
//     // Ajout de la source de données GeoJSON à partir de l'URL de l'API
//     map.addSource('donneesPopulation', {
//         type: 'geojson',
//         data: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/200m_carreaux_metropole_shapefile_wgs84/exports/geojson?lang=fr&refine=region%3A%22BASSE-NORMANDIE%22&timezone=Europe%2FBerlin'
//     });

//     // Ajout de la couche d'extrusion 3D en utilisant les données de la source
//     map.addLayer({
//         'id': 'extrusionPopulation',
//         'type': 'fill-extrusion',
//         'source': 'donneesPopulation',
//         'paint': {
//             // Utilisation de la propriété 'ind_c' pour la hauteur de l'extrusion
//             'fill-extrusion-height': [
//                 "interpolate", ["linear"], ["get", "ind_c"],
//                 10, 0,
//                 50, 200,
//                 100, 400,
//                 200, 800,
//                 300, 1200,
//                 500, 1500,
//                 1000, 4000,
//                 1500, 12000
//             ],
//             'fill-extrusion-color': [
//                 "interpolate", ["linear"], ["get", "ind_c"],
//                 1, '#1a9850',
//                 50, '#91cf60',
//                 100, '#d9ef8b',
//                 200, '#ffffbf',
//                 300, '#fee08b',
//                 500, '#fc8d59',
//                 1000, '#d73027'
//             ],
//             'fill-extrusion-opacity': 0.95
//         }
//     });
// });

// Ajout des contrôles de navigation sur la carte
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
