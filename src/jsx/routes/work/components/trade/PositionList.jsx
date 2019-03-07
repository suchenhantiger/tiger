import {connect} from 'react-redux';
import {getNewsList} from '../../../actions/home/infoAction';

import InfoItem from '../InfoItem';
import CursorList from '../../../../../components/common/iscroll/CursorList';

import styles from './css/newsList.less'

class NewsList extends CursorList{

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex,isAppend,cb,props){
        this.props.getNewsList({
            beginIndex,
            pageSize:20,
            isHot:0
        }, isAppend, cb, this, this.update);
    }

    //更新数据
    update = (isAppend, data) => {
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    };

    getScrollStyle(){
        return styles.frame;
    }

    getListStyle(){
        return styles.list;
    }

    renderList(){
        var {data} = this.state;
        return data.map((item)=>{
            var {IMAGE_BIG_URL, PUBLISH_DATE, NEWS_TITLE, NEWS_LABEL_CN, NEWS_ID, SHOW_TYPE, LINK_URL} = item;
            IMAGE_BIG_URL = IMAGE_BIG_URL || "./images/work/home/new_default.png";
            return <InfoItem pic={IMAGE_BIG_URL} title={NEWS_TITLE} time={PUBLISH_DATE} type={NEWS_LABEL_CN} id={NEWS_ID} show={SHOW_TYPE} linkUrl={LINK_URL} fromlist={true}/>;
        });
    }
}

function injectAction(){
    return {getNewsList};
}

module.exports = connect(null,injectAction())(NewsList);
