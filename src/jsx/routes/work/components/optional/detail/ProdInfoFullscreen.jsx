
import styles from './css/prodInfoFullscreen.less';

class ProdInfo extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    onclose = ()=>{
        var {onClose}=this.props;
        onClose && onClose();
    }
    //渲染函数
    render(){

        var {prodName,prodCode,price} = this.props;
        var {bid="--",updowndiff="--",updownratio="--",
        tdhigh="--",tdlow="--",tdopen="--",ydclose="--"} = price;

        return(
            <div className={styles.floor}>
                  <div className={styles.currency_name}>
                      <p className={"c3 font28 mg-bt-10"}>{prodName}</p>
                      <p className={"c9 font24 "+styles.font_arial}>{prodCode}</p>
                  </div>
                  <div className={styles.icon_select}></div>
                  <div className={styles.icon_full_close} onClick={this.onclose}></div>
                  <div className={styles.optional_dt_price}>
                      <div className={styles.font56+" "+ styles.red}>{bid}</div>
                      <div className={styles.font24 +" "+styles.red+" "+ styles.text_al_right}>
                          <span>{updownratio}%</span>/
                          <span>{updowndiff}</span>
                      </div>
                  </div>
                  <div style={{clear:"both"}}></div>
                  <div className={styles.hq_other}>
                      <table cellspacing="0" cellpadding="0" width="100%">
                          <tbody>
                          <tr>
                              <td className={styles.c9}>最高：</td>
                              <td>{tdhigh}</td>
                              <td className={styles.c9}>最低：</td>
                              <td>{tdlow}</td>
                              <td className={styles.c9}>今开：</td>
                              <td>{tdopen}</td>
                              <td className={styles.c9}>昨收：</td>
                              <td>{ydclose}</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
                  <div className={styles.line_full} ></div>
              </div>
        );
    }

}

module.exports = ProdInfo;
