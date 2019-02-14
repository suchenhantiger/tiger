/*引入css页面*/
import styles from '../../../../../css/routes/work/attendance/attendancePage.css';

/*引入组件*/
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import AttendanceSignPage from '../../pages/attendance/AttendanceSignPage.jsx'
import AttendanceStatsMyPage from '../../pages/attendance/AttendanceStatsMyPage.jsx'


/********考勤主页*********/
class AttendancePage extends PageComponent{
    static defaultProps={

    }

    constructor(props,context) {
        super(props,context);
        this.state = {
          index: 0,//当前的标签页(0-打卡 1-申请 2-统计)
        }
        this.defaultProps={

        }
    }
      //获取页面名称
    getPageName(){ return "考勤"; }

    componentWillMount(){
    }
    componentDidMount(){
        super.componentDidMount();
    }

    componentWillUnmount(){
        super.componentWillUnmount();
    }
    onChangeTab=(index)=>{
      return ()=>{
          this.setState({index:index});
      }
    }

    render(){
        systemApi.log("AttendancePage render");
        var {index} = this.state,
            {location} = this.props,
            {query={}} = location;;

        return (

          <FullScreenView>
            <div className='g_main'>
              <LazyLoad index={index}>
                  <AttendanceSignPage></AttendanceSignPage>
                  <AttendanceStatsMyPage query={query.date}></AttendanceStatsMyPage>
              </LazyLoad>
                {this.props.children}
            </div>
            {/*渲染底部切换标签*/}
            <div className={styles.hysyy_footer}>
                  <div className={styles.hysyy_fticon}>
                        <a onClick={this.onChangeTab(0)} className={index==0?styles.on:''} >
                            <div className={styles.icon}><div className={index==0?styles.icon_rc_on:styles.icon_rc_gary}></div></div>
                            <span className={index==0?styles.p_xx_font+' '+styles.p_xx_blue:styles.p_xx_font}>打卡</span>
                        </a>
                  </div>
                  <div className={styles.hysyy_fticon}>
                        <a onClick={this.onChangeTab(1)}  className={index==1?styles.on:''}>
                            <div className={styles.icon}><div className={index==1?styles.icon_xx_on:styles.icon_xx_gary}></div></div>
                            <span className={index==1?styles.p_xx_font+' '+styles.p_xx_blue:styles.p_xx_font}>统计</span>
                        </a>
                  </div>
            </div>
            {/***************************/}
          </FullScreenView>

        );
    }

}


module.exports = AttendancePage;
