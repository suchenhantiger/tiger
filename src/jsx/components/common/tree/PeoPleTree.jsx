import TreeNode from './TreeNode';

import styles from './css/tree.css';

class PeoPleTree extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.nodeInTree = [];

        this.state = {
            data:[],
            userobj:{},
            selectedItem:this.props.initData || [],
        };
    }

    componentWillMount(){
        var {data} = this.props;
     if(data.length>0){
          var tree = this.rebuildData(data);
          this.setState({data:tree,propsData:data});
        }

    }
    componentWillReceiveProps(nextProps){
      var {data,userobj} =nextProps;
      if(!this.state.userobj.code && userobj.code){
          this.setState({userobj:userobj});
      }
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
    existParentInTree = (id)=>{
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
            if(item.parent == ""){
                var node = {id:item.id,hideCheck:true,msub:item.msub, open:(topnodeopen==null)?true:topnodeopen, name:item.name, sortId:item.sort_id,trueleaf:item.trueleaf,checkboxstate:"cb_noselected", children:[]};
                // var node = {id:item.id, open:(topnodeopen==null)?true:topnodeopen, name:item.name, sortId:item.sort_id,trueleaf:item.trueleaf,checkboxstate:"cb_hideselected", children:[]};
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
                   let ishideCheck = (item.id == '9115870441885680921' || item.name.indexOf('区域分公司')>0)
                    var node = {id:item.id,hideCheck:ishideCheck,msub:item.msub, open:false,select:false, name:item.name, sortId:item.sort_id,trueleaf:item.trueleaf,checkboxstate:"cb_noselected", children:[]};
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
    setChildrenCbState(node,cbstate){
      var {children} = node;
        if(children.length){
          for(var i=0;i<children.length;i++){
            var item=children[i];
            item.checkboxstate=cbstate;
            if(item.trueleaf=='1'){
              if(cbstate == 'cb_selected')
                this.addToSelectedList(item);
              else if(cbstate == 'cb_noselected'){
                this.delFromSelectedList(item);
              }
            }
            if(item.children.length){
                this.setChildrenCbState(item,cbstate);
            }
          }
        }
    }
    setParentCbState(node){
      var {data}=this.props;
      var {id}=node;
      var item=data.find((item)=>item.id==id);
      var parent_id=item.parent;
      if(!parent_id) return;
      var parent_node=this.nodeInTree.find((item)=>item.id==parent_id);
      var selected_length=0;
      var part_length=0;

      if(parent_node && !parent_node.hideCheck){

        for(var i=0;i<parent_node.children.length;i++){
            if(parent_node.children[i].checkboxstate=="cb_selected")
               selected_length++;
           if(parent_node.children[i].checkboxstate=="cb_partselected")
               part_length++;
        }

        if(selected_length==parent_node.children.length){//全选中
           parent_node.checkboxstate="cb_selected";
        }
        else if(selected_length==0 && part_length==0){//全没选中
           parent_node.checkboxstate="cb_noselected";
        }
        else{//部分选中
           parent_node.checkboxstate="cb_partselected";
        }
        this.setParentCbState(parent_node);
      }


    }

    getAllMultiSelectedNode(){

      var multiNodeData=this.state.selectedItem.slice(0);//临时变量 复选框的时候会用到，组装结构传给组件外
      // for(var i=0;i<this.nodeInTree.length;i++){
      //     var item = this.nodeInTree[i];
      //     let olditem = multiNodeData.find((olditem)=>olditem.id == item.id);
      //     if(!olditem && item.children.length==0 && item.checkboxstate=='cb_selected' && item.trueleaf=='1'){
      //          multiNodeData.push({id:item.id,name:item.name});
      //     }
      // }
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
        var {canparentselect}=this.props;//父节点是否可以选中
        var node = this.getNode(id),
            {id,children,open,msub} = node;

        for(var i=0;i<this.nodeInTree.length;i++){
                var item = this.nodeInTree[i];
                if(!item.children.length){
                    item.open = false;
                }
            }
            this.nodeInTree.forEach((item)=>{
                 item.select=false;
            })

        if(children.length || msub){
            node.open = !open;
            if(canparentselect)
            node.select = true;
        }
        else{
            var {onSelect} = this.props;
            this.closeAllNode();
            node.open = true;
            node.select = true;
            onSelect && onSelect(node);
        }

        var {nodeClick}=this.props;
        if(nodeClick){
          if(!node.hideCheck && !node.getMemes)
            nodeClick(id);
        }
        this.forceUpdate();
    }

  updateMems(data,id,ischeckbox){
    this.updateDeptMems(data,id);
    if(ischeckbox)
      this.updateCheckboxstate(id);
  }
    //请求成功后更新部门下的人员
    updateDeptMems=(data,id)=>{
      let deptNode = this.existParentInTree(id);
      if(!deptNode || deptNode.getMemes) return; //如果不存在或已获取过，则退出
      deptNode['getMemes'] = true;
      if(deptNode.children.length>0){
        for(let i=0;i<deptNode.children.length;i++){
            this.updateDeptMems(data,deptNode.children[i].id);
        }
      }
      for(let i=0;i<data.length;i++){
          var item = data[i],
              {parent} = item;
              if(deptNode.id == parent){
                var node = {id:item.id, open:false,select:false, name:item.name, sortId:item.sort_id,trueleaf:'1',checkboxstate:"cb_noselected", children:[]};
                deptNode.children.push(node);
                this.nodeInTree.push(node);
                  // let isDepSelected = deptNode.checkboxstate=='cb_selected'; //部门节点是否是全选状态
                  let isSelected = this.state.selectedItem.find((selected)=>selected.id==item.id);
                  if(isSelected){
                      setTimeout( this.latercheckboxclick(item.id),5);
                  }
                  // if(isDepSelected || isSelected){
                  //   setTimeout( this.latercheckboxclick(item.id),10); //延迟执行，不然会出现已有子节点全部选中，导致父节点变成全选，后续处理的节点全部自动选中。
                  // }
              }
      }
    }
    latercheckboxclick=(id)=>{
      return ()=>{
        this.onCheckBoxClick(id);
      }
    }
    //加入已选列表
    addToSelectedList(item){
      let {id,name} = item;
      let newList = this.state.selectedItem;
      let olditem = newList.find((olditem)=>olditem.id==id);
      if(!olditem){
        let itemr = this.props.data.find((ditem)=>ditem.id==id);

        newList.push({id,name,rdeptid:itemr?itemr.rdeptid:''});
      }
    }
    delFromSelectedList(item){
      let {id,name} = item;
      let data = this.state.selectedItem;
      for(let i=0;i<data.length;i++){
        if(data[i].id==id){
          data.splice(i,1);
        }
      }
    }
    onCheckBoxClick=(id)=>{
        var node = this.getNode(id),
          {id,children,open,checkboxstate} = node;
          if(!node.hideCheck && !node.getMemes && !node.trueleaf){ //点击的是部门，且未获取人员
            let {nodeClick}=this.props;
            if(nodeClick){
                nodeClick(id,true);
            }
          }else{
            this.updateCheckboxstate(id);
          }
          // switch(checkboxstate){
          //   case "cb_noselected":
          //     node.checkboxstate="cb_selected";
          //     if(node.trueleaf=='1') this.addToSelectedList({id:node.id,name:node.name});
          //     if(children.length){
          //       this.setChildrenCbState(node,"cb_selected");
          //     }
          //
          //   break;
          //   case "cb_selected":
          //     node.checkboxstate="cb_noselected";
          //       if(node.trueleaf=='1') this.delFromSelectedList({id:node.id,name:node.name});
          //     if(children.length){
          //       this.setChildrenCbState(node,"cb_noselected");
          //     }
          //
          //
          //   break;
          //   case "cb_partselected":
          //     node.checkboxstate="cb_noselected";
          //     if(children.length){
          //       this.setChildrenCbState(node,"cb_noselected");
          //     }
          //
          //
          //   break;
          // }
          // this.setParentCbState(node);
          // var multiNodeData=this.getAllMultiSelectedNode();
          //
          // var {checkboxClick}=this.props;
          // if(checkboxClick)
          //   checkboxClick(multiNodeData);
          //   this.forceUpdate();
    }

    updateCheckboxstate(id){
      var node = this.getNode(id),
        {id,children,open,checkboxstate} = node;
        switch(checkboxstate){
          case "cb_noselected":
            node.checkboxstate="cb_selected";
            if(node.trueleaf=='1') this.addToSelectedList({id:node.id,name:node.name});
            if(children.length){
              this.setChildrenCbState(node,"cb_selected");
            }

          break;
          case "cb_selected":
            node.checkboxstate="cb_noselected";
              if(node.trueleaf=='1') this.delFromSelectedList({id:node.id,name:node.name});
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
        var multiNodeData=this.getAllMultiSelectedNode();

        var {checkboxClick}=this.props;
        if(checkboxClick)
          checkboxClick(multiNodeData);
          this.forceUpdate();
    }

    //渲染树
    renderTree(data){
        var {multiselect}=this.props;
        if(data.length){
            return data.map((item,index)=>{
                var {name,open,id,children,select,checkboxstate,hideCheck,msub} = item;
                return (
                    <TreeNode open={open} select={select}
                      hideCheck={hideCheck}
                      multiselect={multiselect} checkboxstate={checkboxstate} name={name}
                      baby={children.length+Number(msub)}
                      id={id}
                      onClick={this.itemClick} onCheckBoxClick={this.onCheckBoxClick}>
                        {children.length && open?this.renderTree(children):""}
                    </TreeNode>
                )
            })
        }
        return null;
    }
    //直接设置某一个leaf的checkboxstate
    updateTreeNodeCbState=(id,name)=>{
      var node = this.getNode(id);
      for(let i=0;i<this.state.selectedItem.length;i++){
        if(this.state.selectedItem[i].id == id){
          this.state.selectedItem.splice(i,1);
        }
      }
      if(!node) return;
      node.checkboxstate="cb_noselected";
      this.setParentCbState(node);
      this.forceUpdate();
    }
    //删除所有选中节点
    delallTreeNodeCbState=()=>{
      this.setState({selectedItem:[]});
      for(var i=0;i<this.nodeInTree.length;i++){
          var item = this.nodeInTree[i];
          item.checkboxstate="cb_noselected";
      }
      this.forceUpdate();
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PeoPleTree render");
        var {data} = this.state;
        return(
            <div>
                {this.renderTree(data)}
            </div>

        );
    }

}

module.exports = PeoPleTree;
