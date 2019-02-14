import styles from './css/tree.css';
class Tree extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {id,onClick} = this.props;
        onClick && onClick(id);
    }
    checkboxClick=()=>{
      var {id,onCheckBoxClick} = this.props;
      onCheckBoxClick && onCheckBoxClick(id);
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Tree render");

        var {name,children,open,baby,select,multiselect,checkboxstate,hideCheck} = this.props,
            hasChildren = baby>0;
        var nodeCls=this.mergeClassName(styles.node,styles[checkboxstate], hasChildren?styles.parent:styles.leaf, open?styles.open:styles.close,select?styles.select:"");
        var nameCls=this.mergeClassName(styles.name,multiselect?"":styles.pl25);
        return(
            <div className={styles.frame}>

                <div className={nodeCls}>
                    <span className={styles.iconleaf} onClick={this.itemClick}></span>
                    {(multiselect&&!hideCheck)?<span className={styles.iconsel} onClick={this.checkboxClick}></span>:null}
                    <span className={nameCls} onClick={this.itemClick}>{name}</span>
                </div>
                <div className={styles.subNode}>
                    {this.props.children}
                </div>
            </div>
        );
    }


}

module.exports = Tree;
