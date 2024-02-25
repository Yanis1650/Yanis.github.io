// Définition de l'access token Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoieWFuaXNzaWdhdCIsImEiOiJjbHNrZHN0MncwMjR5MmtxOXo2MG5zb3d5In0.Ek46DP-ijUuSt3bIUVu_eQ';

// Création de la carte avec Mapbox GL JS
var map = new mapboxgl.Map({
    container: 'map', // ID de l'élément HTML contenant la carte
    style: 'mapbox://styles/mapbox/streets-v11',
    // style:
    center: [-1.68, 48.12], // Position initiale de la carte [longitude, latitude]
    zoom: 12 // Niveau de zoom initial
});

// Récupération du formulaire params dans le HTML
var params = document.getElementById('params');

// Définition des variables utilisées dans getIso()
var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
var lon = -1.68; // longitude par défaut
var lat = 48.12; // latitude par défaut
var profile = 'walking'; // profil de déplacement par défaut
var minutes = 10; // durée par défaut

// Fonction pour effectuer la requête à l'API isochrone et mettre à jour la carte
function getIso() {
    var query =
        urlBase +
        profile +
        '/' +
        lon +
        ',' +
        lat +
        '?contours_minutes=' +
        minutes +
        '&polygons=false&access_token=' +
        mapboxgl.accessToken;

    // Requête AJAX avec jQuery
    $.ajax({
        method: 'GET',
        url: query
    }).done(function (data) {
        // Mise à jour des données de la source 'iso' de la carte
        map.getSource('iso').setData(data);
    });
}

// Action lors du chargement de la carte
map.on('load', function () {
    // Ajout de la source 'iso' à la carte
    map.addSource('iso', {
        type: 'geojson',
        data: {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    // Ajout d'une couche 'line' pour afficher l'isochrone
    map.addLayer({
        'id': 'isoLayer',
        'type': 'line',
        'source': 'iso',
        'layout': {},
        'paint': {
            'line-color': '#000000',
            'line-width': 3
        }
    }, 'poi-label');

    // Ajout d'un marqueur draggable pour sélectionner la position
    var pointeur_iso = new mapboxgl.Marker({
        'color': '#314ccd',
        draggable: true
    })
        .setLngLat([-1.68, 48.12])
        .addTo(map);

    // Action lors du déplacement du marqueur
    function onDragEnd() {
        var lngLat = pointeur_iso.getLngLat();
        lat = lngLat.lat;
        lon = lngLat.lng;
        getIso();
    }

    // Événement de fin de déplacement du marqueur
    pointeur_iso.on('dragend', onDragEnd);

    // Appel initial à l'API isochrone pour afficher les données par défaut
    getIso();
});

// Écouteur d'événement pour les changements dans le formulaire params
params.addEventListener('change', function (e) {
    if (e.target.name === 'profile') {
        profile = e.target.value;
        getIso();
    } else if (e.target.name === 'duration') {
        minutes = e.target.value;
        getIso();
    }
});
