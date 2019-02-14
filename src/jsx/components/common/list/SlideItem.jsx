
import styles from './css/slideItem.css';

class SlideItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            x:0,
            animate:false
        }
    }

    componentWillMount(){
        this.resetParam(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.resetParam(nextProps);
    }

    //重设参数
    resetParam(props){
        var {icons} = props;
        this._max = -66*icons.length;
        this.iconList = [];
        this.itemList = [];
        React.Children.forEach(icons,(icon,index)=>{
            this.iconList.push(React.cloneElement(icon,{
                iconBack:this.iconBack
            }));
        });
        React.Children.forEach(props.children, (item,index)=>{
            var {onClick} = item.props;

            this.itemList.push(React.cloneElement(item,{
                onClick:this.itemClick(onClick)
            }));
        })
    }

    itemClick = (onClick)=>{
        var that = this;
        return function(){

            if(that.state.x != 0){
                that.iconBack();
            }
            else{

                var args = Array.prototype.slice.call(arguments,0);
                if(onClick){
                    onClick.apply(null,args);
                }
            }
        }
    }

    //图标缩回
    iconBack = ()=>{
        this.setState({
            x:0,
            animate:true
        });
        setTimeout(()=>{
            this.setState({
                animate:false
            });
        },200);
    }

    //滑动开始
    touchStart = (e)=>{
        var touch = e.touches[0];
        this._startX = touch.pageX; //记录滑动起点
        this._startY = touch.pageY; //记录滑动起点
        this._fixX = this.state.x;  //记录本次滑动初始偏移量
        this._first = true;         //标记是否是滑动的第一个点
        this._move = false;         //true：item滑动；false：不滑动
        this._lastX = this._startX;
        this._slideDirection = "right";
    }

    //滑动回调
    touchMove = (e)=>{
        var touch = e.touches[0],
            {pageX,pageY} = touch,
            deltaY = pageY - this._startY,
            deltaX = pageX - this._startX;

        //滑动的第一个点时判断是要显示右侧图标还是上下拉刷新
        if(this._first){
            this._move = Math.abs(deltaX)>Math.abs(deltaY)?true:false;
            this._first = false;
        }

        if(this._move){
            var xc = this._fixX + deltaX;
            if(xc < this._max){
                xc = this._max;
            }
            else if(xc > 0){
                xc = 0;
            }
            this.setState({
                x:xc,
                animate:false
            });
            this._slideDirection = pageX>this._lastX?"right":"left";
            this._lastX = pageX;
            e.stopPropagation();
        }

    }

    touchEnd = (e)=>{
        if(this._move){
            var xc = this._slideDirection=="right"?0:this._max;
            this.setState({
                x:xc,
                animate:true
            });
            setTimeout(()=>{
                this.setState({
                    animate:false
                });
            },200)
            e.stopPropagation();
        }
        this._move = false;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SlideItem render");

        var {x,animate} = this.state,
            style = {
              transform:"translateX("+x+"px)",
              MsTransform:"translateX("+x+"px)", 	/* IE */
              MozTransform:"translateX("+x+"px)", 	/* Firefox */
              WebkitTransform:"translateX("+x+"px)", /* Safari 和 Chrome */
              OTransform:"translateX("+x+"px)"
            };

            if(animate){
                 style = Object.assign(style,{
                     WebkitTransition:"-webkit-transform 0.2s",
                     transition:"transform 0.2s",
                     MsTransition:"-ms-transform 0.2s", 	/* IE 9 */
                     MozTransition:"-moz-transform 0.2s", 	/* Firefox */
                     OTransition:"-o-transform 0.2s"
                 });
             }



        return(
            <li className={styles.li} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} >
                <div className={styles.mot_inner03}>
                    {this.iconList}
                </div>
                <div className={styles.box} style={style}>
                    {this.itemList}
                </div>
            </li>
        );
    }


}

module.exports = SlideItem;
