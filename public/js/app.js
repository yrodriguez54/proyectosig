var Lescuelas = L.geoJSON(sedes, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, {
            title: feature.properties.nombre
    })
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.nombre, { closeButton: true });
  }
})


/*var Lhoteles = L.geoJSON(hoteles, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({ iconUrl:'http://localhost:3000/img/hoteles.png', iconSize: [ 46, 46 ] }),
      title: feature.properties.nombre
    })
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.nombre, { closeButton: false });
  }
})*/


var barrios = L.geoJSON(limitem, {
  style: () => {
    return {
      color: "green",
      "weight": 5,
      "opacity": 0.5
    };
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup('<h3>'+feature.properties.f2+'</h3>', {closeButton: false})
  }
})


var map = L.map('mapid', {
  layers: [barrios,Lescuelas]
}).setView([1.675, -75.283], 16);



var _tileLayer = L.tileLayer('http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png');

var _tileLayerOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar', 
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map)

var _googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



var CapasTematicas = {
  "limitem": barrios,
  "sedes":Lescuelas,
  
};


var CapasBase = {
  "Tilelayer OSM": _tileLayerOSM,
  "Tilelayer Local": _tileLayer,
  "Satelite": _googleSat
};
 
var escala= L.control.scale().addTo(map);

/* map.on('click', function(e) {
  alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
}); */

L.control.layers(CapasBase, CapasTematicas, escala,{position:'topleft'}).addTo(map);
