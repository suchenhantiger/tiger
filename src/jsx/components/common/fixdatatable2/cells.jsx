/**
 * Copyright Schrodinger, LLC
 */
"use strict";

// const ExampleImage = require('./ExampleImage');
const { Cell } = require('fixed-data-table-2');
const React = require('react');
// const ReactTooltip = require('react-tooltip');

class CollapseCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </Cell>
    );
  }
};
// module.exports.CollapseCell = CollapseCell;

// Number.prototype.toPercent = function(){
//   return (Math.round(this * 10000)/100).toFixed(2) + '%';
// }

class ColoredTextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    let {color, percent} = props;
    return (
      <Cell {...props}>
        {/*.getObjectAt(rowIndex)*/}
        {/*this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)*/}
        {color ? (<span style={{color}} key={data.getObjectAt(rowIndex)[columnKey]}>{data.getObjectAt(rowIndex)[columnKey]}</span>) :
        this.colorizeTextAsDecimal(data.getObjectAt(rowIndex)[columnKey], percent)}
      </Cell>
    );
  }

  colorizeText(str, index) {
    let val, n = 0;
    return str.split('').map((letter) => {
      val = index * 70 + n++;
      let color = 'hsl(' + val + ', 100%, 50%)';
      return <span style={{color}} key={val}>{letter}</span>;
    });
  }

  colorizeTextAsDecimal(str, percent) {
    let num = parseFloat(str),
        val = !isNaN(num) ? num.toFixed(2)+(percent!=undefined && percent==true ? '%' : ''):'-',
        color = isNaN(num) ? '#000000' : (num < 0 ? '#008000' : '#ff0000');

    return <span style={{color}} key={val}>{val}</span>;
  }
};
// module.exports.ColoredTextCell = ColoredTextCell;

class DateCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {/*.getObjectAt(rowIndex)*/}
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </Cell>
    );
  }
};
// module.exports.DateCell = DateCell;

// class ImageCell extends React.PureComponent {
//   render() {
//     const {data, rowIndex, columnKey, ...props} = this.props;
//     return (
//       <ExampleImage
////.getObjectAt(rowIndex)
//         src={data.getObjectAt(rowIndex)[columnKey]}
//       />
//     );
//   }
// };
// module.exports.ImageCell = ImageCell;

class LinkCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    let {filter} = props,
        originalStr = data.getObjectAt(rowIndex)[columnKey];
    if (filter && filter!="") {
      var filteredStr = originalStr.replace(new RegExp(filter, "gm"), "");
    }
    return (
      <Cell {...props}>
        {/*.getObjectAt(rowIndex)*/}
        {/*'text-decoration':'underline'*/}
        <a style={{'color':'#3492e9'}} onClick={this.onClick}>{
            (filter && filter!="") ? filteredStr:originalStr
          }</a>
      </Cell>
    );
  }

  onClick=()=>{
    const {data,rowIndex, columnKey,route, idColumnKey, ...others} = this.props;
    if (route && route!="" && idColumnKey && idColumnKey!="") {
      hashHistory.push({ pathname: route,
        state:{id:data.getObjectAt(rowIndex)[idColumnKey], name:data.getObjectAt(rowIndex)[columnKey], ...others}});
    }
  }
};
// module.exports.LinkCell = LinkCell;

class PendingCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    // .getObjectAt(rowIndex)
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <Cell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
    );
  }
};
const PagedCell = ({data, ...props}) => {
  const dataVersion = data.getDataVersion();
  return (
    <PendingCell
      data={data}
      dataVersion={dataVersion}
      {...props}>
    </PendingCell>
  );
};
// module.exports.PagedCell = PagedCell;

class RemovableHeaderCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, callback, children, ...props} = this.props;
    return (
      <Cell {...props}>
        {children}
        <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </Cell>
    );
  }
};
// module.exports.RemovableHeaderCell = RemovableHeaderCell;

class TextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    let {precision, filter} = props,
       originalStr = data.getObjectAt(rowIndex)[columnKey],
        val = parseFloat(originalStr);
    if (filter && filter!="") {
      var filteredStr = originalStr.replace(new RegExp(filter, "gm"), "");
    }
    return (
      <Cell {...props}>
        {/*.getObjectAt(rowIndex)*/}
        {originalStr != "" ?
          (!precision ? ((filter && filter!="") ? filteredStr:originalStr) :
          (!isNaN(val) ? val.toFixed(Number(precision)) : NaN))
          : '-'}
      </Cell>
    );
  }
};
// module.exports.TextCell = TextCell;

// class TooltipCell extends React.PureComponent {
//   render() {
//     const {data, rowIndex, columnKey, ...props} = this.props;
////.getObjectAt(rowIndex)
//     const value = data.getObjectAt(rowIndex)[columnKey];
//     return (
//       <Cell
//         {...props}
//         onMouseEnter={() => { ReactTooltip.show(); }}
//         onMouseLeave={() => { ReactTooltip.hide(); }}>
//         <div ref='valueDiv' data-tip={value}>
//           {value}
//         </div>
//       </Cell>
//     );
//   }
// };
// module.exports.TooltipCell = TooltipCell;

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {onSortChange, sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        (this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC),
        this.props.colIsNumber
      );
    }
  }
}

var Cells = {
  CollapseCell: CollapseCell,
  ColoredTextCell: ColoredTextCell,
  DateCell: DateCell,
  LinkCell: LinkCell,
  PagedCell: PagedCell,
  RemovableHeaderCell: RemovableHeaderCell,
  TextCell: TextCell,
  SortHeaderCell:SortHeaderCell
}

module.exports = Cells;
