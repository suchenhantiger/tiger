import {Link} from 'react-router';

import styles from './css/tab.css';

class TabItem extends PureComponent{

    constructor(props) {
        super(props);
        this.state={

        }
    }

    //判断是否有状态或属性变化，如果没有不重绘
    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.style!==this.props.style)||(nextProps.basetheme!==this.props.basetheme)
        ||(nextProps.iconClass!==this.props.iconClass)||(nextProps.hash!==this.props.hash)
        ||(nextProps.text!==this.props.text)||(nextProps.holidayTheme!==this.props.holidayTheme);
    }

    render(){

        systemApi.log("TabItem render");

        var {style,basetheme,iconClass,hash,text} = this.props,
            linkClass = this.mergeClassName(styles[iconClass], styles.link);
        var {tabItemOn,tabItemOff,fontColor} = this.props;
        if (tabItemOn!=='' || tabItemOff!=='') {
            linkClass = this.mergeClassName(linkClass,styles.holiday);
            console.log("传进来的tabItemOff为："+tabItemOff);
        }

        return(
            <div className={this.mergeClassName(styles.fticon, styles[basetheme])} style={style}>
                {(tabItemOn==''&& tabItemOff=='')?
                  <Link to={hash} className={linkClass} activeClassName={styles.on}>
                      <div className={styles.tabIcon}></div>
                      <span>{text}</span>
                  </Link>:
                  <Link to={hash} className={linkClass} style={{backgroundImage:'url('+tabItemOff+')',color:fontColor}} activeStyle={{backgroundImage:'url('+tabItemOn+')',backgroundSize:'38px',fontSize:'0px'}}>
                      {text}
                  </Link>
                }



            </div>


        );

    }

}

module.exports = TabItem;
