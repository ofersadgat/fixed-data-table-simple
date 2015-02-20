

var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var LoadingObjectContainer = function(){
	var self = this;

	this.data = undefined;

	this.setData = function(data){
		this.data = data;
		this.emitChange();
	};

	this.emitChange = function(){
		self.emit(LoadingObjectContainer.EVENTS.CHANGE);
	};

	this.addChangeListener = function(callback){
		self.on(LoadingObjectContainer.EVENTS.CHANGE, callback);
	};

	this.removeChangeListener = function(callback){
		self.removeListener(LoadingObjectContainer.EVENTS.CHANGE, callback);
	};

	return this;
};
LoadingObjectContainer.prototype = EventEmitter.prototype;
LoadingObjectContainer.EVENTS = {};
LoadingObjectContainer.EVENTS.CHANGE = "LOADINGOBJECTCONTAINER.CHANGE";

module.exports = LoadingObjectContainer;
