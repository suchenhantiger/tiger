import SwipeableViews from 'react-swipeable-views';

import styles from './css/swipeableTable.css';

class SwipeableTable extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            index:-1
        }
    }

    handleChange = (value)=>{
        this.setState({
            index:value
        });
    }

    render(){

        systemApi.log("SwipeableTable render");

        var dotList = [],
            index = this.state.index;

        React.Children.forEach(this.props.children,(li, i)=>{
            if(i == index){
                dotList.push(<li key={i} className={styles.on}>&nbsp;</li>);
            }
            else{
                dotList.push(<li key={i}>&nbsp;</li>);
            }
        })

        return (
            <div className={styles.tableboxout}>
                <div className={styles.tablebox01}>
                    <div className={styles.tabletit}>
                        <span>{this.props.title}</span>
                    </div>
                    <div className={styles.tablelist}>
                        <SwipeableViews
                            index={this.state.index}
                            onChangeIndex={this.handleChange}>
                            {this.props.children}
                        </SwipeableViews>

                        <ul className={styles.ul_focus}>
                            {dotList}
                        </ul>
                    </div>
                </div>
            </div>
        );

    }

}

module.exports = SwipeableTable;
