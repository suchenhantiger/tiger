import styles from './css/fullScreenView.css';

class FullScreenView extends PureComponent{

    static defaultProps = {
        transparent:false,
        mask:false,
        show:true,
        isAbs:false
    }

    constructor(props,context) {
        super(props,context);
    }

    //判断是否有状态变化，如果没有不重绘
    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentDidMount(){
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount(){
        this.unrenderLayer();
    }

    //卸载DOM
    unrenderLayer(){
        if(!this.layer){
            return;
        }
        ReactDOM.unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        $("body").removeClass("hidden");
        this.layer = null;
    }

    getFullViewCls(){
        var {transparent,mask,lightMask,show,bgcolor,zindex, isAbs} = this.props;

        return this.mergeClassName(styles.frame, transparent?styles.transparent:"", mask?styles.mask:"", lightMask?styles.lightMask:"", !show?styles.hidden:"",bgcolor?styles[bgcolor]:"",zindex?styles[zindex]:"", isAbs?styles.isabs:"");
    }

    onShadowClick=()=>{
      //返回前一路由
      var {backHash, onBackClick} = this.props;
      if(backHash){
          hashHistory.push(backHash);
      }
      else if(onBackClick){
          onBackClick();
      }
      else{
          hashHistory.goBack();
      }
    }
    //渲染DOM
    renderLayer(){

        var {transparent,mask,shadowclick,overflowvalue} = this.props,
        overflowvalue=overflowvalue||'auto';
        if(!this.layer){
            this.layer = $("<div/>")[0];
            $("body").append(this.layer);
        }

        var layerElement = (
            <div className={this.getFullViewCls()} style={{"overflow":overflowvalue}} onClick={shadowclick?this.onShadowClick:''}>
                {this.props.children}
            </div>
        );
        //装载DOM
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this,layerElement,this.layer);
        $("body").addClass("hidden");
    }

    render(){
        systemApi.log("FullScreenView render");
        return null;
    }

}

module.exports = FullScreenView;
