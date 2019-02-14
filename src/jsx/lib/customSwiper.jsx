
import styles from '../../css/components/common/customswiper/swiper.css';

let idIndx = 1;

function customSwiper(options){
    var {selector, data, autoplay, clickcb} = options;
    this.selector = selector;
    this.data = data;
    this.tIndex = -1;
    this.curIndex = 0;
    this.perHeight = 40;
    this.autoplay = autoplay || 2000;
    this.clickcb = clickcb;
    this.id = "customSwiper"+idIndx++;
    this.render();
    this.bindEvent();
}

customSwiper.prototype.bindEvent = function(){
    var {selector} = this,
        that = this;
    $(selector).delegate("."+styles.item, "click", function(){
        var {data, clickcb} = that,
            index = $(this).attr("data-index"),
            item = data[index];

        clickcb && clickcb(item);
    });
}

customSwiper.prototype.destroy = function(){
    clearInterval(this.tIndex);
}

customSwiper.prototype.setList = function(data){
    this.data = data;
    this.render();
}

customSwiper.prototype.render = function(){
    var html = [],
        {data, selector, autoplay, id} = this;
    if(data.length) data.push(data[0]);
    html.push('<div id="'+id+'" class="'+styles.frame+'">');
    for(var i=0;i<data.length;i++){
        var {title} = data[i];
        html.push('<div class="'+styles.item+'" data-index="'+i+'">');
            html.push('<span>'+title+'</span>');
        html.push('</div>');
    }
    html.push('</div>');

    $(selector).html(html.join(""));
    clearInterval(this.tIndex);
    this.tIndex = setInterval(()=>{this.scroll()}, autoplay);
}

customSwiper.prototype.scroll = function(){
    var {data, curIndex, id} = this,
        total = data.length,
        nextIndex = curIndex>=total-1?1:++curIndex,
        translateY = "-"+nextIndex*40+"px";

    this.curIndex = nextIndex;

    $("#"+id+"."+styles.frame).css("transform","translateY("+translateY+")");

    if(nextIndex>=total-1){
        setTimeout(function(){
            $("#"+id+"."+styles.frame).css("transition-duration","0ms").css("transform","translateY(0px)");
            setTimeout(function(){
                $("#"+id+"."+styles.frame).css("transition-duration","300ms");
            }, 50);
        },300);
    }
}

module.exports = customSwiper;
