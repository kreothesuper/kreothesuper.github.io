initMap();

async function initMap() {
    // JSON-стиль, экспортированный из Редактора стилей карт
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapDefaultMarker} = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: {
            // Координаты центра карты
            center: [51.700117, 75.353848],

            // Уровень масштабирования
            zoom: 12,
        }
    });

    const customTheme = new YMapDefaultSchemeLayer({
        theme: "dark",
    });

    map.addChild(customTheme);
    map.addChild(new YMapDefaultFeaturesLayer());

    // const marker = new YMapDefaultMarker(
    //     {
    //     coordinates: [51.700117, 75.353848],
    //     title: 'RWS!',
    //     subtitle: 'Точка RWS',
    //     color: 'blue',
    // }
    // );
    //
    // map.addChild(marker);
}
