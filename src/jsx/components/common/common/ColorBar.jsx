import styles from './css/ColorBar.css';
import FullScreenView from '../fullscreen/FullScreenView';

class ColorBar extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    renderUi(){
      let list=[];
        let {colors,nums} = this.props;
        let numSum = 0;

        for(let i=0;i<nums.length;i++){
          numSum +=parseInt(nums[i]);
        }
        for(let i=0;i<nums.length;i++){
          console.log(numSum+'ColorBarColorBarColorBarColorBar----------------------'+nums[i]);
           let divwidth = nums[i]/numSum*100+'%';
          list.push(
            <div style={{width:divwidth,height:'100%',backgroundColor:colors[i],display:"inline-block"}}> </div>
          );
        }
        return list;

    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ColorBar render");

        var {colors,nums} = this.props;

        return (

                <div className={styles.baroutbox} >
                  {this.renderUi()}
                </div>

        );
    }

}

module.exports = ColorBar;
