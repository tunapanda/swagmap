/**
*  Resposible for the display of a connction between two swagfacts
*  @class SwagConnectionView
*/

function SwagConnectionView(){
    this.connection = [];
}

/**
*  Draw a connection between two items
*  @method draw
*/
SwagConnectionView.prototype.setFromX = function(value){
	this.connection.push(value);
}

SwagConnectionView.prototype.setFromY = function(value){
	this.connection.push(value);
}

SwagConnectionView.prototype.setToX = function(value){
	this.connection.push(value);
}

SwagConnectionView.prototype.setToY = function(value){
	this.connection.push(value);
}
SwagConnectionView.prototype.draw = function(){
    line(this.connection[0], this.connection[1], this.connection[2], this.connection[3]);
}
module.exports=SwagConnectionView;

