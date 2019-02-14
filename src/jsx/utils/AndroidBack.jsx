var funcArr = [];

var AndroidBack = {
    register:function(cb){
        funcArr.push(cb);
        Client.backButton({type:"add"})
    },
    unregister:function(cb){
        for(var i=0;i<funcArr.length;i++){
            if(cb == funcArr[i]){
                funcArr.splice(i,1);
                Client.backButton({type:"delete"});
                break;
            }
        }
    },
    fire:function(){
        for(var i=0;i<funcArr.length;i++){
            var func = funcArr[i];
            func && func();
        }
    }
}

module.exports = AndroidBack;
