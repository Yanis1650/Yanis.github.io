var map = new mapboxgl.Map({
    container: "map",
    style: "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
    zoom: 15.3,
    center: [-1.68, 48.106],
    pitch: 60,
    bearing: -50,
    // minZoom: 14.5,
});


// Ajout carreaux 
map.addSource('Carro', {
    'type': 'vector',
    'url': 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/population-francaise-donnees-carroyees-a-200-metres-2015@public/exports/geojson?lang=fr&refine=region%3A%22BRETAGNE%22&timezone=Europe%2FBerlin'
});

// Remplissage carreaux
map.addLayer({
    'id': 'classique',
    'type': 'fill',
    'source': 'Carro',
    'source-layer': 'karo-dq4lp6',
    'layout': {
        'visibility': 'visible'
    },
    'paint': {
        'fill-color': {
            'property': 'ind_c',
            'stops': [
                [1, '#1a9850'],
                [10, '#91cf60'],
                [20, '#d9ef8b'],
                [50, '#ffffbf'],
                [100, '#fee08b'],
                [150, '#fc8d59'],
                [200, '#d73027']
            ]
        },
        'fill-opacity': 0.6
    }
});

// Extrusion 3D carreaux 	  
map.addLayer({
    'id': 'extrude',
    'type': 'fill-extrusion',
    'source': 'Carro',
    'source-layer': 'karo-dq4lp6',
    'layout': {
        'visibility': 'none'
    },
    'paint': {
        'fill-extrusion-color': {
            'property': 'ind_c',
            'stops': [
                [1, '#1a9850'],
                [50, '#91cf60'],
                [100, '#d9ef8b'],
                [200, '#ffffbf'],
                [300, '#fee08b'],
                [500, '#fc8d59'],
                [1000, '#d73027']
            ]
        },
        'fill-extrusion-height': {
            'property': 'ind_c',
            'stops': [
                [10, 0],
                [50, 200],
                [100, 400],
                [200, 800],
                [300, 1200],
                [500, 1500],
                [1000, 4000],
                [1500, 12000]
            ]
        },
        'fill-extrusion-opacity': 0.95,
        'fill-extrusion-base': 0
    }
});






// Boutons de navigation 

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
