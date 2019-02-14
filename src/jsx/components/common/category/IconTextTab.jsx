
import styles from './css/icontexttab.css';

class IconTextTab extends PureComponent{

  //构造函数
  constructor(props) {
      super(props);
  }

  onClickFunc(){
    this.props.onClick(this.props.keyword);
  }
  renderItem(){
    var {data}=this.props;
    var {id,icon, title,titlewidth, news_count, append_info,append_img,append_imgcls,clickEvent}=data[0];
    var iconCls=styles.icon+" "+ styles[icon];
    var appendImgCls=styles.append_img+" "+(append_imgcls=="rect"?styles[append_imgcls]:"");

    return(
      <div className={styles.tabitem} onClick={clickEvent?clickEvent(id,title):""}>
             {icon?<span className={iconCls}></span>:""}
             <span className={styles.title} style={{"width":titlewidth}}>{title}</span>
             {news_count?<span className={styles.news_count}>{news_count}</span>:""}
             {clickEvent?<span className={styles.rightarrow}/>:<span className={styles.rightarrow_none}/>}
             {append_img?<img className={appendImgCls} src={append_img}/>:""}
             {append_info?<span className={styles.append_info}>{append_info}</span>:""}
      </div>
    )
  }
  renderList(){
    var {data}=this.props;
    var list = [];
   for(var i=0;i<data.length;i++){
      var {id,icon, title,titlewidth, news_count, append_info,append_img,append_imgcls,clickEvent,twoline
      }=data[i];
      var iconCls=styles.icon+" "+ styles[icon];
      var appendImgCls=styles.append_img+" "+(append_imgcls=="rect"?styles[append_imgcls]:"");
      var tabitemCls=styles.tabitem+" "+styles.moreline;
      var styl = {"width":titlewidth};
      if (twoline) {
        styl['white-space'] = 'normal';
        styl['line-height'] = '1.3em';
        styl['height']='2.6em';
        styl['display']='-webkit-box';
        styl['-webkit-box-orient']= 'vertical';
        styl['-webkit-line-clamp']= 2;
      }
      list.push(
        <div className={tabitemCls} onClick={clickEvent?clickEvent(id,title):null}>
               {icon?<span className={iconCls}></span>:""}
               <span className={styles.title} style={styl}>{title}</span>
               {news_count?<span className={styles.news_count}>{news_count}</span>:""}
               {clickEvent?<span className={styles.rightarrow}/>:<span className={styles.rightarrow_none}></span>}
               {append_img?<img className={appendImgCls} src={append_img}/>:""}
               {append_info?<span className={styles.append_info}>{append_info}</span>:""}
        </div>

      );

     }
     return list;
  }


  //渲染函数
  render(){
    systemApi.log("IconTextTab renders");
    var {data}=this.props;

    return (
      <div className={styles.tabpanel}>
          {data.length==1?this.renderItem():this.renderList()}
      </div>
    );
  }

}

module.exports = IconTextTab;
