import styles from './css/headerText.css';

class HeaderText extends PureComponent{

    constructor(props) {
        super(props);
    }

    render(){
        systemApi.log("HeaderText render");

        var {onClick, theme, text} = this.props,
            icoCls = this.mergeClassName(styles.text, styles[theme]);

        return (
            <a className={icoCls} onClick={onClick}>{text}</a>
        );
    }

}

module.exports = HeaderText;
