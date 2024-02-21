const map = new maplibregl.Map({
  container: "map",
  style: "	https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  center: [-1.6777926, 48.117266],
  zoom: 9,
  scrollZoom: true,
  minZoom: 9
});

// Charger le geoJSON depuis l'URL
fetch(
  "https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/decheteries_plateformes_vegetaux/exports/geojson?lang=fr&timezone=Europe%2FBerlin"
)
  .then((response) => response.json())
  .then((data) => {
    // Ajouter le geoJSON comme source de données
    map.addSource("sourceschemavelo", {
      type: "geojson",
      data:
        "https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/limites-communales-referentielles-de-rennes-metropole-polylignes/exports/geojson?lang=fr&timezone=Europe%2FBerlin"
    });

    map.addLayer({
      id: "schemavelo",
      type: "line",
      source: "sourceschemavelo",
      layout: { visibility: "visible" },
      paint: { "line-color": "#A7D3A6", "line-width": 2 }
    });
    map.addSource("places", {
      type: "geojson",
      data: data
    });

    // Assigner un id unique à chaque feature
    data.features.forEach((store, i) => {
      store.properties.id = i;
    });

    // Ajouter les marqueurs à la carte
    addMarkers(data);
    // Construire la liste des lieux
    buildLocationList(data);
  });

// Ajouter un marqueur pour chaque feature
function addMarkers(data) {
  for (const marker of data.features) {
    const el = document.createElement("div");
    el.id = `marker-${marker.properties.id}`;
    el.className = "marker";

    new maplibregl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    el.addEventListener("click", (e) => {
      flyToStore(marker);
      // qund on clique sur le point on zoom et ouvre la popup
      createPopUp(marker);
      const activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(
        `listing-${marker.properties.id}`
      );
      listing.classList.add("active");
    });
  }
}

// Construire la liste des lieux
function buildLocationList(data) {
  for (const store of data.features) {
    const listings = document.getElementById("listings");
    const listing = listings.appendChild(document.createElement("div"));
    listing.id = `listing-${store.properties.id}`;
    listing.className = "item";

    const link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.id = `link-${store.properties.id}`;
    link.innerHTML = `${store.properties.nom_court}`;

    const details = listing.appendChild(document.createElement("div"));
    details.innerHTML = `${store.properties.adresse}`;
    if (store.properties.ann_ouv) {
      details.innerHTML += ` &middot; ${
        "Année d'ouverture : " + store.properties.ann_ouv
      }`;
    }

    link.addEventListener("click", function () {
      for (const feature of data.features) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToStore(feature);
          createPopUp(feature);
        }
      }
      const activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  }
}

// Centrer la carte sur le magasin sélectionné
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

// Créer une pop-up pour le magasin sélectionné
function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName("maplibregl-popup");
  if (popUps[0]) popUps[0].remove();
  const popup = new maplibregl.Popup({ closeOnClick: true, closeButton: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<h3>${
        currentFeature.properties.nom_court
      }</h3><h4>${currentFeature.properties.horaires
        .split("/")
        .join("<br>")}</h4>`
    )

    .addTo(map);
}
