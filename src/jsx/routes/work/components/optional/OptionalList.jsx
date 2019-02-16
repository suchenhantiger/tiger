import {connect} from 'react-redux';
import {getOptionalList} from '../../actions/optional/optionalAction';

import OptionalItem from './OptionalItem';

import styles from './css/optionalList.less'

class OptionalList extends CursorList{

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginindex,isAppend,cb,props){
        this.props.getOptionalList(this, {}, this.update, cb);
    }

    //更新数据
    update = (data) => {
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    };

    getScrollStyle(){
        return styles.frame;
    }

    renderList(){
        var {data} = this.state,
            {editable} = this.props;
        return [1,1,1,1,1,1,1,1].map(item=>{
            return <OptionalItem/>
        })
    }
}

function injectAction(){
    return {getOptionalList};
}

module.exports = connect(null,injectAction())(OptionalList);
