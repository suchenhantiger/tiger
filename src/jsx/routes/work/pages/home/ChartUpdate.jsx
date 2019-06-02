
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
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProviderBuilder,defaultScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip";
import { ema, sma, macd } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";

function getMaxUndefined(calculators) {
	return calculators.map(each => each.undefinedLength()).reduce((a, b) => Math.max(a, b));
}
const LENGTH_TO_SHOW = 180;

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
		const { data: inputData } = props;
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

		const smaVolume50 = sma()
			.id(3)
			.options({
				windowSize: 50,
				sourcePath: "volume",
			})
			.merge((d, c) => {d.smaVolume50 = c;})
			.accessor(d => d.smaVolume50);

		const maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator,
			smaVolume50
		]);
        /* SERVER - START */
  // console.log(macdCalculator.option);
		const dataToCalculate = inputData.slice(-LENGTH_TO_SHOW - maxWindowSize);

		const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder().indexCalculator();

		// console.log(inputData.length, dataToCalculate.length, maxWindowSize)
		const { index } = indexCalculator(calculatedData);
        /* SERVER - END */
    //    console.log(calculatedData);
      //  console.log(index);
      //  console.log(LENGTH_TO_SHOW);
      //  console.log(maxWindowSize);
		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
            .withIndex(index);
     
		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-LENGTH_TO_SHOW));
        // console.log(linearData);
        // console.log(xScale);
        // console.log(xAccessor);
        // console.log(displayXAccessor);
		// console.log(head(linearData), last(linearData))
		// console.log(linearData.length)
        const start = xAccessor(last(linearData));
        const end = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
       const xExtents = [start, end];

		this.state = {
			ema26,
			ema12,
			macdCalculator,
			smaVolume50,
			linearData,
			data: linearData,
			xScale,
            xAccessor, displayXAccessor,
            xExtents
		};
        this.handleDownloadMore = this.handleDownloadMore.bind(this);
        this._addtime=1;
	}
	handleDownloadMore(start, end) {
     //   console.log("loadmore "+start+" "+end);
		if (Math.ceil(start) === end) return;
		// console.log("rows to download", rowsToDownload, start, end)
		const { data: prevData, ema26, ema12, macdCalculator, smaVolume50 } = this.state;
		const { data: inputData } = this.props;


		if (inputData.length === prevData.length) return;

		const rowsToDownload = end - Math.ceil(start);

		const maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator,
			smaVolume50
		]);

		/* SERVER - START */
		const dataToCalculate = inputData
			.slice(-rowsToDownload - maxWindowSize - prevData.length, - prevData.length);

		const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.indexCalculator();
		const { index } = indexCalculator(
			calculatedData
				.slice(-rowsToDownload)
				.concat(prevData));
		/* SERVER - END */
 
		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.withIndex(index);

		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));
 const start2 = xAccessor(last(linearData));
 const end2 = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
const xExtents = [start2, end2];
		// console.log(linearData.length)
		setTimeout(() => {
			// simulate a lag for ajax
			this.setState({
				data: linearData,
				xScale,
				xAccessor,
				displayXAccessor,xExtents
			});
		}, 300);
    }

    addNew=()=>{

		// console.log("rows to download", rowsToDownload, start, end)
		const { data: prevData, ema26, ema12, macdCalculator, smaVolume50 } = this.state;
		const { data: inputData } = this.props;




		const rowsToDownload = end - Math.ceil(start);

		const maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator,
			smaVolume50
		]);

        /* SERVER - START */
        var time = _addtime*60+1545283560000;
        _addtime++;
        var  dataToCalculate = [{"date":new Date(time) ,"open":1244.795,
        "low":1244.645,"high":1244.825,"close":1244.645,
        "volume":0,"position":0,"split": "","dividend":""}];
        

		const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.indexCalculator();
		const { index } = indexCalculator(
			calculatedData
				.slice(-rowsToDownload)
				.concat(prevData));
		/* SERVER - END */
 
		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.withIndex(index);

		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));
 const start2 = xAccessor(last(linearData));
 const end2 = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
