
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { scaleTime } from "d3-scale";
import React from "react";
import PropTypes from "prop-types";
import { last } from "react-stockcharts/lib/utils";
import { ChartCanvas, Chart,ZoomButtons } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
	CandlestickSeries,
	LineSeries,
	MACDSeries,
	BollingerSeries,
	RSISeries,
	StochasticSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
	PriceCoordinate
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider,discontinuousTimeScaleProviderBuilder,defaultScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip";
import { ema, sma, macd,rsi,stochasticOscillator,bollingerBand  } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";

function getMaxUndefined(calculators) {
	return calculators.map(each => each.undefinedLength()).reduce((a, b) => Math.max(a, b));
}

const macdAppearance = {
	stroke: {
		macd: "#FF0000",
		signal: "#00F300",
	},
	fill: {
		divergence: "#4682B4"
	},
};
const bbStroke = {
	top: "#964B00",
	middle: "#000000",
	bottom: "#964B00",
};

const bbFill = "#ffffff";

// rsi kdj===stochasticOscillator
class CandleStickChartPanToLoadMore extends React.Component {
	constructor(props) {
		super(props);
		const { data: inputData ,level,digits} = props;
		this._digits =digits;

		if(level>6)
			this._level =2;
		else
			this._level =1;
		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {d.ema20 = c;})
			.accessor(d => d.ema20);

