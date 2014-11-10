Swagmap Backlog
===============

Current
-------

* Create a new viewtest based on https://github.com/tunapanda/swagmap/blob/master/test/view/controllertest.html
  that calls `handleXApiStatement` based on some dummy data. The completed items should show up as completed.

* Add the function `setXApiEndpoint(url, username, password)` to the model. This function should create an instance
  of TinCanJS. Add the function `getTinCan` to retreive this instance.

* Add the function `updateCompletion` to SwagItemModel. This function should make an xAPI call and update its
  completion state depending on the result. It should dispatch an "update" event when it is done.

* Add the function `updateCompletion` to SwagMapModel. This function should call `updateCompletion` on all
  the SwagItemModel:s for the SwagMapModel.

* Add a label to the swagifacts.

* Create a view test that loads sample data from the xAPI store at:
  http://staging.tunapanda.org/learninglocker/public/

Planned
-------

* Make the swagifacts clickable. Each swagifact should have a url defined inside of them.
* Make 3 badges on top of the swagifacts to show performance. We can use green dots to start with.
* Each completed swagifact should show the score.

Completed
---------
* Create the controller. The controller should tell the model to load iself, then take the data from the model
  and populate the view.
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
* Create the function `handleXApiStatement(xApiStatement)` in `SwagItemModel`. This function will take the data for
  one xAPI statement and make relevant changes to itself. There is a (commented out) test for this here:
  https://github.com/tunapanda/swagmap/blob/master/test/unit/model/SwagItemModel.spec.js
