import TreeNode from './TreeNode';

import styles from './css/tree.css';

class Tree extends PureComponent{

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
        // data = [
        //         {"id":"1","parent":"","name":"日常办公费用","sort_id":1,"trueleaf":0},
        //         {"id":"264X-2","parent":"1","name":"差旅费","sort_id":0,"trueleaf":0},
        //         {"id":"264X-29","parent":"9","name":"研发-差旅费","sort_id":1,"trueleaf":1},
        //         {"id":"264X-87","parent":"9","name":"专项-差旅费","sort_id":0,"trueleaf":1},
        //         {"id":"9","parent":"","name":"专项业务费用","sort_id":0,"trueleaf":0}
        //
        //     ]
        //trueleaf 当为复选框的时候起作用，判断该节点是否需要组装出来丢给外层组件 使用场景：组织架构，有些部门是末级 但是没有人员 不要丢给外层，外层只要人员名单
        if(data.length>0){
            var tree = this.rebuildData(data);
            this.setState({data:tree});
        }
    }

    componentWillReceiveProps(nextProps){
        var {data} =nextProps;
        if(this.state.data.length>0){
            return;
        }
        else if(data.length>0){
            var tree = this.rebuildData(data);
            this.setState({data:tree});
        }
    }

    componentDidUpdate(){
        var {onscrollrefresh}=this.props;
        onscrollrefresh && onscrollrefresh();
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
        var {topnodeopen} = this.props,//顶部节点是否默认打开
            data = origin.slice(0),
            rebuild = [],
            appendFlag = true;

        this.nodeInTree = [];

        //找到所有根
        for(var i=0;i<data.length;i++){
            if(!data[i]) continue;
            var {parent, id, name, sort_id, selected, trueleaf, checkboxstate} = data[i];
            if(parent == ""){
                var node = {id:id, open:(topnodeopen==null)?true:topnodeopen, name:name, sortId:sort_id,trueleaf:trueleaf,checkboxstate:checkboxstate||"cb_noselected", children:[]};
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
                var {parent, id, name, sort_id, selected, trueleaf, checkboxstate} = data[i],
                    pNode = this.existParentInTree(parent);

                if(pNode){
                    var node = {id:id, open:false,select:selected||false, name:name, sortId:sort_id,trueleaf:trueleaf,checkboxstate:checkboxstate||"cb_noselected", children:[]};
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

    setChildrenCbState(node, cbstate){
        var {children} = node;
        if(children.length){
            for(var i=0;i<children.length;i++){
                var item=children[i];
                item.checkboxstate=cbstate;
                if(item.children.length){
                    this.setChildrenCbState(item,cbstate);
                }
            }
        }
    }

    setParentCbState(node){
        var {data} = this.props,
            {id} = node,
            item = data.find((item)=>item.id==id),
            parent_id = item.parent,
            parent_node = this.nodeInTree.find((item)=>item.id==parent_id),
            selected_length = 0;

        if(parent_node){
            for(var i=0;i<parent_node.children.length;i++){
                if(parent_node.children[i].checkboxstate=="cb_selected"){
                    selected_length++;
                }
            }

            if(selected_length==parent_node.children.length){//全选中
                parent_node.checkboxstate="cb_selected";
            }
            else if(selected_length==0){//全没选中
                parent_node.checkboxstate="cb_noselected";
            }
            else{//部分选中
                parent_node.checkboxstate="cb_partselected";
            }
            this.setParentCbState(parent_node);
        }
    }

    getAllMultiSelectedNode(){
        var multiNodeData=[];//临时变量 复选框的时候会用到，组装结构传给组件外
        for(var i=0;i<this.nodeInTree.length;i++){
            var item = this.nodeInTree[i];
            if(item.children.length==0 && item.checkboxstate=='cb_selected' && item.trueleaf=='1'){
                multiNodeData.push({id:item.id,name:item.name});
            }
        }
        return multiNodeData;
    }

    openNode = (id,data)=>{
        // var {data} = this.props;
        if(data.length<1) return;
      var item=data.find((item)=>item.id==id);
      var parent_id=item.parent;
      var parent_node=this.nodeInTree.find((item)=>item.id==parent_id);

        if(parent_node){
          parent_node.open = true;
           this.openNode(parent_id,data);
        }
        this.forceUpdate();
    }
    
    //点击节点
    itemClick = (id)=>{
        var {canparentselect, nodeClick} = this.props, //父节点是否可以选中
            node = this.getNode(id),
            {id,children,open} = node;

        for(var i=0;i<this.nodeInTree.length;i++){
            var item = this.nodeInTree[i];
            if(!item.children.length){
                item.open = false;
            }
        }

        this.nodeInTree.forEach((item)=>{
             item.select=false;
        });

        if(children.length){
            node.open = !open;
            if(canparentselect) node.select = true;
        }
        else{
            var {onSelect} = this.props;
            this.closeAllNode();
            node.open = true;
            node.select = true;
            onSelect && onSelect(node);
        }

        nodeClick && nodeClick(id);
        this.forceUpdate();
    }

    onCheckBoxClick = (id)=>{
        var {checkboxClick} = this.props,
            node = this.getNode(id),
            {id,children,open,checkboxstate} = node;

        switch(checkboxstate){
            case "cb_noselected":
                node.checkboxstate="cb_selected";
                if(children.length){
                    this.setChildrenCbState(node,"cb_selected");
                }
                break;

            case "cb_selected":
                node.checkboxstate="cb_noselected";
                if(children.length){
                    this.setChildrenCbState(node,"cb_noselected");
                }
                break;

            case "cb_partselected":
                node.checkboxstate="cb_noselected";
                if(children.length){
                    this.setChildrenCbState(node,"cb_noselected");
                }
                break;
        }

        this.setParentCbState(node);
        var multiNodeData = this.getAllMultiSelectedNode();
        checkboxClick && checkboxClick(multiNodeData);
        this.forceUpdate();
    }

    //渲染树
    renderTree(data){
        var {multiselect} = this.props;
        if(data.length){
            return data.map((item,index)=>{
                var {name,open,id,children,select,checkboxstate} = item;
                return (
                    <TreeNode open={open} select={select} multiselect={multiselect} checkboxstate={checkboxstate} name={name} baby={children.length} id={id} onClick={this.itemClick} onCheckBoxClick={this.onCheckBoxClick}>
                        {children.length && open?this.renderTree(children):""}
                    </TreeNode>
                )
            })
        }
        return null;
    }

    //直接设置某一个leaf的checkboxstate
    updateTreeNodeCbState = (id,name)=>{
      var node = this.getNode(id);
      node.checkboxstate="cb_noselected";
      this.setParentCbState(node);
      this.forceUpdate();
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

module.exports = Tree;
