import TreeNodeCommon from './TreeNodeCommon';

import styles from './css/treeCommon.css';

class TreeCommon extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.nodeInTree = [];
        this.state = {
            data:[]
        };
    }

    componentWillMount(){

        var {data} = this.props;

        //data = [
        //      {"id":"1","parent":"","name":"日常办公费用","sort_id":1},
        //      {"id":"264X-2","parent":"1","name":"差旅费","sort_id":0},
        //      {"id":"264X-29","parent":"9","name":"研发-差旅费","sort_id":1},
        //      {"id":"264X-87","parent":"9","name":"专项-差旅费","sort_id":0},
        //      {"id":"9","parent":"","name":"专项业务费用","sort_id":0}
        //]

        if(data.length>0){
          var tree = this.rebuildData(data);
          this.setState({data:tree});
        }

    }
    componentWillReceiveProps(nextProps){

      var {data} =nextProps;


      if(this.state.data.length>0)
         return;
      else if(data.length>0){
        var tree = this.rebuildData(data);
        this.setState({data:tree});
      }
    }
    componentDidUpdate(){
      var {onscrollrefresh}=this.props;

      if(onscrollrefresh)
        onscrollrefresh();
    }
    //判断是否在树中
    existParentInTree(id){
        for(var i=0;i<this.nodeInTree.length;i++){
            var item = this.nodeInTree[i];
            if(item.id == id){
                return item;
            }
        }
        return null;
    }

    //组内排序
    sortItem(list){
        return list.sort(function(f,s){ return f.sortId - s.sortId });
    }

    //重建树
    rebuildData(origin){
        var data = origin.slice(0),
            rebuild = [],
            appendFlag = true;

        this.nodeInTree = [];
        var {topnodeopen}=this.props;//顶部节点是否默认打开

        //找到所有根
        for(var i=0;i<data.length;i++){
            var item = data[i];
            if(!item) continue;
            if(!item.parent || item.parent == ""){
                var node = {id:item.id, open:(topnodeopen==null)?true:topnodeopen, name:item.name, sortId:item.sort_id, children:[]};
                rebuild.push(node);
                this.nodeInTree.push(node);

                data.splice(i,1);
                i--;
            }
        }


        rebuild = this.sortItem(rebuild);

        //上一轮有追加过且还有数据，继续循环
        while(appendFlag && data.length){
            appendFlag = false;
            for(var i=0;i<data.length;i++){
                var item = data[i],
                    {parent} = item;
                var   pNode = this.existParentInTree(parent);

                if(pNode){
                    var node = {id:item.id, open:false,select:false, name:item.name, sortId:item.sort_id, children:[]};
                    pNode.children.push(node);
                    this.nodeInTree.push(node);

                    data.splice(i,1);
                    i--;
                    appendFlag = true;
                }
            }
        }
        for(var i=0;i<this.nodeInTree.length;i++){
              this.sortItem(this.nodeInTree[i].children);

        }
        return rebuild;

    }

    //获取节点
    getNode(id){
        for(var i=0;i<this.nodeInTree.length;i++){
            var item = this.nodeInTree[i];
            if(item.id == id){
                return item;
            }
        }
    }

    //关闭所有子节点
    closeAllNode(){
        for(var i=0;i<this.nodeInTree.length;i++){
            var item = this.nodeInTree[i];
            if(!item.children.length){
                item.open = false;
            }
        }
    }

    //点击节点
    iconClick = (id)=>{
        var {canparentselect}=this.props;//父节点是否可以选中
        var node = this.getNode(id),
            {id,children,open} = node;

        for(var i=0;i<this.nodeInTree.length;i++){
                var item = this.nodeInTree[i];
                if(!item.children.length){
                    item.open = false;
                }
            }

        if(children.length){
            node.open = !open;
        }
        else{
            var {onSelect} = this.props;
            this.closeAllNode();
            node.open = true;
            onSelect && onSelect(node);
        }


        this.forceUpdate();
    }

    itemClick = (id) => {

      let {nodeClick,data}=this.props;
      let node;
      for(var i=0;i<data.length;i++){
        let item = data[i];
        if(item.id == id)
          node = item;
      }
      if(nodeClick && node)
         nodeClick(node);
    }

    changeItemColor=(id,flag) =>{
      this.nodeInTree.forEach((item)=>{
        if(item.id == id)
           item.select=flag;
      });
       this.forceUpdate();
    }
    clearAll=()=>{
      this.nodeInTree.forEach((item)=>{
           item.select=false;
      });
       this.forceUpdate();
    }


    cancelItem = (id) =>{
      this.nodeInTree.forEach((item)=>{
        if(item.id == id)
           item.select=false;
      });
       this.forceUpdate();
    }

    //渲染树
    renderTree(data){

        if(data.length){
            return data.map((item,index)=>{
                var {name,open,id,children,select} = item;
                return (
                    <TreeNodeCommon open={open} select={select} name={name} baby={children.length} id={id} onClick={this.itemClick} oniconClick={this.iconClick}>
                        {children.length && open?this.renderTree(children):""}
                    </TreeNodeCommon>
                )
            })
        }
        return null;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Tree render");
        var {data} = this.state;
        return(
            <div>
                {this.renderTree(data)}
            </div>

        );
    }


}

module.exports = TreeCommon;
