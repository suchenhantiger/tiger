import IScrollView from '../../../components/common/iscroll/IScrollView';
import CommonItem from './CommonItem';
import styles from '../../../../css/components/common/commonTable/commonTable.css';

class CommonTable extends PureComponent {
    static defaultProps = {
        show: true,
        source: 'source',
        titleArr: []
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }
    }
    componentDidMount() {
        this.getData(1, false);
    }

    componentDidUpdate(){
        this.refs.scroll.refresh();
    }

    getData(page, append, cb) {
        this.requestJSON(this.props.source, {
            page
        }, (data) => {
            var list = data.data, {scroll} = this.refs;
            if (append) {
                list = this.state.data.concat(list);
            }
            this.setState({data: list});
            if (cb) {
                cb();
            }
        });
    }

    renderItems() {
        var list = [], {data} = this.state;
        for (var i = 0; i < data.length; i++) {
            var item = [], {titleArr} = this.props;
            for (var j = 0; j < titleArr.length; j++)
                item[j] = data[i][titleArr[j].jsonKey];
            list.push(<CommonItem key={i} itemdata={item}/>);
        }
        return list;
    }
    renderTitles() {
        var list = [], {titleArr} = this.props;
        for (var i = 0; i < titleArr.length; i++) {
            list.push(
                <th key={i} width={titleArr[i].itmeWidth}>
                    <span>{titleArr[i].itemTitle}</span>
                </th>
            );
        }
        return list;
    }

    loadMore() {
        this.getData(++this.state.page, true, () => {
            var {scroll} = this.refs;
            scroll.hideLoading();
        });
    }
    render() {

        systemApi.log("ProductHistoryPage render");
        var {show} = this.props,
            scrollCls = styles.scrollView + " " + (show
                ? ""
                : styles.hidden);
        return (
            <div className={styles.tablelist}>
                <IScrollView className={scrollCls} canDownFresh={true} downFresh={this.loadMore.bind(this)} ref="scroll">

                    <table width="100%">
                        <tbody>
                            <tr>
                                {this.renderTitles()}
                            </tr>
                            {this.renderItems()}

                        </tbody>
                    </table>
                </IScrollView>
            </div>

        )
    }

}

module.exports = CommonTable;
