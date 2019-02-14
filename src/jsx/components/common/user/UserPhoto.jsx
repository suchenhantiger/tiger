import styles from './css/userphoto.css';

class UserPhoto extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    headimgOnLoad=()=>{
        setTimeout(()=>{
            $(this.refs.headimg).css('visibility','visible');
        },200);
    }

    /*
    *notice：如果imgpath有传，直接打开imgpath的图片url，如果没有传imgpath，要得到头像，则必须传id和type，服务端根据id和type返回图片
    *param: gender "1"-男性 "2"-女性 如果不穿或者传null，默认为"1"
    *param: imgpath 头像图片的地址，可以不传或者传null和空
    *param: type id的类型 0-OAID 1-工号(userid)
    */
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("UserPhoto render");

        var rootUrl = systemApi.getValue("rootUrl"),
            {imgpath, gender, type, id} = this.props,
            newgender = gender?gender:"1",
            genderStr = newgender=="1"?"man":"woman",
            imgmaskCls = this.mergeClassName(styles.imgmask, styles['imgmask_'+newgender]),
            newPath = (((type+'')!='') && id!='')? (rootUrl+"renderbill/QueryNoAuthInfoAction.do?value(querytype)=userimage&value(id)="+id+"&value(gender)="+genderStr+"&value(idtype)="+type):"";
        return (
            <span className={imgmaskCls}>
                {(!imgpath && !newPath)?null:<img src={imgpath || newPath} onLoad={this.headimgOnLoad} ref="headimg"/>}
            </span>
        );
    }

}


module.exports = UserPhoto;
