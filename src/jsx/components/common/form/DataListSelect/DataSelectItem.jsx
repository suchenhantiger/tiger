
import styles from '../css/DataListSelect/dataselectitem.css';

class DataSelectItem extends PureComponent{

   //构造函数
   constructor(props) {
       super(props);
   }

   onItemClick=()=>{
     var {data,selected,onClick} = this.props;
     if (onClick) {
       onClick(data,!selected);
     }
   }

   //渲染函数
   render(){
       //打印渲染日志，必写
       systemApi.log("DataSelectItem render");
       var {data,moduletype,selected,nameparam} = this.props;
       var aCls=this.mergeClassName(styles.item,styles[moduletype],selected?styles.active:"");
       return(
              <li className={styles.item_list} onClick={this.onItemClick}>
                 <span className={aCls}></span>
                 <span className={styles.name}>{data[nameparam]}</span>
              </li>
          );
   }
}



module.exports = DataSelectItem;
