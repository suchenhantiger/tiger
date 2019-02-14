import IScroll from '../../../lib/iscroll';

import styles from './css/carouselselectitem.css';

const ITEM_HEIGHT = 30;


class CarouselSelectItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //阻止默认行为
    preDft = (e)=>{
        e.preventDefault();
    }

    getIndex(data, value){
        for(var i=0;i<data.length;i++){
            if(data[i].value == value) return i;
        }
        return 0;
    }

    position(data, value){
        var index = this.getIndex(data, value);
        if(this.wrapper){
            this.wrapper.scrollTo(0,-index*ITEM_HEIGHT);
        }
    }

    componentDidMount(){
        var that = this,
            {main} = this.refs,
            {data, value, onChange} = this.props;

        //修复Android机子滚送问题
        main.addEventListener('touchmove', this.preDft, false);

        this.wrapper = new IScroll(this.refs.main,{
            useTransition: false, /* 此属性不知用意，本人从true改为false */
			      probeType: 2,
            scrollbars:false,
            click:true,
            bounce:false
        });

        this.wrapper.on("scrollEnd",function(){
            var {data} = that.props,
                curIndex = Math.round(-this.y/ITEM_HEIGHT);
            curIndex = curIndex<0?0:curIndex;
            onChange && onChange(data[curIndex].value, curIndex);
            if(this.y == -curIndex*ITEM_HEIGHT) return;
            this.scrollTo(0,-curIndex*ITEM_HEIGHT,200);
        });

        this.wrapper.on("scrollCancel",function(){
            var {data} = that.props,
                curIndex = Math.round(-this.y/ITEM_HEIGHT);
            curIndex = curIndex<0?0:curIndex;
            if(this.y == -curIndex*ITEM_HEIGHT) return;
            this.scrollTo(0,-curIndex*ITEM_HEIGHT,200);
        });

        this.position(data, value);
    }

    componentWillReceiveProps(nextProps){
        this.position(nextProps.data, nextProps.value);
    }

    componentDidUpdate(){
        if(this.wrapper){
            this.wrapper.refresh();
        }

    }

    componentWillUnmount(){
        var {main} = this.refs;
        main.removeEventListener('touchmove', this.preDft);
        if(this.wrapper){
            this.wrapper.destroy();
        }
    }

    renderItems(data){
        return data.map((item)=>{
            return <div className={styles.item}>{item.text}</div>
        })
    }

    //渲染函数
    render(){

        var {width, data} = this.props;

        return(
            <div ref="main" className={styles.main} style={{width}}>
                <div className={styles.frame}>
                    <div className={styles.blank}></div>
                    {this.renderItems(data)}
                    <div className={styles.blank}></div>
                </div>
                <div className={styles.upMask}></div>
                <div className={styles.downMask}></div>
            </div>
        );
    }


}

module.exports = CarouselSelectItem;
