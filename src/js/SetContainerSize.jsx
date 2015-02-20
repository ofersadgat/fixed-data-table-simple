

var detectResize   = require('./detect-element-resize.js');

var SetContainerSize = {
	getInitialState: function(){
		return {
			width: 0,
			height: 0
		};
	},

	componentDidMount : function(){
		this._onResize();
		detectResize.addResizeListener(this.getDOMNode().parentNode, this._onResize);
	},

	componentWillUnmount : function(){
		detectResize.removeResizeListener(this.getDOMNode().parentNode, this._onResize);
	},

	_onResize : function() {
		var node = this.getDOMNode();

		var borderWidth = node.offsetWidth - node.clientWidth;
		var borderHeight = node.offsetHeight - node.clientHeight;

		var width = node.parentNode.offsetWidth - borderWidth;
		var height = node.parentNode.offsetHeight - borderHeight;

		this.setState({
			width:width,
			height:height
		});
	}
};

module.exports = SetContainerSize;

