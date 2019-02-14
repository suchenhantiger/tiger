import styles from './css/share.css';
import FullScreenView from '../fullscreen/FullScreenView';

class Share extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }
    close = ()=>{
      this.props.closeShare();
    }
    shareFriend = ()=>{
      systemApi.log("分享给朋友");
    }
    shareFrcl = ()=>{
      systemApi.log("分享到朋友圈");
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Share render");
        return (
            <FullScreenView mask={true}>
                <div className={styles.popupbox}>
                    <div className={styles.pp_cont}>
                        <h3>分享到：</h3>
                        <div className={styles.share_icons}>
                            <ul>
                                <li onClick={this.shareFriend}>
                                    <a className={styles.wx_friend}>微信好友</a>
                                </li>
                                <li onClick={this.shareFrcl}>
                                    <a className={styles.wx_frcl}>朋友圈</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.btn_cancel} onClick={this.close}>
                            <a >取消</a>
                        </div>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = Share;
