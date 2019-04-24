import ProductItem from './ProductItem';
import styles from './css/classifyFrame.less';
import {connect} from 'react-redux';
import {getMasterList} from '../../actions/documentary/documentaryAction';

class ClassifyFrame extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var {incomeDate,steadyDate,accuracyDate} = this.props;
        if(incomeDate.length>0 || steadyDate.length>0|| accuracyDate.length>0){

        }else
            this.props.getMasterList(this,{pageNo:1,pageSize:5},()=>{

            });
    }

    renderIncomeDate(){
        var {incomeDate} = this.props;
        //console.log(incomeDate);
        var tmpArr = incomeDate.slice(0,5);
        return tmpArr.map(item=>{
            return <ProductItem data={item}/>
        });
    }

    renderSteadyDate(){
        var {steadyDate} = this.props;
        var tmpArr = steadyDate.slice(0,5);
        return tmpArr.map(item=>{
            return <ProductItem data={item}/>
        });
    }

    renderAccuracyDate(){
        var {accuracyDate} = this.props;
        var tmpArr = accuracyDate.slice(0,5);
        return tmpArr.map(item=>{
            return <ProductItem data={item}/>
        });
    }

    gotoAccurate =()=>{
        var {mulFrame} =this.props;
        mulFrame && mulFrame(2);
    }
    gotoBentfit=()=>{
        var {mulFrame} =this.props;
        mulFrame && mulFrame(0);
    }
    gotoSteady=()=>{
        var {mulFrame} =this.props;
        mulFrame && mulFrame(1);
    }
    //渲染函数
    render() {

        return (
            <div>
                <div className={styles.home_banner}>
                    <img src="./images/documentary/banner.png" alt="" />
                </div>
                <div className={styles.home_list}>
                    <div className={this.mergeClassName("mg-bt-20")}>
                        <div className={styles.list_tit} onClick={this.gotoBentfit}>
                            <span className={this.mergeClassName("font26", "left")} >收益高手</span>
                            <span className={this.mergeClassName("c9", "right", "pd-rt-30")}>收益领先，表现突出</span>
                        </div>
                        <ul className={styles.list}>
                           {this.renderIncomeDate()}

                        </ul>
                    </div>
                </div>
                <div className={styles.home_list}>
                    <div className={this.mergeClassName("mg-bt-20")}>
                        <div className={styles.list_tit} onClick={this.gotoSteady}>
                            <span className={this.mergeClassName("font26", "left")}>稳健高手</span>
                            <span className={this.mergeClassName("c9", "right", "pd-rt-30")}>收益稳定，回撤率小</span>
                        </div>
                        <ul className={styles.list}>
                        {this.renderSteadyDate()}
                        </ul>
                    </div>
                </div>
                <div className={styles.home_list}>
                    <div className={this.mergeClassName("mg-bt-20")} >
                        <div className={styles.list_tit} onClick={this.gotoAccurate}>
                            <span className={this.mergeClassName("font26", "left")}>常胜高手</span>
                            <span className={this.mergeClassName("c9", "right", "pd-rt-30")}>交易稳定，准确率高</span>
                        </div>
                        <ul className={styles.list}>
                        {this.renderAccuracyDate()}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }

}

function injectProps(state){
    var {accuracyDate,
        incomeDate,
        steadyDate} = state.base || {};
    return {accuracyDate,
        incomeDate,
        steadyDate};
}
function injectAction(){
    return {getMasterList};
}

module.exports = connect(injectProps,injectAction())(ClassifyFrame);
