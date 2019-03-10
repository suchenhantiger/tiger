
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
import { ema, sma, macd } from "react-stockcharts/lib/indicator";
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
//kdj rsi
class CandleStickChartPanToLoadMore extends React.Component {
	constructor(props) {
		super(props);
		const { data: inputData ,level} = props;
		if(level>6)
			this._level =2;
		else
			this._level =1;
		const ema26 = ema()
			.id(0)
			.options({ windowSize: 26 })
			.merge((d, c) => {d.ema26 = c;})
			.accessor(d => d.ema26);

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d, c) => {d.ema12 = c;})
			.accessor(d => d.ema12);

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);
		this._maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator
		]);
	

		const dataToCalculate = inputData;
		const calculatedData = ema26(ema12(macdCalculator(dataToCalculate)));
	
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
			ema26,
			ema12,
			macdCalculator,
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
		const { data: prevData, ema26, ema12, macdCalculator } = this.state;
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
		const calculatedData = ema26(ema12(macdCalculator(tmpDataArr)));
		Object.assign(lastone, tmpLast);
		this.setState({
			data: prevData.slice(0)
		});
	}

	addOne=(newData)=>{
		const { data: prevData, ema26, ema12, macdCalculator } = this.state;
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
		const calculatedData = ema26(ema12(macdCalculator(dataToCalculate)));

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
		const { data: prevData, ema26, ema12, macdCalculator } = this.state;
		const dataToCalculate = newdata.slice(0,-prevData.length);
		const calculatedData = ema26(ema12(macdCalculator(dataToCalculate)));
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
		const { width, ratio ,fullscreen} = this.props;
        const { data, ema26,xExtents, ema12, macdCalculator, xScale, xAccessor, displayXAccessor } = this.state;
        const height = 250;

        var margin = {left: 5, right: 40, top: 20, bottom: 30 };
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
// console.log(data);
		return (
            <div style={{height:"100%"}}>
			<ChartCanvas 
                    ratio={ratio} 
                    width={width} 
                    height={fullscreen?255:210}
					margin={{ left: 5, right: 45, top: 5, bottom: 10 }} type={"hybrid"}
					seriesName="MSFT"
                    data={data}
                    xExtents={xExtents}
                    xScale={xScale}
                    onLoadMore={this.props.loadMore}
					xAccessor={xAccessor} 
					displayXAccessor={displayXAccessor}>
				<Chart id={1} height={170}
						yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
						padding={{ top: 0, bottom: 10 ,left:10}}>
					<XAxis fontSize={10} stroke="#999"   tickStroke="#999"  {...xGrid} axisAt="bottom" orient="bottom" showTicks={true} ticks={8} />
					<YAxis fontSize={10} tickStroke="#999"  zoomEnabled={false} {...yGrid} axisAt="right" orient="right" showTicks={true} ticks={5}  />

					<CandlestickSeries 
					/>
					<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
					<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

					<CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
					<CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

					<EdgeIndicator fontSize={10} itemType="last" orient="right" edgeAt="right"
					rectHeight= {15}
					rectWidth= {30}
					arrowWidth= {1}
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

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
				{fullscreen?<Chart id={2} height={60}
						yExtents={macdCalculator.accessor()}
						origin={(w, h) => {console.log(w);console.log(h);return [0, h-60]}} padding={{ top: 5, bottom: 5 }} >
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

			</ChartCanvas>
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
