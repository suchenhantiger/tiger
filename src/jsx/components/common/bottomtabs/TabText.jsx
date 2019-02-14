import styles from './css/tab.css';

class TabText extends PureComponent{

    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {onClick} = this.props;
        if(onClick){
            onClick();
        }
    }

    render(){

        systemApi.log("TabText render");

        var {style,theme,iconClass,text} = this.props,
            linkClass = this.mergeClassName(styles[iconClass], styles.link);

        return(
            <div className={this.mergeClassName(styles.fticon, styles[theme])} style={style} onClick={this.itemClick}>
                <span className={linkClass}>
                    <div className={styles.tabIcon}></div>
                    <span>{text}</span>
                </span>
            </div>
        );

    }

}

module.exports = TabText;
