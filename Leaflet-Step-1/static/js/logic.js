var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
var plateUrl = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json";

d3.json(quakeUrl, function(data) {
    d3.json(platesJSON, function(data2) {
        createFeatures(data.features, data2.features);
    })
});

function getColor(x) {
    return x > 5 ? "#f40202" :
           x > 4 ? "#f45f02" :
           x > 3 ? "#f49702" :
           x > 2 ? "#F4bc02" :
           x > 1 ? "#d8f402" :
           x > 0 ? "#93f402" :
                "#FFEDA0";
}

function createFeatures(earthquakeData, plateData) {

    function style(feature) {
        return{
           radius: getRadius(feature.properties.mag),
                    fillColor: getColor(feature.properties.mag),
                    fillopacity: .75,
                    color: "#000000",
                    stroke: true,
                    weight: .8   
         };
    }
    var earthquakes = L.geoJSON(earthquakeData, {

        pointToLayer: function(feature, latlng) {

        return L.circleMarker(latlng, style(feature));

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><h3>Location: "+ feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
            }

        });

        var plates = L.geoJson(plateData, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.PlateName + "</h3>");
            }
        });

        createMap(earthquakes, plates);
    }

    function createMap(earthquakes, plates) {

        var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
        });
  
        var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
        });

        var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Outdoors": outdoors,
        "Satellite": satellite,
        "Dark Map": darkmap
    };

    var tectonicPlates = new L.LayerGroup();

    var overlayMaps = {
        "Earthquakes": earthquakes,
        "Techtonic Plates": tectonicPlates
    };

    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 4,
        layers: [outdoors, earthquakes, tectonicPlates]
    });

    d3.json(plateUrl, function(plateData) {
        L.geoJson(plateData {
            color: "yellow",
            weight: 2
        })
        .addTo(tectonicPlates);
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: "bottomleft" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    }
    
    legend.addTo(myMap);
    };


    )}

    