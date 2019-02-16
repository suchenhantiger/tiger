import { connect } from 'react-redux';
import {getOptionalList} from "../../actions/optional/optionalAction";

import styles from './css/optionalEditList.less';

class OptionalEditList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            list:[]
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
            return null;
        })
    }

    //渲染函数
    render(){

        var {list} = this.state;

        return (
            <ul className={styles.ul}>
                {this.renderList(list)}
            </ul>
        );
    }

}

function injectAction(){
    return {getOptionalList};
}

module.exports = connect(null,injectAction())(OptionalEditList);
