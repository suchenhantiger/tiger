
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

import { discontinuousTimeScaleProviderBuilder,defaultScaleProvider } from "react-stockcharts/lib/scale";
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
		const dataToCalculate = inputData;

		const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder().indexCalculator();

		// console.log(inputData.length, dataToCalculate.length, maxWindowSize)
		const { index } = indexCalculator(calculatedData);
        /* SERVER - END */
		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
            .withIndex(index);
     
		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(maxWindowSize));
        const start = xAccessor(last(linearData));
        const end = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
	   const xExtents = [start, end];
	//    console.log(xExtents);
		this.state = {
			ema26,
			ema12,
			macdCalculator,
			smaVolume50,
			data: linearData,
			xScale,
            xAccessor, displayXAccessor,
            xExtents
		};
        this.handleDownloadMore = this.handleDownloadMore.bind(this);
	}
	updateOne=(newOne)=>{
		const { data: prevData, ema26, ema12, macdCalculator, smaVolume50 } = this.state;
		const maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator,
			smaVolume50
		]);
		console.log(prevData);
		const dataToCalculate = prevData.slice(-maxWindowSize);
		dataToCalculate.push(newOne);
		console.log(dataToCalculate);
		
				const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
				const indexCalculator = discontinuousTimeScaleProviderBuilder().indexCalculator();
		
				// console.log(inputData.length, dataToCalculate.length, maxWindowSize)
				const { index } = indexCalculator(calculatedData);
				/* SERVER - END */
				const xScaleProvider = discontinuousTimeScaleProviderBuilder()
					.withIndex(index);
			 
				const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-1));
			//    console.log(xExtents);
				this.state = {
					ema26,
					ema12,
					macdCalculator,
					smaVolume50,
					data: linearData,
					xScale,
					xAccessor, displayXAccessor,
				};

	}
	handleDownloadMore(start, end,newdata) {
		if (Math.ceil(start) === end) return;
		const { data: prevData, ema26, ema12, macdCalculator, smaVolume50 } = this.state;
		const rowsToDownload = end - Math.ceil(start);

		const maxWindowSize = getMaxUndefined([ema26,
			ema12,
			macdCalculator,
			smaVolume50
		]);
		/* SERVER - START */
		console.log("rowsToDownload:"+rowsToDownload+" maxWindowSize:"+maxWindowSize+" prevData.length:"+prevData.length);
		const dataToCalculate = newdata.slice(maxWindowSize+rowsToDownload,-prevData.length);
		console.log(dataToCalculate);
		const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
		const indexCalculator = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.indexCalculator();
		const { index } = indexCalculator(
			calculatedData.slice(-rowsToDownload).concat(prevData));
		/* SERVER - END */
 
		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.withIndex(index);

		const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));
		// const start2 = xAccessor(last(linearData));
		// const end2 = xAccessor(linearData[Math.max(0, linearData.length - 50)]);
		// const xExtents = [start2, end2];
		// console.log(xExtents);


		this.setState({
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		});

    }

    

    
	render() {
		const { width, ratio } = this.props;
        const { data, ema26,xExtents, ema12, macdCalculator, smaVolume50, xScale, xAccessor, displayXAccessor } = this.state;
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

		return (
            <div>
			<ChartCanvas 
                    ratio={ratio} 
                    width={width} 
                    height={210}
					margin={{ left: 5, right: 45, top: 5, bottom: 20 }} type={"hybrid"}
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
					arrowWidth= {6}
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
						arrowWidth= {6}
						strokeDasharray="Solid"
						displayFormat={format(".2f")}
					/> */}

				</Chart>

			</ChartCanvas>
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
	type: "hybrid",
};

CandleStickChartPanToLoadMore = fitWidth(CandleStickChartPanToLoadMore);

export default CandleStickChartPanToLoadMore;
