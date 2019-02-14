import styles from './css/fixedTable.css';
import ReactTouchHandler from './ReactTouchHandler.jsx';
import TouchableHighlight from '../animate/TouchableHighlight';

class FixedTable extends PureComponent{
    static defaultProps = {
          showHeadLine:true,
          headLineColor:"#d5e0ec",
          showLine:true,
          lineColor:"#d5e0ec",
          tableHeight:"370px",
          maxLength:5
    }

    //构造函数
    constructor(props) {
        super(props);
        var {documentElement} = document,
            {clientWidth} = documentElement;
        this.curX = 0;
        this.curY = 0;
        this.headStartX = 0;
        this.loadMore = false;
        this.clientWidth = clientWidth;

        this.state = {
          sortStates: [],
          update: false
        }
        this._direct=0;//1.纵向 2 横向 0无
        this._firstT=true;
        console.log(props.sortType);
    }

    componentWillMount(){
        this._touchHandler = new ReactTouchHandler(
          this._onScroll,
          true,
          true,
          false
        );
        this._touchHandler.setAutoScrollEndCallback(this.onScrollEnd)
    }

    componentWillUnmount() {
        this._touchHandler = null;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return true;
    // }

    _onScroll=(/*number*/ deltaX, /*number*/ deltaY)=> {
        // console.log("deltaX=",deltaX," deltaY=",deltaY);
        if(this._firstT){
            this._firstT=false;
            if(Math.abs(deltaY)>Math.abs(deltaX)){
                this._direct = 1;
            }else{
                this._direct = 2;
            }

        }


        var {main, fixmain, more} = this.refs;
        var {onLoadMore} = this.props;
        var tabHeight = $(fixmain).height(),
        diffH = tabHeight - $(main).height(),
        rediffH = diffH<0?0:diffH;

        var maxLeft = $(fixmain).width() - this.clientWidth,
        maxLeft = maxLeft < 0 ? 0 : maxLeft,
        maxTop = rediffH + (onLoadMore?30:0);
        // maxTop = maxTop < 0 ? 0 : maxTop;

        // console.log("tabHeigh=",tabHeight," diffH=",diffH," rediffH=",rediffH);
        var top=0,left=0;
        if(this._direct==1){
            var top = this.curY - deltaY,
            left = this.curX;
        }else if(this._direct==2){
            var left = this.curX - deltaX,
            top=this.curY;
        }else {
            var top = this.curY - deltaY,
            left = this.curX - deltaX;
        }


        this.curX = left > 0 ? 0 : (left < -maxLeft ? -maxLeft : left),
        this.curY = top > 0 ? 0 : (top < -maxTop ? -maxTop : top);
        this.renderUI();

        if(this.curY < -(rediffH+15)){
            if(!this.loadMore)
            {
                // console.log("loadMore 111");
                $(more).css({top:(tabHeight+this.curY)+"px"}).show();
                this.loadMore = true;
            }
        }
        else{
            // console.log("loadMore 222");
            this.loadMore = false;
            $(more).hide();
        }
    }

    onScrollEnd=()=>{
      // console.log("onTouchEnd hide");
      this._firstT= true;
      this._direct=0;
      var self = this;

      var {main, fixmain, more} = this.refs;
      var {onLoadMore} = this.props;
      var maxTop = $(fixmain).height()-$(main).height();
          maxTop = maxTop<0?0:maxTop;

      if(this.curY < -maxTop){
          this.renderUI();
      }

      if(this.loadMore)
      {
          // setTimeout(() => {
              // console.log("loadMore 333");
              self.loadMore = false;
              $(more).hide();
              //记载更多
              self.renderUI();
              onLoadMore && onLoadMore();
          // }, 500);
      }
    }

    headOnTouchStart=(e)=>{
      var {touches} = e;
      if(touches.length == 1){
          var touch = touches[0],
          {pageX} = touch;
          this.headStartX = pageX;
      }
    }

    headOnTouchMove=(e)=>{
      var {main, fixmain} = this.refs;
      var maxLeft = $(fixmain).width() - this.clientWidth,
          maxLeft = maxLeft < 0 ? 0 : maxLeft,
          {touches} = e;

      var touch = touches[0],
      {pageX} = touch,
      deltaX = pageX - this.headStartX,
      left = this.curX + deltaX;
      this.headStartX = pageX;
      this.curX = left>0?0:(left<-maxLeft?-maxLeft:left);
      this.renderUI();
    }

    componentDidMount(){
        this.refreshCell();
    }

    componentDidUpdate(){
        this.refreshCell();
        var {main, fixrow, fixcol, fixtop, fixmain, more} = this.refs,
            maxTop = $(fixmain).height()-$(main).height();

        if(this.curY < -maxTop){
            this.curY = 0;
            this.renderUI();
        }
    }

    componentWillUnmount(){
        var {fixmain} = this.refs;
        $(fixmain).unbind();
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        var {header} = nextProps;
        var sortStates = [];
        header.map((item,index) => {
            sortStates[index] = 0;
            // if(index==1||index==4)
            //     sortStates[index] = 1;
            // else if(index==2)
            //     sortStates[index] = 2;
        });
        this.setState({sortStates: sortStates});
    }

    renderUI(){
        var {main, fixrow, fixcol, fixtop, fixmain,more} = this.refs;
        $(fixmain).css({"top":this.curY+"px","left":this.curX+"px"});
        $(fixrow).css({"left":this.curX+"px"});
        $(fixcol).css({"top":this.curY+"px"});

    }

    cloneCell(copy, cell){
      var {showLine} = this.props;
      var cellHeight = cell.outerHeight();//Math.round(cell.outerHeight());
      // cellHeight = cellHeight(cellHeight%2-1);

        copy.height(cellHeight)
            .width(cell.outerWidth()-1);
            // .css("font-weight",cell.css("font-weight"));
    }

    refreshCell(){
        var {fixNum} = this.props,
            {fixrow, fixcol, fixtop, fixmain} = this.refs;

        var cols = $(fixmain).find("tr").eq(0).find("th"),
            rows = $(fixmain).find("tr"),
            rowDivs = $(fixrow).find("div"),
            colDivs = $(fixcol).find("tr"),//$(fixcol).find("div."+styles.rowItem),
            topDiv = $(fixtop).find("div");
        //左上角固定
        for(var i=0;i<fixNum;i++){
            this.cloneCell(topDiv.eq(i), cols.eq(i));

            topDiv.eq(i).css("line-height",cols.eq(i).outerHeight()+"px");
        }
        //头部固定
        for(var i=0;i<cols.length;i++){
            var item = cols.eq(i);
            this.cloneCell(rowDivs.eq(i), item);
            rowDivs.eq(i).css("line-height",item.outerHeight()+"px");
        }
        //左列固定

        for(var i=0;i<rows.length;i++){
            var item = rows.eq(i);
            var colItem;
            this.cloneCell(colDivs.eq(i), item);
            var cellHeight = item.outerHeight();// Math.round(item.outerHeight());

            if(i==0){
              item = rows.eq(i).find("th"),
              colItem = colDivs.eq(i).find("div");
              for(var j=0;j<1;j++){
                  // this.cloneCell(colItem.eq(j), item.eq(j));
                  var copy = colItem.eq(j);
                  var cell = item.eq(j);
                  copy.height(cellHeight-1)
                      .width(cell.outerWidth()-1);
              }
            }

            var item = rows.eq(i).find("td"),
            colItem = colDivs.eq(i).find("td");
            for(var j=0;j<fixNum;j++){
                // this.cloneCell(colItem.eq(j), item.eq(j));
                var copy = colItem.eq(j);
                var cell = item.eq(j);
                copy.height(cellHeight-1)
                    .width(cell.outerWidth()-1);
            }
        }
    }

    genCols(){
        var {header, data, fixNum} = this.props,
            rows = [{value:header.slice(0,fixNum)}];
        return rows.concat(data.map((item) => {return {value:item.value.slice(0,fixNum),color:item.color}} ));
    }
    clickTop = (index)=>()=>{
        console.log();
    }
    getSortImage = (sort) => {
        var imgSrc = "./images/common/radar/arrow_rb.png";
        if(sort==2){
            imgSrc = "./images/common/radar/arrow_rise.png";
        }
        else if(sort==1){
            imgSrc = "./images/common/radar/arrow_drop.png";
        }
        return imgSrc;
    }

    renderHead(){
        var {header,sortColumns,sortType} = this.props;
        var {sortStates} = this.state;
        return header.map((item,index) => {
          var headCls = styles.rowHead+" "+styles.headBgColor;
          var showSort = false;
          var srotCls = styles.sortIcon;
          var imgSrc;
          if(sortColumns&&sortType&&sortColumns.indexOf(index)>=0){
              showSort = true;
              if(sortType[sortColumns.indexOf(index)]>-1){
                imgSrc = this.getSortImage(sortType[sortColumns.indexOf(index)]);
              }else{
                var sort = sortStates[index];
                imgSrc = this.getSortImage(sort);
              }
          }
          if(showSort)
              return <TouchableHighlight onClick={this.headClick(index)} bottomLine={true} className={headCls} startColor="#fafafa"><span>{item}</span>{showSort?(<img src={imgSrc} className={srotCls}/>):null}</TouchableHighlight>;
          return <div style={{ borderBottom: "1px solid #f1f1f1"}}  onClick={this.headClick(index)} className={headCls}><span style={{display: "inline-block"}} >{item}</span>{showSort?(<img src={imgSrc} className={srotCls}/>):null}</div>;
        });
    }

    headClick = (index)=>()=>{
        var {headClick,sortType,sortColumns}=this.props;
        var {sortStates} = this.state;
        if(sortColumns&&sortType){
            headClick && headClick(index, sortType[sortColumns.indexOf(index)]);
        }else{
            var sort = sortStates[index];
            sort = (sort + 1) % 3;
            for(var i=0; i<sortStates.length; i++)
            {
            sortStates[i] = i==index?sort:0;
            }

            this.setState({sortStates:sortStates,update:!this.state.update});
            headClick && headClick(index, sort);
        }


    }

    renderCol(){
        var {showLine, lineColor, key} = this.props;

        var cols = this.genCols();

        return [
            cols.map((item,index) => {
              var {value,color}=item;
              var redStyle= (showLine)?{border:"1px solid "+lineColor}:{};
              if(color==1)
                redStyle.color="red";

              if(index==0){
                return (<tr className={index%2==0?styles.headBgColor:null} style={redStyle}>{value.map((rowItem,index) => {
                    if(index>=1) return;
                    return <div>{rowItem}</div>;
                })}</tr>);
              }

              else
                //return (<tr className={index%2==0?styles.headBgColor:null} style={redStyle} onClick={this.itemClick(index-1)}>{value.map((rowItem) => <td >{rowItem}</td>)}</tr>)
                return (<tr  style={redStyle} onClick={this.itemClick(index-1)}>{value.map((rowItem) => {
                            if(typeof(rowItem) == 'string'|| !isNaN(rowItem))
                                return <td style={index%2?null:{backgroundColor:"#fafafa"}}  >{rowItem}</td>
                            else
                                return <td style={index%2?null:{backgroundColor:"#fafafa"}}  onClick={this.tdClick(rowItem.value)} className={styles.clickable}>{rowItem.name}</td>
                        })}</tr>)
            })
        ];
    }

    renderFix(){
        var {header, fixNum,sortColumns,sortType} = this.props;
        var {sortStates} = this.state;
        return header.map((item,index) => {
            var showSort = false;
            var srotCls = styles.sortIcon;
            var imgSrc;
            if(sortColumns&&sortType&&sortColumns.indexOf(index)>=0){
                showSort = true;
                if(sortType[sortColumns.indexOf(index)]>-1){
                  imgSrc = this.getSortImage(sortType[sortColumns.indexOf(index)]);
                }else{
                  var sort = sortStates[index];
                  imgSrc = this.getSortImage(sort);
                }
            }
            return index<fixNum?<div style={{ borderBottom: "1px solid #f1f1f1",float:"left"}} onClick={this.headClick(index)} className={styles.rowHead+" "+styles.headBgColor}>{header[index]}{showSort?(<img src={imgSrc} className={srotCls}/>):null}</div>:null});
    }

    itemClick = (index)=>()=>{
        var {itemClick}=this.props;
        itemClick && itemClick(index);
    }
    tdClick = (value)=>()=>{
        var {tdClick}=this.props;
        tdClick && tdClick(value);
    }

    renderTable(){
        var {showLine, lineColor,maxLength} = this.props;
        var {header, data} = this.props;

        return [
            <tr className={styles.headBgColor}>{header.map((item,index) => {
              var headCls = styles.headBgColor+" "+styles.headSize;
              return <th className={headCls} >{item}</th>;
            })}</tr>,
            data.map((item,index) => {
              var redStyle= (showLine)?{border:"1px solid "+lineColor}:{};
              if(item.color==1)
                redStyle.color="red";

             // return (<tr className={index%2?styles.headBgColor:null} style={redStyle} onClick={this.itemClick(index)} >{item.value.map((rowItem) => <td >{rowItem}</td>)}</tr>)
             return (<tr  style={redStyle} onClick={this.itemClick(index)} >{
                 item.value.map((rowItem) => {
                     if(typeof(rowItem) == 'string' || !isNaN(rowItem)){
                       
                        return <td className={rowItem.length>maxLength?styles.wordBreak:null} style={index%2?{backgroundColor:"#fafafa"}:null} >{rowItem}</td>
                     }

                     else
                        return <td className={styles.clickable+" "+(rowItem.length>maxLength?styles.wordBreak:"")}  style={index%2?{backgroundColor:"#fafafa"}:null} onClick={this.tdClick(rowItem.value)} >{rowItem.name}</td>
                    })}</tr>)
            })
        ];
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("FixedTable render");
        var {showHeadLine, headLineColor,showLine, lineColor,tableHeight,onLoadMore} = this.props;
        var paddingTop = 0;//showLine?1:0;

        return(
            <div className={styles.fixtab} style={{height:tableHeight,fontSize:"15px"}} ref="main">
                <table className={styles.fixcol} ref="fixcol" style={{marginTop:paddingTop+"px"}} onTouchStart={this._touchHandler.onTouchStart} onTouchEnd={this._touchHandler.onTouchEnd} onTouchMove={this._touchHandler.onTouchMove} onTouchCancel={this._touchHandler.onTouchCancel}>{this.renderCol()}</table>
              <div className={styles.fixrow} ref="fixrow" style={showHeadLine?{borderLeft:"1px solid "+headLineColor}:{}} onTouchStart={this.headOnTouchStart} onTouchMove={this.headOnTouchMove} >{this.renderHead()}</div>
                <div className={styles.fixtop} ref="fixtop">{this.renderFix()}</div>
                <table className={styles.mainTab} ref="fixmain" onTouchStart={this._touchHandler.onTouchStart}
                onTouchEnd={this._touchHandler.onTouchEnd}
                onTouchMove={this._touchHandler.onTouchMove}
                onTouchCancel={this._touchHandler.onTouchCancel}>{this.renderTable()}</table>
                {onLoadMore?(<div className={styles.load} ref="more">加载更多</div>):null}
            </div>
        );
    }


}

module.exports = FixedTable;
