/** 首页构件 **/
class IndexFrame extends PureComponent{

    constructor(props,context) {
        super(props,context);
    }

    render(){
        systemApi.log("IndexFrame render");

        return (
            <div>
                <div className='g_main'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = IndexFrame;
