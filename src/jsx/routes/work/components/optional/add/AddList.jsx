import { connect } from 'react-redux';

import AddItem from './AddItem';
import {updateOptionalList} from '../../../../../store/actions';
import styles from './css/addList.less';

class AddList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this._selected=[];
    }

    toggleClick = (id)=>{
        var index = this._selected.indexOf(id);
        var {data,optList} =this.props;
        if(index!=-1){//删除
           // selected.splice(index,1);
            var indexLoc = optList.indexOf(data[id].prodCode);
            if(indexLoc>-1)
                optList.splice(indexLoc,1);
        }
        else{//添加
            // selected.push(id);
            var indexLoc = optList.indexOf(data[id].prodCode);
            if(indexLoc ==-1)
                optList.push(data[id].prodCode);
        }

        this.props.updateOptionalList(optList);
    }

    renderList(){
        var {data,optList} =this.props;
        this._selected=[];
        for(var i=0;i<data.length;i++){
            var indexLoc = optList.indexOf(data[i].prodCode);
            if(indexLoc>-1)
                this._selected.push(i);
        }

        return data.map((item,index)=>{
            return <AddItem item={item} id={index} selected={this._selected.indexOf(index)!=-1} onToggleClick={this.toggleClick}/>
        })
    }

    //渲染函数
    render(){

        var {type} = this.props;        
        return (
            <ul className={styles.optional_list}>
                {this.renderList()}
            </ul>
        );
    }

}

function injectAction(){
    return {updateOptionalList};
}

module.exports = connect(null,injectAction(updateOptionalList))(AddList);
