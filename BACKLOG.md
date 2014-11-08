Swagmap Backlog
===============

Current
-------

* Define the .json to be loaded by the swagmap app. Suggestion:
````
{
  title: "Tunapanda Typing Swag",
  items: [
    {
      x: 40,
      y: 20,
      label: "Level 1",
      object: "http://some/xapi/activity"
    },

    {
      x: 60,
      y: 30,
      label: "Level 2",
      object: "http://some/other/xapi/activity"
    },
  ]
}
````
* Create the controller. The controller should tell the model to load iself, then take the data from the model and populate the view.

Planned
-------

* Use [TinCanJS](https://github.com/RusticiSoftware/TinCanJS) to connect to the LRS to get data for which swagifacts that should be displayed as completed or not completed.
* Think about how the swagifacts should be displayed. Should there be an icon? Should there be a text?
* Make the swagifacts clickable. Each swagifact should have a url defined inside of them.

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