const xExtents = [start2, end2];
		// console.log(linearData.length)
		setTimeout(() => {
			// simulate a lag for ajax
			this.setState({
				data: linearData,
				xScale,
				xAccessor,
				displayXAccessor,xExtents
			});
		}, 300);
    }
    

    
	render() {
		const { type, width, ratio } = this.props;
        const { data, ema26,xExtents, ema12, macdCalculator, smaVolume50, xScale, xAccessor, displayXAccessor } = this.state;
        var showGrid = true;
        const height = 300;

        var margin = {left: 5, right: 40, top: 20, bottom: 30 };
        var gridHeight = height - margin.top - margin.bottom;
        var gridWidth = width - margin.left - margin.right;

        var yGrid = showGrid ? { 
            innerTickSize: -1 * gridWidth,
            tickStrokeDasharray: 'Solid',
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
        } : {};
        var xGrid = showGrid ? { 
            innerTickSize: -1 * gridHeight,
            tickStrokeDasharray: 'Solid',
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
        } : {};
// console.log(xScale);
// console.log(xAccessor);
// console.log(displayXAccessor());
// console.log(xAccessor());
// const start = xAccessor(last(data));
// const end = xAccessor(data[Math.max(0, data.length - 150)]);
		return (
            <div>
			<ChartCanvas 
                    ratio={ratio} 
                    width={width} 
                    height={200}
					margin={{ left: 5, right: 45, top: 20, bottom: 30 }} type={type}
					seriesName="MSFT"
                    data={data}
                    xExtents={xExtents}
                    xScale={xScale}
                    onLoadMore={this.handleDownloadMore}
					xAccessor={xAccessor} 
					displayXAccessor={displayXAccessor}>
				<Chart id={1} height={150}
						yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
						padding={{ top: 10, bottom: 20 }}>
					<XAxis fontSize={10} opacity={0.5}   {...xGrid} axisAt="bottom" orient="bottom" showTicks={true} ticks={8} outerTickSize={0} />
					<YAxis fontSize={10} zoomEnabled={false} {...yGrid} axisAt="right" orient="right" ticks={5} />
                    {/* <ZoomButtons 
						onReset={this.handleReset}
					/> */}
					{/* <MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} /> */}

					<CandlestickSeries />
					<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
					<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

					<CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
					<CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

					<EdgeIndicator fontSize={10} itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

					{/* <OHLCTooltip origin={[-40, 0]}/> */}
					{/* <MovingAverageTooltip
						onClick={(e) => console.log(e)}
						origin={[-38, 15]}
						options={[
							{
								yAccessor: ema26.accessor(),
								type: ema26.type(),
								stroke: ema26.stroke(),
								...ema26.options(),
							},
							{
								yAccessor: ema12.accessor(),
								type: ema12.type(),
								stroke: ema12.stroke(),
								...ema12.options(),
							},
						]}
						/> */}
				</Chart>
				{/* <Chart id={2} height={150}
						yExtents={[d => d.volume, smaVolume50.accessor()]}
						origin={(w, h) => [0, h - 300]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
					<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
				</Chart> */}
				{/* <Chart id={3} height={70}
						yExtents={macdCalculator.accessor()}
						origin={(w, h) => [0, h - 70]} padding={{ top: 10, bottom: 10 }} >
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={2} />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<MACDSeries yAccessor={d => d.macd}
						{...macdAppearance} />
					<MACDTooltip
						origin={[-38, 15]}
						yAccessor={d => d.macd}
						options={macdCalculator.options()}
						appearance={macdAppearance}
						/>
				</Chart> */}
				{/* <CrossHairCursor /> */}
			</ChartCanvas>

            <div onClick={this.addNew} style={{height:"20px"}}>增加新数据 </div>
            </div>
		);
	}
}

/*

*/

CandleStickChartPanToLoadMore.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartPanToLoadMore.defaultProps = {
	type: "svg",
};

CandleStickChartPanToLoadMore = fitWidth(CandleStickChartPanToLoadMore);

export default CandleStickChartPanToLoadMore;
