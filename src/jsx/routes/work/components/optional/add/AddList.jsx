import { connect } from 'react-redux';

import AddItem from './AddItem';

import styles from './css/addList.less';

class AddList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6],
            selected:[]
        };
    }

    toggleClick = (id)=>{
        var {selected} = this.state,
            index = selected.indexOf(id);
        if(index!=-1){
            selected.splice(index,1);
        }
        else{
            selected.push(id);
        }
        this.setState({selected:selected.slice()});
    }

    renderList(list){
        var {selected} = this.state;

        return list.map(item=>{
            return <AddItem id={item} selected={selected.indexOf(item)!=-1} onToggleClick={this.toggleClick}/>
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
    return {};
}

module.exports = connect(null,injectAction())(AddList);
