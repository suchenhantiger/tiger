import React,{Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { PropTypes } from 'react';

class PureComponent extends Component {

    //构造函数，创建请求清单
    constructor(props,context) {
        super(props,context);
        if(context){
            this.store = context.store;
        }
        this._reqList = [];
    }

    //比较属性和状态是否改变
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    //合并className; mergeClassName(a,b,c) => a+" "+b+" "+c
    mergeClassName(){
        return Array.prototype.join.call(arguments," ");
    }

    //转换距离
    calculatePx(rem, px){
        return rem*remUnit+px;
    }

    //发送Ajax请求，并记录请求标记，在元素销毁时清除回调
    requestJSON(url,params,callBack, otherParams){
        var obj = NetWork.requestJSON(url, params || {}, otherParams || {}),
            {promise,ver} = obj;

        //添加请求标识
        this._reqList.push(ver);
        if(callBack){
            //执行用户回调
            promise.done(function(data){
                callBack(data);
            });
        }
        return promise;
    }

    //发送Ajax请求，并记录请求标记，在元素销毁时清除回调
    requestJSONOther(url,type,params,callBack){
        var obj = NetWork.requestJSONOther(url, type, params || {}),
            {promise,ver} = obj;

        //添加请求标识
        this._reqList.push(ver);
        if(callBack){
            //执行用户回调
            promise.done(function(data){
                callBack(data);
            });
        }
        return promise;
    }

    //元素销毁时，清掉未完成Ajax回调函数
    componentWillUnmount(){
        if(this._reqList.length){
            console.log("cancelRequest:"+this._reqList);
        }
        NetWork.cancelRequest(this._reqList);
    }

    //获取路由hash
    getHashPath(){
        var hashStr = location.hash,
            index = hashStr.indexOf('?');
        return hashStr.substring(1, index>-1?index:undefined);
    }

    //获取子元素
    getChildren() {
        var children = [];
        React.Children.forEach(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                children.push(child);
            }
        });
        return children;
    }

}

PureComponent.contextTypes = {
  store: React.PropTypes.object
};

module.exports = PureComponent;
