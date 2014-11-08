Swagmap Backlog
===============

Current
-------

* Create the controller. The controller should tell the model to load iself, then take the data from the model
  and populate the view.

* Create the function `handleXApiStatement(xApiStatement)` in `SwagItemModel`. This function will take the data for
  one xAPI statement and make relevant changes to itself. There is a (commented out) test for this here:
  https://github.com/tunapanda/swagmap/blob/master/test/unit/model/SwagItemModel.spec.js

* Create the function `handleXApiStatement(xApiStatement)` in `SwagModel`. This function will take the data for
  one xAPI statement and make relevant changes to all the items in the model.

* Use [TinCanJS](https://github.com/RusticiSoftware/TinCanJS) to connect to the LRS to get data for which
  swagifacts that should be displayed as completed or not completed.

  * Add the function `setXApiEndpoint(url, username, password)` to the model. This function should just store 
    the information.
  * Add the function `loadXApiData()` to the model. This function should look at the `object` for each
    `SwagItemModel` and make relevant calls to the xAPI backend. It should then take the replies and
    call the `handleXApiStatement` function to update the model. When the process is complete, the model
    should dispatch an `update` event.
  * Make relevant tests for these functions.

* Add a label to the swagifacts.

Planned
-------

* Make the swagifacts clickable. Each swagifact should have a url defined inside of them.
* Make 3 badges on top of the swagifacts to show performance. We can use green dots to start with.
* Each completed swagifact should show the score.

Completed
---------
* Create connections between Swagifacts.
* Swagifacts should be displayed as completed or not completed.
* Create the model. The model should be usable like this:
````
var m=new SwagMapModel();
m.loadSwagMap("swagmap.json");
m.on("loaded",function() {
    m.getSwagItems();
});
````
* Define the .json to be loaded by the swagmap app. Suggestion is at: https://github.com/tunapanda/swagmap/blob/master/test/view/testmap.json
