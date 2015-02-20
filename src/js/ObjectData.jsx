

var React          = require('react');
var FixedDataTable = require('fixed-data-table');

var PropTypes      = React.PropTypes;
var Table          = FixedDataTable.Table;
var Column         = FixedDataTable.Column;

var LoadingCellContainer = require('./LoadingCellContainer.jsx');
var ObjectDataListStore  = require('./ObjectDataListStore.jsx');
var FittedTable          = require('./FittedTable.jsx');


var renderCell = function(cellData, cellDataKey, rowData, rowIndex, columnData, width){
  var renderLoaded = function(rowData){
    if (cellDataKey == 'thumbnail'){
      return <img src={rowData.thumbnailUrl} />;
    }
    return <div>{rowData[cellDataKey]}</div>;
  };

  return (
    <LoadingCellContainer 
        data={rowData} 
        dataKey={cellDataKey}
        unloaded={<span></span>}
        renderLoaded={renderLoaded} />
  );
};

var ObjectData = React.createClass({

  componentWillMount: function(){
    var self = this;
    ObjectDataListStore.addChangeListener(function(){
      self.forceUpdate();
    });
  },

  render : function() {
    return (
      <FittedTable
        rowHeight={50}
        headerHeight={50}
        rowGetter={ObjectDataListStore.getObjectAt}
        rowsCount={ObjectDataListStore.getSize()}
        >
        <Column
          dataKey="thumbnail"
          label="Thumbnail"
          cellRenderer={renderCell}
          width={100}/>
        <Column
          dataKey="id"
          label="Id"
          cellRenderer={renderCell}
          width={50}/>
        <Column
          dataKey="albumId"
          label="Album Id"
          cellRenderer={renderCell}
          width={50}/>
        <Column
          dataKey="title"
          label="Title"
          cellRenderer={renderCell}
          width={100}/>
      </FittedTable>
    );
  },
});

module.exports = ObjectData;
