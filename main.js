window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [-5179517.063435763, -2711406.2017367696],
            zoom: 7,
            minZoom: 4
        }),
        target: "js-map"
    });

    // Basemaps Layer
    const openstreetmapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: "OSMStandard"
    });

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        }),
        visible: false,
        title: "OSMHumanitarian"
    });

    const arcGISmap = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
        }),
        visible: false,
        title: "arcGISmap"
    });

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [openstreetmapStandard, openStreetMapHumanitarian, arcGISmap]
    });
    map.addLayer(baseLayerGroup);

    // Seletor de camada (lógica por trás)
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function () {
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function (element) {
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            });
        });
    }
}
