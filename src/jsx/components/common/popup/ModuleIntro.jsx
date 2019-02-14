import styles from './css/moduleintro.css';

class ModuleIntro extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            index:0
        }
    }

    onClose = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //下一页
    nextPic = ()=>{
        var {index} = this.state;
        this.setState({index:index+1});
    }

    renderIntro(){
        var {index} = this.state,
            {data} = this.props;

        if(data.length>0 && index<data.length){
            var imgurl = data[index];
            return (
                <div className={styles.intro}>
                    <img src={imgurl} onClick={index<data.length-1?this.nextPic:this.onClose} />
                </div>
            )
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ModuleIntro render");
        return(
            <div className={styles.moduleintro_frame}>
               {this.renderIntro()}
            </div>
        );
    }

}

module.exports = ModuleIntro;
