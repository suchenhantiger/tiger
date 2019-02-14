class StarRatingComponent extends PureComponent{
    static defaultProps = {
        editing:true
    }
        //构造函数
        constructor(props) {
            super(props);
            this.state={
                starCount:props.starCount,
                value:props.value,



            }
        }

        clickStar=(i)=>()=>{
            var {onStarClick,name,editing}=this.props;

            if(editing){
                this.setState({value:i+1});
                onStarClick && onStarClick(i,i+1,name);
            }
                
        }
       // float: right;
      //  cursor: pointer;

        renderStar=()=>{
            var {starCount,value}=this.state;
            var list = [];
            for(var i=0;i<starCount;i++){
                let element = <label 
                                onClick={this.clickStar(i)} 
                                style={i<value?
                                        {paddingRight:"0.05rem",fontSize:"0.43rem",color:"rgb(255, 180, 0)"}:
                                        {paddingRight:"0.05rem",fontSize:"0.43rem",color:"rgb(187, 187, 187)"}}>
                                    <i style={{fontStyle: "normal"}}>★</i>
                                </label>;
                list.push(element)
            }
            return list;
        }
    //onStarClick
        //渲染函数
        render(){
            //打印渲染日志，必写
            systemApi.log("StarRatingComponent render");

            return(
                <div style={{display: "inlineBlock", position: "relative"}}>
                    {this.renderStar()}
                </div>
            );
        }
    
    
    }
    
    module.exports = StarRatingComponent;