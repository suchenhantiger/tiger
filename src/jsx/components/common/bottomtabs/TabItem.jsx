import {Link} from 'react-router';

import styles from './css/tab.css';

class TabItem extends PureComponent{

    constructor(props) {
        super(props);
    }

    //判断是否有状态或属性变化，如果没有不重绘
    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.basetheme!==this.props.basetheme)
        ||(nextProps.iconClass!==this.props.iconClass)||(nextProps.hash!==this.props.hash)
        ||(nextProps.text!==this.props.text);
    }

    render(){

        systemApi.log("TabItem render");

        var {style,basetheme,iconClass,hash,text} = this.props,
            linkClass = this.mergeClassName(styles[iconClass], styles.link);

        return(
            <div className={this.mergeClassName(styles.fticon, styles[basetheme])} style={style}>
                <Link to={hash} className={linkClass} activeClassName={styles.on}>
                    <div className={styles.tabIcon}></div>
                    <span>{text}</span>
                </Link>
            </div>


        );

    }

}

module.exports = TabItem;
