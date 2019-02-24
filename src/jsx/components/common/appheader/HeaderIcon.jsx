import styles from './css/headerIcon.css';

class HeaderIcon extends PureComponent{

    constructor(props) {
        super(props);
    }

    render(){
        systemApi.log("HeaderIcon render");

        var {iconCls,onClick,theme} = this.props,
            icoCls = this.mergeClassName(styles.ico, iconCls, styles[theme]);
 
        return (
            <a className={icoCls} onClick={onClick}>
              {this.props.children}
            </a>
        );
    }

}

module.exports = HeaderIcon;
