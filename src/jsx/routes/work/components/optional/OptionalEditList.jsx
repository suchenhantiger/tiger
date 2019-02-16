import { connect } from 'react-redux';
import {getOptionalList} from "../../actions/optional/optionalAction";

import styles from './css/optionalEditList.less';

class OptionalEditList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            list:[1,1,11,1,1,1,1,1,1,1,1,]
        };
    }

    componentDidMount(){
        this.props.getOptionalList(this, {}, this.updateList);
    }

    updateList = (list)=>{
        this.setState({list})
    }

    renderList(list){
        return list.map(item=>{
            return (
                <li className={styles.op_sort_li}>
                    <div className={styles.list_left_icon}>
                        <div className={styles.icon_delete_red}></div>
                    </div>
                    <div className={styles.currency_name}>
                        <p className={this.mergeClassName("c3", styles.c3)}>欧元美元</p>
                        <p className={this.mergeClassName("c9", "font-arial")}>EURUSD200</p>
                    </div>
                    <div className={styles.list_right_icon}>
                        <div className={styles.icon_sort}></div>
                    </div>
                </li>
            );
        })
    }

    //渲染函数
    render(){

        var {list} = this.state;

        return (
            <ul className={styles.optional_list}>
                {this.renderList(list)}
            </ul>
        );
    }

}

function injectAction(){
    return {getOptionalList};
}

module.exports = connect(null,injectAction())(OptionalEditList);
