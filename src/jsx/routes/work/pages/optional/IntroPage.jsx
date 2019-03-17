import {connect} from 'react-redux';
import {getProdInfo} from '../../actions/optional/optionalAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';


import styles from './css/addPage.less';

/********自选-添加*********/
class IntroPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {prodCode,prodName} = this.props.location.query||{};
        this._prodCode = prodCode;
        this._prodName = prodName;
        this.state = {
            prodInfo:{}
        }
    }


    componentDidMount(){
        
        this.props.getProdInfo(this,{prodCode:this._prodCode},(prodInfo)=>{
            this.setState({prodInfo});
        });
    }


    render() {
        systemApi.log("prodInfo render");

        var { prodInfo } = this.state;
        var {categoryId,
        commission,
        createDate,
        digits,
        id,
        isNewRecord,
        marginPercentage,
        maxvolume,
        minstDec,
        minvolume,
        mt4Group,
        prodCode,
        prodName,
        prodSize,
        quotesDate,
        remarks,
        spread,
        swapLong,
        swapShort,
        swapType,
        tradeDate,
        tradeStatus,
        updateDate,
        volumeStep} = prodInfo;
        return (
            <FullScreenView>
                <AppHeader headerName="交易品种简介" />
                <Content>
                <div className={this.mergeClassName("mg-tp-42", "mg-lr-20")}>
                    <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                        <ul>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>交易品种</p></div>
                                <div className={this.mergeClassName("right")}>
                                    <p className={"right"}>{this._prodName}</p>
                                    <p>{this._prodCode}</p>
                                </div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>交易时间</p></div>
                                <div className={this.mergeClassName("right")}><p>{tradeDate}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>报价时间</p></div>
                                <div className={this.mergeClassName("right")}><p>{quotesDate}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>点差</p></div>
                                <div className={this.mergeClassName("right")}><p>{spread}点</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>小数位</p></div>
                                <div className={this.mergeClassName("right")}><p>{digits}位</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>最低止损点数</p></div>
                                <div className={this.mergeClassName("right")}><p>{minstDec}点</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>合约数量</p></div>
                                <div className={this.mergeClassName("right")}><p>{prodSize}合约/手</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>最小交易量</p></div>
                                <div className={this.mergeClassName("right")}><p>{minvolume}手</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>最大交易量</p></div>
                                <div className={this.mergeClassName("right")}><p>{maxvolume}手</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>交易量步长</p></div>
                                <div className={this.mergeClassName("right")}><p>{volumeStep}手</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>每标准手手续费</p></div>
                                <div className={this.mergeClassName("right")}><p>{commission}美元</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>库存费计算模式</p></div>
                                <div className={this.mergeClassName("right")}><p>{swapType}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>买入库存费</p></div>
                                <div className={this.mergeClassName("right")}><p>{swapLong}美元/手</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>卖出库存费</p></div>
                                <div className={this.mergeClassName("right")}><p>{swapShort}美元/手</p></div>
                            </li>

                        </ul>
                    </div>
            </div>
            </Content>

            </FullScreenView>
        );
    }

}
// function injectProps(state){
//     var {ProductList,OptionalList} = state.base || {};
//     return {ProductList,OptionalList};
// }
function injectAction(){
    return {getProdInfo};
}
module.exports = connect(null,injectAction())(IntroPage);

