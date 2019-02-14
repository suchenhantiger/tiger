import styles from './css/content.css';

class Content extends PureComponent {

    //默认属性值
    static defaultProps = {
        scroll:true,
        coverTop:false,
        coverBottom:true
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    renderStyle(){
        var {coverHeader, coverBottom} = this.props;
        return {
            top:coverHeader?"0":this.calculateRem(.9, 0)+"rem",
            bottom:coverBottom?"0":"1.2rem"
        }
    }

    render(){
        var {scroll, className} = this.props;

        return (
            <div className={this.mergeClassName(className, styles.content, scroll?styles.scroll:"")} style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    }

}

module.exports = Content;
