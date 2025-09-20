// 🌍 Bloom Tracker Dashboard with Year Selector

// ---------------------- VISUALIZATION PARAMETERS ----------------------
var ndviVis = {
  min: 0,
  max: 9000,
  palette: ['brown', 'yellow', 'green']
};

// Center map
Map.setCenter(78.9629, 20.5937, 3);

// ---------------------- UI PANEL ----------------------
var panel = ui.Panel({
  style: { width: '450px', padding: '10px' } // wider for dropdown
});
ui.root.insert(0, panel);

// Title
panel.add(ui.Label({
  value: '🌍 Bloom Tracker Dashboard',
  style: { fontSize: '20px', fontWeight: 'bold' }
}));

panel.add(ui.Label('Visualize and track plant blooming events (NDVI) across time using NASA MODIS data.'));

// ---------------------- YEAR SELECTOR ----------------------
var years = ['2015','2018','2020','2023','2025'];
var yearSelector = ui.Select({
  items: years,
  value: '2025',
  style: { stretch: 'horizontal', maxHeight: '150px' } // ensures all years visible
});
panel.add(ui.Label('Select Year:'));
panel.add(yearSelector);

// Label to show the selected NDVI date
var dateLabel = ui.Label({ value: 'Date: ', style: { fontWeight: 'bold' } });
panel.add(dateLabel);

// Slider (dynamic)
var slider = ui.Slider({ style: { stretch: 'horizontal' } });
panel.add(slider);

// Chart panel
var chartPanel = ui.Panel({ style: { height: '300px' } });
panel.add(chartPanel);

// ---------------------- GLOBAL VARIABLES ----------------------
var currentDataset = null;
var currentYear = null;
var imageDates = [];

// ---------------------- FUNCTIONS ----------------------

// Load NDVI dataset for a given year
function loadDataset(year) {
  var start = year + '-01-01';
  var end = year + '-12-31';
  return ee.ImageCollection('MODIS/006/MOD13Q1')
            .select('NDVI')
            .filterDate(start, end)
            .sort('system:time_start');
}

// Update map & slider for selected year
function updateYear(year) {
  var dataset = loadDataset(year);

  // Limit to max 50 images
  var maxImages = 50;
  var datasetLimited = dataset.limit(maxImages);
  var numImages = datasetLimited.size().getInfo();

  if (numImages <= 0) {
    slider.style().set('shown', false);
    dateLabel.setValue('Date: ');
    Map.layers().reset();
    chartPanel.clear();
    print('No NDVI images found for year: ' + year);
    return;
  } else {
    slider.style().set('shown', true);
    slider.setMin(0);
    slider.setMax(numImages - 1);
    slider.setStep(1);
    slider.setValue(0);
  }

  var listOfImages = datasetLimited.toList(numImages);

  // ---------------------- PRECOMPUTE DATES ----------------------
  imageDates = [];
  for (var i = 0; i < numImages; i++) {
    (function(index){
      ee.Image(listOfImages.get(index)).get('system:time_start')
        .evaluate(function(timeStart){
          imageDates[index] = new Date(timeStart).toISOString().slice(0,10);
          if(index === 0){
            dateLabel.setValue('Date: ' + imageDates[0]); // show first date
          }
        });
    })(i);
  }

  // Add first NDVI layer
  var firstImage = ee.Image(listOfImages.get(0)).visualize(ndviVis);
  var ndviLayer = ui.Map.Layer(firstImage, {}, 'NDVI ' + (imageDates[0] || year));
  Map.layers().set(0, ndviLayer);

  // Slider event
  slider.onChange(function(value) {
    var image = ee.Image(listOfImages.get(value));
    var visImage = image.visualize(ndviVis);

    var dateStr = imageDates[value] || year;
    ndviLayer.setEeObject(visImage);
    ndviLayer.setName('NDVI ' + dateStr);

    dateLabel.setValue('Date: ' + dateStr);
  });

  // Update global references
  currentDataset = datasetLimited;
  currentYear = year;
}

// ---------------------- MAP CLICK HANDLER (ADDED ONCE) ----------------------
Map.onClick(function(coords) {
  chartPanel.clear();
  if (!currentDataset) return;

  var point = ee.Geometry.Point(coords.lon, coords.lat);

  var chart = ui.Chart.image.series({
    imageCollection: currentDataset,
    region: point,
    reducer: ee.Reducer.mean(),
    scale: 250
  }).setOptions({
    title: '🌸 NDVI Time Series (' + currentYear + ')',
    hAxis: {title: 'Date'},
    vAxis: {title: 'NDVI'},
    lineWidth: 2,
    pointSize: 4
  });

  chartPanel.add(chart);
});

// ---------------------- INIT ----------------------
yearSelector.onChange(updateYear);
updateYear(yearSelector.getValue()); // Load default year

// Credits
panel.add(ui.Label('Built with NASA MODIS & Google Earth Engine.'));
