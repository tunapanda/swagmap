/**
*  Resposible for the display of a connction between two swagfacts
*  @class SwagConnectionView
*/

function SwagConnectionView(swagItem1, swagItem2){
    this.swagItem1 = swagItem1;
    this.swagItem2 = swagItem2;
}

/**
*  Draw a connection between two items
*  @method draw
*/

SwagConnectionView.prototype.draw = function(){
    item1 = [this.swagItem1.getX(), this.swagItem1.getY()];
    item2 = [this.swagItem2.getX(), this.swagItem2.getY()];
    
    var connected = true;
    if (connected)
    {
        stroke(255);
        line(item1[0], item1[1], item2[0], item2[1]);
    }
}

module.exports=SwagConnectionView;

