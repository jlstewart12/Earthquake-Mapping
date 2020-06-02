Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

1. **Data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and collected a data set to visualize. The data pulled was presented in JSON format.

   ![4-JSON](Images/4-JSON.png)

2. **Data Import and Visualization**

   A map is created using Leaflet that displays all of the earthquakes from the data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * Popups provide additional information about the earthquake when a marker is clicked.

   * A legend will provides context of the map data.

   * The visualization should look something like the map above.

- - -

### Level 2: More Data

![5-Advanced](Images/5-Advanced.png)

The second data set on the map illustrates the relationship between tectonic plates and seismic activity. The second data set is visualized along side the original set of data. Data on tectonic plates were found at <https://github.com/fraxen/tectonicplates>.
