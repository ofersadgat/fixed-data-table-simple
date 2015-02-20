
var React                             = require('react');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');


var LoadingCellContainer = React.createClass({

  mixins: [ReactComponentWithPureRenderMixin],

  onDataChange : function(){
    this.forceUpdate();
  },

  componentWillMount : function(){
    this.props.data.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function(){
    this.props.data.removeChangeListener(this.onDataChange);
  },

  componentWillReceiveProps: function(nextProps){
    if (this.props && this.props.data){
      this.props.data.removeChangeListener(this.onDataChange);
    }
    nextProps.data.addChangeListener(this.onDataChange);
  },

  render : function() {
    if (this.props.data.data){
      return this.props.renderLoaded(this.props.data.data);
    } else {
      return this.props.unloaded;
    }
  }
});

module.exports = LoadingCellContainer;
