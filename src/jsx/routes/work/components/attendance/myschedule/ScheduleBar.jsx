import IScroll from '../../../../../lib/iscroll';
import ScheduleBarItem from './ScheduleBarItem'
import styles from '../../../../../../css/components/work/attendance/myschedule/scheduleBar.css';

class ScheduleBar extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
          selectdate:null
        }
          this.itemWidth=systemApi.getDeviceMessage().screenWidth/7;
          this.ulWidth=this.itemWidth*this.props.daysinMonth;
          this.lastNewMovepos=null;
    }
    componentWillMount(){
        var  {initDate} = this.props;
        this.setState({selectdate:initDate})
    }
    componentWillReceiveProps(nextProps){
      var  {initDate} =nextProps;
      this.ulWidth=this.itemWidth*this.props.daysinMonth;
      this.setState({selectdate:initDate});
      this.positionMiddle(initDate);
    }
    componentDidMount(){

        var that = this,
          {main} = this.refs;
          //修复Android机子滚送问题
          main.addEventListener('touchmove', this.preDft, false);

          this.wrapper = new  IScroll(this.refs.main,{
              useTransition: false, /* 此属性不知用意，本人从true改为false */
              probeType: 2,
              click:true,
              scrollX: true,
              scrollY: false,
              bounce:false
          });


          this.wrapper.on("scrollEnd",function(){
              var curIndex = Math.round(-this.x/that.itemWidth);
              curIndex = curIndex<0?0:curIndex;
              if(Math.round(-this.x)>=Math.round(that.ulWidth-systemApi.getDeviceMessage().screenWidth)) return;
              if(this.x == -curIndex*that.itemWidth) return;
                this.scrollTo((-curIndex)*that.itemWidth,0,0);


          });
          this.wrapper.on("scrollCancel",function(){
            var curIndex = Math.round(-this.x/that.itemWidth);
            curIndex = curIndex<0?0:curIndex;
            if(Math.round(-this.x)>=Math.round(that.ulWidth-systemApi.getDeviceMessage().screenWidth)) return;
            if(this.x == -curIndex*that.itemWidth) return;
            this.scrollTo(-curIndex*that.itemWidth,0,0);
          });
          this.positionMiddle(this.state.selectdate);
    }
    componentWillUnmount(){
      var {main} = this.refs;
      main.removeEventListener('touchmove', this.preDft);
      if(this.wrapper){
          this.wrapper.destroy();
      }
    }
    componentDidUpdate(){
      if(this.wrapper){
             this.wrapper.refresh();
        }

        $(this.refs.searchbarul).css('width',this.ulWidth+"px");
    }
    positionMiddle=(data)=>{
      var today=data.split('-')[2];
      var newmovepos;
      if(this.props.daysinMonth-today>=3)
        newmovepos=today-4;
      else
        newmovepos=this.props.daysinMonth-7;
      /*记录上一次的位置 主要用于处理最后面一页 如果没有位移的话也自行scrollTo的话，会导致页面300毫秒内无法再次点击*/



      if(newmovepos>0 && this.lastNewMovepos!=newmovepos){

        this.wrapper.scrollTo(-1*this.itemWidth*newmovepos,0,300);
        this.lastNewMovepos=newmovepos;
      }

    }
    //阻止默认行为
    preDft = (e)=>{
        e.preventDefault();
    }

    itemClick=(date,chday)=>{
        var  {onSelect} = this.props;
        this.setState({selectdate:date});
        this.positionMiddle(date);

        if(onSelect)
          onSelect(date,chday);
    }
    renderUI(){
      var  {data,daysinMonth} = this.props;
      var {selectdate}=this.state;


      var list=[];

      if(data.length>0){
        data.forEach((item)=>{
          var isselect="0";
          if(selectdate==item.date)
            isselect="1";
          list.push(
            <ScheduleBarItem
              date={item.date}
              day={item.day}
              week={item.week}
              chday={item.lunar}
              status={item.status}
              isselect={isselect}
              onClick={this.itemClick}
              />)
        })
      }

      return(
        <ul className={styles.tabNav} style={{"width":this.ulWidth+"px"}} ref="searchbarul">
           {list}
        </ul>
      )


    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ScheduleBar render");

        return(
          <div ref="main" className={this.mergeClassName(styles.scrollView, styles.frame)}>
            <div className={this.mergeClassName(styles.scrollsubView, styles.div)} ref="frame">
              {this.renderUI()}
            </div>
          </div>
        )

    }


}

module.exports = ScheduleBar;
