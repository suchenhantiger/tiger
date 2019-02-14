// import styles from './css/tree.css';
import styles from './css/treeCommon.css';

class TreeNodeCommon extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {id,onClick} = this.props;
        onClick && onClick(id);
    }

   iconClick = () =>{
     let {id,oniconClick} = this.props;
     oniconClick && oniconClick(id);
   }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TreeNodeCommon render");

        var {name,children,open,baby,select} = this.props,
            hasChildren = baby>0;

        return(
            <div className={styles.frame}>
                <div className={this.mergeClassName(styles.node, hasChildren?styles.parent:styles.leaf, open?styles.open:styles.close,select?styles.select:"")}>
                  <div className={styles.lefticon} onClick={this.iconClick}><span style={{visibility: 'hidden'}}>空</span></div>
                  <div className={styles.rightname} onClick={this.itemClick}>{name}</div>
                </div>
                <div className={styles.subNode}>
                    {this.props.children}
                </div>
            </div>
        );
    }


}

module.exports = TreeNodeCommon;
