import styles from './css/emptyFrame.less';
class EmptyFrame extends PureComponent {
  //默认属性值
  static defaultProps = {
    imgSrc:"./images/trade/img_placeholder01.png"
};
    //构造函数
    constructor(props) {
        super(props);

    }

    btnClick=()=>{
        var {btnClick} = this.props;

        btnClick && btnClick();
    }

    //渲染函数
    render() {

        var {imgSrc,detail,btnText,btnClick} = this.props;

       
        return (
            
                <div className={styles.placeholder_box}>
                    <p className={styles.pl_img}><img src={imgSrc}/> </p>
                    <p className={this.mergeClassName("mg-bt-30", "c9")}>{detail}</p>
                    <p></p>{btnText?<div className={styles.copy_btn}><button onClick={this.btnClick} >{btnText}</button></div>:null}<p></p>
                </div>
        );
    }

}

module.exports = EmptyFrame;
