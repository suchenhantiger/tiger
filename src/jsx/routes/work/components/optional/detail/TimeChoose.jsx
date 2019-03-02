// import styles from './css/K_chart.less';

class TimeChoose extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = (tl)=>()=>{
        var {onChoose,timeL}=this.props;
        if(timeL!=tl)
            onChoose && onChoose(tl);
    }

    //渲染函数
    render(){

         var {timeL,fullscreen} = this.props;
        let liSty= {color: "#999",
            textAlign: "center",
            float: "left",
            lineHeight: "0.3rem",
            width: "11.11%",
            fontSize: "0.2rem"},
            liStyOn={color: "#333",
            textAlign: "center",
            float: "left",
            width: "11.11%",
            lineHeight: "0.3rem",
            fontSize: "0.2rem"};

        return(
            <div  style={fullscreen?{height:"5%",borderBottom: "1px solid #ccc"}:{height: "0.3rem", borderBottom: "1px solid #ccc"}}>
                        <ul >
                            <li onClick={this.itemClick(1)} style={timeL==1?liStyOn:liSty}>1分</li>
                            <li onClick={this.itemClick(2)} style={timeL==2?liStyOn:liSty}>5分</li>
                            <li onClick={this.itemClick(3)} style={timeL==3?liStyOn:liSty}>15分</li>
                            <li onClick={this.itemClick(4)} style={timeL==4?liStyOn:liSty}>30分</li>
                            <li onClick={this.itemClick(5)} style={timeL==5?liStyOn:liSty}>1时</li>
                            <li onClick={this.itemClick(6)} style={timeL==6?liStyOn:liSty}>4时</li>
                            <li onClick={this.itemClick(7)} style={timeL==7?liStyOn:liSty}>日</li>
                            <li onClick={this.itemClick(8)} style={timeL==8?liStyOn:liSty}>周</li>
                            <li onClick={this.itemClick(9)} style={timeL==9?liStyOn:liSty}>月</li>
                        </ul>
                    </div>
        );
    }

}

module.exports = TimeChoose;
