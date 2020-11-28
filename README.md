# javascript-challenge: UFO Sightings #


This repository contains an html page with a table of data on reported UFO sightings during the first two weeks of 2010. With the UFO.js file, The table can be filtered on date, shape of UFO, and location (country, state, city). These filters can all be stacked -- for example choosing a date and shape will return a table where both of those criteria are fulfilled. If you've activated multiple filters, but now want to re-widen the scope of your search, resetting a value to 'all' (or clearing the input, in the case of the date filter specifically) will undo that particular filter.

You'll notice that there are initially no options in the state and city dropdowns. I've set the location section to be progressively selective. If you select an option from the country dropdown, the state dropdown will be populated with the states in the dataset that are within that country. likewise, if you select an option from the state dropdown, the city dropdown will now contain all the cities within that state that have UFO sightings recorded in this dataset. This is much easier to navigate than having every option in the three dropdowns.




