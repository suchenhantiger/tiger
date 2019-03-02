
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

        var {} = this.props;

        return(
            <div className={styles.floor}>
                  <div className={styles.currency_name}>
                      <p className={styles.c3}>欧元美元</p>
                      <p className={styles.c9+" "+styles.font_arial}>EURUSD200</p>
                  </div>
                  <div className={styles.icon_select}></div>
                  <div className={styles.icon_full_close} onClick={this.onclose}></div>
                  <div className={styles.optional_dt_price}>
                      <div className={styles.font56+" "+ styles.red}>1.34568</div>
                      <div className={styles.font24 +" "+styles.red+" "+ styles.text_al_right}>
                          <span>1.13%</span>/
                          <span>1.34567</span>
                      </div>
                  </div>
                  <div style={{clear:"both"}}></div>
                  <div className={styles.hq_other}>
                      <table cellspacing="0" cellpadding="0" width="100%">
                          <tbody>
                          <tr>
                              <td className={styles.c9}>最高：</td>
                              <td>1.12940</td>
                              <td className={styles.c9}>最低：</td>
                              <td>1.12940</td>
                              <td className={styles.c9}>今开：</td>
                              <td>1.12653</td>
                              <td className={styles.c9}>昨收：</td>
                              <td>1.12653</td>
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
