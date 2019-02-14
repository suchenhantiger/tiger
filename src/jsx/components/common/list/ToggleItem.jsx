import LazyLoad from '../subtabs/LazyLoad';

import styles from './css/toggleItem.css';

class ToggleItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {index,selected} = this.props;
        this.props.onClick(index==selected?-1:index);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ToggleItem render");

        var {title,iconClass,index,selected} = this.props,
            show = index == selected,
            liCls = this.mergeClassName(styles.item, (show?styles.on:"")),
            btnCls = show?styles.btn_up:styles.btn_down;

        return(
            <li className={liCls}>
                <a className={styles.pro_list} onClick={this.itemClick}>
                    <i className={this.mergeClassName(styles.icon, styles[iconClass])}></i>
                    <span>{title}</span>
                    <i className={btnCls}></i>
                </a>
                <LazyLoad index={show?0:-1}>
                    <div className={styles.pro_outer}>
                        {this.props.children}
                    </div>
                </LazyLoad>
            </li>
        );
    }


}

module.exports = ToggleItem;
