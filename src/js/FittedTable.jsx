
var React            = require('react');
var FixedDataTable   = require('fixed-data-table');
var SetContainerSize = require('./SetContainerSize.jsx');

var PropTypes        = React.PropTypes;
var Table            = FixedDataTable.Table;
var Column           = FixedDataTable.Column;

var TouchScrollArea  = require('./TouchScrollArea.jsx');

var FittedTable = React.createClass({
	mixins: [SetContainerSize],

	_onContentHeightChange : function(contentHeight) {
		var width = 0;
		React.Children.forEach(this.props.children, function(child){
			if ('width' in child.props){
				width = width + child.props.width;
			}
		});
		this.refs.touchScrollArea._onContentDimensionsChange(this.state.width, this.state.height, width, contentHeight);
	},

	handleScroll : function(left, top){
		this.setState({
			top: top,
			left: left
		});
	},

	render : function(){
		var controlledScrolling = this.state.left !== undefined || this.state.top !== undefined;
		return (
			<TouchScrollArea handleScroll={this.handleScroll} ref='touchScrollArea'>
				<Table {...this.props}
					width={this.state.width}
					height={this.state.height} 
					onContentHeightChange={this._onContentHeightChange}
					scrollTop={this.state.top}
					scrollLeft={this.state.left}
					overflowX={controlledScrolling ? "hidden" : "auto"}
					overflowY={controlledScrolling ? "hidden" : "auto"} />
			</TouchScrollArea>
		);
	}
});

module.exports = FittedTable;
