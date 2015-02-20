
var React           = require('react');
Object.assign       = require('object-assign');
React.initializeTouchEvents(true);

var ObjectData      = require('./ObjectData.jsx');

var App = React.createClass({
	render: function(){
		return (
			<ObjectData />
		);
	}
});


React.render(<App />, document.getElementById('client'));


