var map = new mapboxgl.Map({
    container: "map",
    style: "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
    zoom: 15.3,
    center: [-1.68, 48.106],
    pitch: 60,
    bearing: -50,
    minZoom: 14.5,
});

function addMetroLines() {
    fetch("https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/parcours-des-lignes-de-metro-du-reseau-star/exports/geojson?lang=fr&timezone=Europe%2FBerlin")
        .then(response => response.json())
        .then(lignemetro => {
            map.addSource("Lignes", {
                type: "geojson",
                data: lignemetro
            });

            map.addLayer({
                id: "Lignes",
                type: "line",
                source: "Lignes",
                paint: {
                    "line-color": [
                        "case",
                        ["==", ["get", "nomcourtligne"], "a"], // Si nomcourtligne est "a"
                        "#FF0000", // Couleur rouge pour la ligne "a"
                        ["==", ["get", "nomcourtligne"], "b"], // Si nomcourtligne est "b"
                        "#00FF00", // Couleur verte pour la ligne "b"
                        "#0074D9" // Couleur par défaut pour les autres lignes
                    ],
                    "line-opacity": 0.7,
                    "line-width": 7
                },
                filter: ["in", "nomcourtligne", "a", "b"]
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données des lignes de métro :", error);
        });
}

function addMetroStations() {
    fetch("https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/metro_localisation_stations/exports/geojson?lang=fr&timezone=Europe%2FBerlin")
        .then(response => response.json())
        .then(data => {
            map.addSource("Stations", {
                type: "geojson",
                data: data
            });

            map.addLayer({
                id: "Stations",
                type: "circle",
                source: "Stations",
                paint: {
                    "circle-color": [
                        "case",
                        ["==", ["get", "ligne"], "a"], // Si ligne est "a"
                        "#FF0000", // Couleur rouge pour la ligne "a"
                        ["==", ["get", "ligne"], "b"], // Si ligne est "b"
                        "#00FF00", // Couleur verte pour la ligne "b"
                        "#0074D9" // Couleur par défaut pour les autres lignes
                    ],
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 1,
                    "circle-radius": 8
                },
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données des stations de métro :", error);
        });
}

function addBatiments() {
    fetch("https://raw.githubusercontent.com/mastersigat/data/main/BatiRennes.geojson")
        .then(response => response.json())
        .then(data => {
            map.addSource("Batiments", {
                type: "geojson",
                data: data
            });

            map.addLayer({
                id: "Batiments",
                type: "fill-extrusion",
                source: "Batiments",
                paint: {
                    "fill-extrusion-height": { type: "identity", property: "HAUTEUR" },
                    "fill-extrusion-color": {
                        property: "HAUTEUR",
                        stops: [
                            [5, "#1a9850"],
                            [7, "#91cf60"],
                            [9, "#d9ef8b"],
                            [12, "#ffffbf"],
                            [16, "#fee08b"],
                            [20, "#fc8d59"],
                            [30, "#d73027"],
                        ],
                    },
                    "fill-extrusion-opacity": 0.7,
                    "fill-extrusion-base": 0,
                },
            });
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données des bâtiments :", error);
        });
}

//Interactivité HOVER

var popup = new mapboxgl.Popup({
    className: "Mypopup",
    closeButton: false,
    closeOnClick: false,
  });
  
  map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ["Stations"] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = features.length ? "pointer" : "";
  
    if (!features.length) {
      popup.remove();
      return;
    }
  
    var feature = features[0];
    popup
      .setLngLat(feature.geometry.coordinates)
      .setHTML("<b>" + feature.properties.nom + "</b>")
      .addTo(map);
  });


// Configuration affichage menu couches

switchlayer = function (lname) {
    if (document.getElementById(lname).checked) {
      map.setLayoutProperty(lname, "visibility", "visible");
    } else {
      map.setLayoutProperty(lname, "visibility", "none");
    }
  };


// Ajout controle de navigation et echelle

map.addControl(new mapboxgl.NavigationControl({ position: "top-left" }));

map.addControl(new mapboxgl.ScaleControl({ position: "bottom-right" }));




addMetroLines();
addMetroStations();
addBatiments();
