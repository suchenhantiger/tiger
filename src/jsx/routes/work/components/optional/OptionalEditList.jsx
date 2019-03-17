import { connect } from 'react-redux';
import { updateOptionalList } from "../../../../store/actions";

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import styles from './css/optionalEditList.less';

class OptionalEditList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        var {OptionalListData,OptionalList} = props;
        this.state = {
            list: OptionalListData.slice(0)
        };
        this._OptionalList=OptionalList;
        this.SortableItem = this.getItemElement();
        this.SortableList = this.getListElement();

        this._Change=false;
    }

    updateList = (list) => {
        this.setState({ list })
    }

    save=()=>{
        this.props.updateOptionalList(this._OptionalList);
    }

    getListElement(){
        var {SortableItem} = this;
        return SortableContainer(({ items }) => {
            return (
                <ul className={styles.optional_list}>
                    {items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} data={value} />
                    ))}
                </ul>
            );
        });
    }

    deleteOne = (prodCode)=>(e)=>{
      
    }

    getItemElement=()=>{
        return SortableElement(({ data }) => {
            var {prodName,prodCode} =data;
            return (
                <li className={styles.op_sort_li}>
                    {/* <div className={styles.list_left_icon } onClick={this.deleteOne(prodCode)} >
                        <div className={styles.icon_delete_red}></div>
                    </div> */}
                    <div className={styles.currency_name}>
                        <p className={this.mergeClassName("c3", styles.c3)}>{prodName}</p>
                        <p className={this.mergeClassName("c9", "font-arial")}>{prodCode}</p>
                    </div>
                    <div className={styles.list_right_icon}>
                        <div className={styles.icon_sort}></div>
                    </div>
                </li>
            )
        });
    }



    onSortEnd = ({ oldIndex, newIndex }) => {
        this._Change =true;
        this.setState(({ list }) => ({
            list: arrayMove(list, oldIndex, newIndex),
        }));
        this._OptionalList  = arrayMove(this._OptionalList, oldIndex, newIndex);
        
    };

    //渲染函数
    render() {

        var { list } = this.state,
            {SortableList} = this;

        return (
            <SortableList items={list} onSortEnd={this.onSortEnd} pressDelay={50} />
        );
    }

}
function injectProps(state){
    var {OptionalListData,OptionalList} = state.base || {};
    return {OptionalListData,OptionalList};
}
function injectAction() {
    return {updateOptionalList  };
}

module.exports = connect(injectProps, injectAction(), null, {withRef: true})(OptionalEditList);