		const ema10 = ema()
			.id(1)
			.options({ windowSize: 10 })
			.merge((d, c) => {d.ema10 = c;})
			.accessor(d => d.ema10);
		const ema5 = ema()
		.id(2)
		.options({ windowSize: 5 })
		.merge((d, c) => {d.ema5 = c;})
		.accessor(d => d.ema5);

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);
			const rsiCalculator6 = rsi()
			.options({ windowSize: 6 })
			.merge((d, c) => {d.rsi6 = c;})
			.accessor(d => d.rsi6);
			const rsiCalculator12 = rsi()
			.options({ windowSize: 12 })
			.merge((d, c) => {d.rsi12 = c;})
			.accessor(d => d.rsi12);
			const rsiCalculator24 = rsi()
			.options({ windowSize: 24 })
			.merge((d, c) => {d.rsi24 = c;})
			.accessor(d => d.rsi24);
	
			const fullSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
			.merge((d, c) => {d.fullSTO = c;})
			.accessor(d => d.fullSTO);
			// windowSize: 20,
			// // source: d => d.close, // "high", "low", "open", "close"
			// sourcePath: "close",
			// multiplier: 2,
			// movingAverageType: "sma"
			const bb = bollingerBand()
			.options({windowSize:20,multiplier:2})
			.merge((d, c) => {d.bb = c;})
			.accessor(d => d.bb);
		this._maxWindowSize = getMaxUndefined([
			ema20,
			ema10,ema5,
			macdCalculator,
			rsiCalculator6,rsiCalculator12,rsiCalculator24,fullSTO
		]);
	

		const dataToCalculate = inputData;
		const calculatedData = ema20(ema10(ema5(macdCalculator(bb(rsiCalculator12(rsiCalculator24(rsiCalculator6(fullSTO(dataToCalculate)))))))));
	
		const indexCalculator = discontinuousTimeScaleProviderBuilder().initialLevel(this._level).indexCalculator();
		const { index } = indexCalculator(calculatedData.slice(this._maxWindowSize));
        /* SERVER - END */
		const xScaleProvider = discontinuousTimeScaleProviderBuilder().initialLevel(this._level)
            .withIndex(index);
			// console.log(index);
		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(this._maxWindowSize));
        const start = xAccessor(last(linearData));
        const end = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
		   const xExtents = [start, end];

		//console.log(linearData);
		this.state = {
			ema20,ema10,
			ema5,bb,
			macdCalculator,rsiCalculator6,rsiCalculator12,rsiCalculator24,fullSTO,
			data: linearData,
			xScale,
            xAccessor, displayXAccessor,
            xExtents
		};
		this._upper0 = linearData.slice(0);
		this._under0 = [];
		this.handleDownloadMore = this.handleDownloadMore.bind(this);

	}

	updateOne=(newData)=>{
		const { data: prevData, ema20, ema10,ema5, macdCalculator,bb,rsiCalculator6,rsiCalculator12,rsiCalculator24,fullSTO} = this.state;
		if(prevData.length<this._maxWindowSize) return;
		const lastone = prevData[prevData.length-1];
		var tmpDataArr = [],widowsArr=prevData.slice(-this._maxWindowSize-1);	
		for(var i=0;i<widowsArr.length;i++){
			var tmpOne = {};
			tmpOne.open = widowsArr[i].open ;
			tmpOne.high = widowsArr[i].high;
			tmpOne.low = widowsArr[i].low;
			tmpOne.close = widowsArr[i].close;
			tmpOne.volume =widowsArr[i].volume;
			tmpDataArr.push(tmpOne);
		}
		var tmpLast = tmpDataArr[tmpDataArr.length-1];
		tmpLast.open = newData.open;
		tmpLast.close = newData.close;
		tmpLast.low = newData.low;
		tmpLast.high = newData.high;
		tmpLast.volume = newData.volume;
		const calculatedData = ema20(ema10(ema5(macdCalculator(bb(rsiCalculator12(rsiCalculator24(rsiCalculator6(fullSTO(tmpDataArr)))))))));
		
		Object.assign(lastone, tmpLast);
		this.setState({
			data: prevData.slice(0)
		});
	}

	addOne=(newData)=>{
		const { data: prevData, ema20, ema10,ema5, macdCalculator,bb,rsiCalculator6,rsiCalculator12,rsiCalculator24,fullSTO } = this.state;
		const lastone = prevData[prevData.length-1];
		if(prevData.length<this._maxWindowSize) return;
		var tmpDataArr = [],widowsArr=prevData.slice(-this._maxWindowSize);	
		for(var i=0;i<widowsArr.length;i++){
			var tmpOne = {};
			tmpOne.timestamp = widowsArr[i].timestamp;
			tmpOne.date = new Date(widowsArr[i].timestamp*1000);
			tmpOne.open = widowsArr[i].open ;
			tmpOne.high = widowsArr[i].high;
			tmpOne.low = widowsArr[i].low;
			tmpOne.close = widowsArr[i].close;
			tmpOne.volume =widowsArr[i].volume;
			tmpDataArr.push(tmpOne);
		}

		tmpDataArr.push(newData);
		var dataToCalculate = tmpDataArr;
		const calculatedData = ema20(ema10(ema5(macdCalculator(bb(rsiCalculator12(rsiCalculator24(rsiCalculator6(fullSTO(dataToCalculate)))))))));

		const indexCalculator = discontinuousTimeScaleProviderBuilder().initialLevel(this._level)
		.initialIndex(prevData[0].idx.index)
		.indexCalculator();
		var allData= prevData.concat(calculatedData.slice(-1));
		 const { index } = indexCalculator(allData);
// console.log(index);
		const xScaleProvider = discontinuousTimeScaleProviderBuilder().initialLevel(this._level)
		.initialIndex(prevData[0].idx.index)
			.withIndex(index);
		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(allData);
		// console.log(linearData);
		this.setState({
			data: linearData,
			xScale, xAccessor, displayXAccessor 
		});
	
	}



	handleDownloadMore(start, end,newdata) {
		if (Math.ceil(start) === end) return;
		const { data: prevData, ema20, ema10,ema5, macdCalculator,bb,rsiCalculator6,rsiCalculator12,rsiCalculator24,fullSTO } = this.state;
		const dataToCalculate = newdata.slice(0,-prevData.length);
		const calculatedData = ema20(ema10(ema5(macdCalculator(bb(rsiCalculator12(rsiCalculator24(rsiCalculator6(fullSTO(dataToCalculate)))))))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder().initialLevel(this._level)
			.initialIndex(prevData[0].idx.index-calculatedData.length+this._maxWindowSize)
			.indexCalculator();
		const { index } = indexCalculator(calculatedData.slice(this._maxWindowSize).concat(prevData));
		// console.log(index);
		const xScaleProvider = discontinuousTimeScaleProviderBuilder().initialLevel(this._level)
			.initialIndex(prevData[0].idx.index-calculatedData.length+this._maxWindowSize)
			.withIndex(index);
		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(this._maxWindowSize).concat(prevData));		
		//console.log(linearData.slice(0).concat(prevData));
		this.setState({
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		});
		
		//---success
		// if (Math.ceil(start) === end) return;
		// const { data: prevData, ema26, ema12, macdCalculator } = this.state;
		// const dataToCalculate = newdata.slice(0,-prevData.length);
		// const calculatedData = ema26(ema12(macdCalculator(dataToCalculate)));
		// const indexCalculator = discontinuousTimeScaleProviderBuilder()
		// 	.initialIndex(prevData[0].idx.index-calculatedData.length+this._maxWindowSize)
		// 	.indexCalculator();
		// const { index } = indexCalculator(calculatedData.slice(this._maxWindowSize).concat(prevData));
		// // console.log(index);
		// const xScaleProvider = discontinuousTimeScaleProviderBuilder()
		// 	.initialIndex(prevData[0].idx.index-calculatedData.length+this._maxWindowSize)
		// 	.withIndex(index);
		// const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(this._maxWindowSize).concat(prevData));		
		// //console.log(linearData.slice(0).concat(prevData));
		// this.setState({
		// 	data: linearData,
		// 	xScale,
		// 	xAccessor,
		// 	displayXAccessor
		// });
    }

    

    
	render() {
		const { width, ratio ,fullscreen,height=250,index1=1,index2=0} = this.props;
        const { data, ema20,ema5,xExtents, ema10, macdCalculator, xScale, xAccessor, displayXAccessor } = this.state;
        // const height = 250;

        var margin = {left: 5, right: 20, top: 2, bottom: 30 };
        var gridHeight = height - margin.top - margin.bottom;
        var gridWidth = width - margin.left - margin.right;

        var yGrid = { 
            innerTickSize: -1 * gridWidth,
            tickStrokeDasharray: 'ShortDot',
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
        };
        var xGrid ={ 
            innerTickSize: -1 * gridHeight,
            tickStrokeDasharray: 'ShortDot',
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
		};

		
		
		return (
            <div style={{height:"100%"}}>
			<ChartCanvas 
                    ratio={ratio} 
                    width={width} 
                    height={height}
					margin={{ left: 5, right: 45, top: 5, bottom: 10 }} type={"hybrid"}
					seriesName="MSFT"
                    data={data}
                    xExtents={xExtents}
                    xScale={xScale}
                    onLoadMore={this.props.loadMore}
					xAccessor={xAccessor} 
					displayXAccessor={displayXAccessor}>
				<Chart id={1} height={170}
						yExtents={[d => [d.high, d.low], ema20.accessor(), ema10.accessor(), ema5.accessor()]}
						padding={{ top: 0, bottom: 10 ,left:10}}>
					<XAxis fontSize={10} stroke="#999"   tickStroke="#999"  {...xGrid} axisAt="bottom" orient="bottom" showTicks={true} ticks={8} />
					<YAxis fontSize={10} tickStroke="#999"  zoomEnabled={false} {...yGrid} axisAt="right" orient="right" showTicks={true} ticks={5}  />

					<CandlestickSeries 
				fill={(d)=>{
					return d.close > d.open ? "#FF0000"  :"#6BA583" ;
				}}
					/>
					{index1==0?
					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					:null
					}
					{index1==0?
						<LineSeries yAccessor={ema10.accessor()} stroke={ema10.stroke()}/>
						:null
						}
						
						{index1==0?
						<LineSeries yAccessor={ema5.accessor()} stroke={ema5.stroke()}/>
						:null
						}
					{index1==0?
						<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
						:null
						}
					{index1==0?
						<CurrentCoordinate yAccessor={ema10.accessor()} fill={ema10.stroke()} />
						:null
						}
						{index1==0?
						<CurrentCoordinate yAccessor={ema5.accessor()} fill={ema5.stroke()} />
						:null
						}
					{index1==1?
						<BollingerSeries yAccessor={d => d.bb}
						stroke={bbStroke}
						fill={bbFill} />
						:null
						}

					
					
					
					<EdgeIndicator 
					fontSize={10} itemType="last" orient="right" edgeAt="right"
					rectHeight= {15}
					rectWidth= {30}
					arrowWidth= {1}
					displayFormat={format("."+this._digits+"f")}
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#FF0000"  : "#6BA583"}/>

					{/* <PriceCoordinate
						at="right"
						orient="right"
						price={1244.8}
						stroke="#3490DC"
						strokeWidth={1}
						fill="#FFFFFF"
						textFill="#22292F"
						rectHeight= {15}
						rectWidth= {30}
						arrowWidth= {1}
						strokeDasharray="Solid"
						displayFormat={format(".2f")}
					/> */}
				</Chart>
				{fullscreen && index2==0 ?<Chart id={2} height={60}
						yExtents={macdCalculator.accessor()}
						origin={(w, h) => {return [0, h-60]}} padding={{ top: 5, bottom: 5 }} >
					<YAxis axisAt="right" ozoomEnabled={false} rient="right" ticks={2} />

					{/* <MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} /> */}
					{/* <MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} /> */}

					<MACDSeries yAccessor={d => d.macd}
					
						{...macdAppearance} widthRatio={0.99}/>
				
					{/* <MACDTooltip
						origin={[-38, 15]}
						yAccessor={d => d.macd}
						options={macdCalculator.options()}
						appearance={macdAppearance}
						/> */}
				</Chart>:null}
				{fullscreen && index2>0?<Chart id={3} 
								yExtents={[0, 100]}
								height={60} origin={(w, h) => [0, h - 60]}
								padding={{ top: 5, bottom: 5 }}  >
					<YAxis axisAt="right" ozoomEnabled={false} rient="right" ticks={2} />

				
				
						

						 {index2==2?
						<StochasticSeries	yAccessor={d => d.fullSTO}
						// {...stoAppearance}
						 />:null}
					
					{index2==1?
					<RSISeries stroke= 
					{{
						line: "#000000",
						top: "#B8C2CC",
						middle: "#8795A1",
						bottom: "#B8C2CC",
						outsideThreshold: "#ff3333",
						insideThreshold: "#ff3333"
					}} yAccessor={d => d.rsi6} />
						:null}
						{index2==1?<RSISeries stroke= {{
								line: "#000000",
								top: "#B8C2CC",
								middle: "#8795A1",
								bottom: "#B8C2CC",
						outsideThreshold: "#33ff33",
						insideThreshold: "#33ff33"
					}} yAccessor={d => d.rsi12} />

						:null}
						{index2==1?
								
					<RSISeries stroke= {{
						line: "#000000",
						top: "#B8C2CC",
						middle: "#8795A1",
						bottom: "#B8C2CC",
				outsideThreshold: "#3333ff",
				insideThreshold: "#3333ff"
			}} yAccessor={d => d.rsi24} /> 
						:null}
					
			

				</Chart>:null}

			</ChartCanvas>
			<div style={{fontSize: ".2rem",position: "absolute",top: ".4rem",left: "45%"}}>
					{index1==0?"MA(5,10,20)":"BOLL(20,2)"}
			</div>
            </div>
		);
	}
}

CandleStickChartPanToLoadMore.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartPanToLoadMore.defaultProps = {
	type: "hybrid",
};

CandleStickChartPanToLoadMore = fitWidth(CandleStickChartPanToLoadMore);

export default CandleStickChartPanToLoadMore;
