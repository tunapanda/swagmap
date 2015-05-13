swagmap
=======

Visualize learning paths in a gamified way.

This is a part of [Swag](https://github.com/tunapanda/swag), and it is the part that actually shows the swagmaps.

It is not indented to be installed directly by end users, but developers might be interested in doing so!

It is not independently _usable_, but it is independently _testable_.

Demos and docs
--------------

Release early, release often!

The following is published on each commit, so there is no guarantee that they work _now_.

For visual tests and demos, see: [Swag Map Demo](http://limikael.altervista.org/swagmapdemo/)

For internal class docs, see: [Swag Map Class Docs](http://limikael.altervista.org/swagmapdoc/)

Deployment
----------

In order to deploy this app, you need the bundled file in the bin dir, as well as [p5.js](http://p5js.org/). To see an example how to set things up, see: [test/view/apptest.html](https://github.com/tunapanda/swagmap/blob/master/test/view/apptest.html)

Hacking
-------

To build this locally to hack on it, first do:

````
npm install
````

Inside the checked out directory. Then, run `grunt` and you will see a number of build tasks. The task that builds the bundled javascript is:

````
grunt build
````
