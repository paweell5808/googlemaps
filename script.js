function initMap() {
    var countMarkers = [];
    var locations = [{
        lat: 50.330669,
        lng: 18.886295
    }, {
        lat: 50.430669,
        lng: 18.956295
    }];
    var poland = {
        lat: 52.154557,
        lng: 19.248047
    };

    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 6,
            center: poland,
            mapTypeId: 'roadmap'
        });

    var layer = new google.maps.FusionTablesLayer({
        query: {
            select: "kml_4326",
            from: "420419",
            where: "'name_0' IN('Poland')"
        },
        styles: [{
            polygonOptions: {
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
                fillColor: "#FF6600",
                fillOpacity: 0.3
            }
        }]
    });

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: 'Slaskie'
        });
    });

    layer.setMap(map);

    google.maps.event.addListener(layer, 'click', function(area) {
        var province = area.row['varname_1'].value;
        markersLength = 0;
        markers.map(function(marker) {
            if (marker.label === province) {
                marker.map = map;
                var markerCluster = new MarkerClusterer(map, markers, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
                markersLength++;
            }
        })
        area.infoWindowHtml = area.row['type_1'].value + ":&nbsp" + area.row['varname_1'].value + "<br>" + "Ilość markerów: " + markersLength;
    })
}