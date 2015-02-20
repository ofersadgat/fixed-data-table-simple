
var $                      = require('jquery');
var EventEmitter           = require('events').EventEmitter;
var LoadingObjectContainer = require('./LoadingObjectContainer.jsx');


var ObjectDataListStoreDefinition = function(){
  this.size = undefined;
  this.cache = [];

  this.setObjectAt = function(index, data){
    if (data instanceof Array){
      for (var i = 0; i < data.length; i++){
        this.setObjectAt(index + i, data[i]);
      }
      return;
    }
    if (!(index in this.cache)){
      this.cache[index] = new LoadingObjectContainer();
    }
    this.cache[index].setData(data);
  }.bind(this);

  this.getObjectAt = function getObjectAt(index) {

    if (index >= 0 && (index <= this.size || this.size === undefined) && (this.cache.length < index || this.cache[index] === undefined)) {
      var self = this;
      var limit = 30;

      var url = 'http://jsonplaceholder.typicode.com/photos';

      var supportsPaging = false; //this fake api doesnt support paging
      if (supportsPaging){
        url = url + '?limit=' + limit + '&offset=' + index;
        for (var i = 0; i < limit; i++){
          this.cache[index+i] = new LoadingObjectContainer();
        }
      }
      
      $.ajax(url, {
        crossDomain: true,
      }).then(function(data){
        self.setObjectAt(index, data);
        if (self.size === undefined || index + data.length > self.size){ //normally here you would set the size to the full table size, but this fake api doesnt have that information
          self.size = index + data.length;
          self.emitChange();
        }
      });
    }
    return index < 0 ? {} : this.cache[index];
  }.bind(this);

  this.getSize = function getSize() {
    return this.size === undefined ? 0 : this.size;
  }.bind(this);

  this.emitChange = function(){
    this.emit(ObjectDataListStore.EVENTS.CHANGE);
  }.bind(this);

  this.addChangeListener = function(callback){
    this.on(ObjectDataListStore.EVENTS.CHANGE, callback);
  }.bind(this);

  this.removeChangeListener = function(callback){
    this.removeListener(ObjectDataListStore.EVENTS.CHANGE, callback);
  }.bind(this);

  return this;
};
ObjectDataListStoreDefinition.prototype = EventEmitter.prototype;
var ObjectDataListStore = new ObjectDataListStoreDefinition();

ObjectDataListStore.EVENTS = {};
ObjectDataListStore.EVENTS.CHANGE = "ObjectDataListStore.CHANGE";

ObjectDataListStore.getObjectAt(0);

module.exports = ObjectDataListStore;
