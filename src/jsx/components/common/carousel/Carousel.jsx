import SwipeableViews from 'react-swipeable-views';
import autoPlay from 'react-swipeable-views/lib/autoPlay';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

import styles from './css/carousel.css';

/**************图片轮播图****************/
class Carousel extends PureComponent{

    /**
    * picList:[{
    *        url:"xxx"
    *    },{
    *        url:"xxx"
    *    }]
     */
    static defaultProps = {
        picList:[],
        autoplay:false,
        interval:5000
    }

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0
        }
    }

    handleChange = (index)=>{
        this.setState({index});
    }



    renderItems(){
        var list = [],
            {picList,itemClick} = this.props;
        for(var i=0;i<picList.length;i++){
            var item = picList[i],
                style = {
                     backgroundImage:"url("+systemApi.getValue("rootUrl")+item.imgurl+")"
                };
            list.push(<div className={styles.listItem} key={i} style={style} onClick={itemClick(item.activityurl)}></div> );
        }

        return list;
    }

    renderDotList(){
        var {picList} = this.props,
            {index} = this.state,
            dotList = [];

        for(var i=0;i<picList.length;i++){
            if(i == index){
                dotList.push(<li key={i} className={styles.on}>&nbsp;</li>);
            }
            else{
                dotList.push(<li key={i}>&nbsp;</li>);
            }
        }

        return(
            <ul className={styles.ul_focus}>
                {dotList}
            </ul>
        );
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Carousel render");

        var {index} = this.state,
            {autoplay,interval} = this.props;

        return(
            <div className={styles.top_imgs}>
                <AutoPlaySwipeableViews
                    index={index}
                    autoplay={autoplay}
                    interval={interval}
                    onChangeIndex={this.handleChange}>
                    {this.renderItems()}
                </AutoPlaySwipeableViews>
                {this.renderDotList()}
            </div>
        );
    }


}

module.exports = Carousel;
