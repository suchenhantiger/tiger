

var webSocket = {
    lastUrl:"",
    lastReqStr:"",
    webSocketIns:null,
    errNum:0,
    timeoutNum:0,
    interval:null,
    creatWebSocket:function (url){
        this.lastUrl = url;
        if(this.isValid()){
            systemApi.log("WebSocket create failue ! "+ this.errNum);
            return false;
        }

        if(url==null||url==undefined||url.length<=1) return;

        if(this.webSocketIns!=null &&  this.webSocketIns.readyState==0){
            this.webSocketIns.close();
        }

        if(this.webSocketIns==null || this.webSocketIns.readyState!=1){
            if(this.webSocketIns!=null) 
                this.webSocketIns.close();
            var clientId = systemApi.getValue("clientId");
            var time = new Date();
            time = time.getTime();
            var paramsStr = "clientId="+clientId+"&time="+time;
            url=url+"?"+paramsStr+"&sign="+md5(paramsStr+"&token="+systemApi.getValue("tigertoken"));
            try{
                this.webSocketIns = new WebSocket(url);
            }catch(e) {
                systemApi.log(e);
                this.errNum++;
                return;

            }
           
            systemApi.log("WebSocket create instance");
            this.webSocketIns.onopen = (evt)=>{
                systemApi.log("WebSocket onopen");
                this.errNum=0;
                this.timeoutNum=0;
                this.onOpen && this.onOpen(evt);
            };
            this.webSocketIns.onmessage = (evt)=>{
                systemApi.log("WebSocket onmessage :"+this.timeoutNum);
                systemApi.log(evt.data);
                this.timeoutNum=0;
                
                this.onMessage && this.onMessage(evt.data);
            };
            this.webSocketIns.onclose = (evt)=>{
                systemApi.log("WebSocket Closed!");
               // this.clearIntervalIns();
                this.onClose && this.onClose(evt);
            };
            this.webSocketIns.onerror = (evt)=>{
               // this.clearIntervalIns();
                this.errNum++;
                systemApi.log("WebSocket Error!"+this.errNum);
                this.onError && this.onError(evt);
            };

            this.createIntervalIns();
        }
     
    },
    retryConnect:function(){
        systemApi.log("WebSocket retry connecting ");
        if(this.lastReqStr == ""){
            systemApi.log("WebSocket lastReqStr is null ");
            return;

        }

        //发送失败就重新创建一个
        this.webSocketIns.onopen = (evt)=>{
            systemApi.log("WebSocket retry onopen");
            this.timeoutNum=0;
            this.send(this.lastReqStr)
        };
        this.creatWebSocket(this.lastUrl);
        
    },
    clearIntervalIns:function(){
        if(this.interval){
            clearInterval(this.interval);
            this.interval = null;
            this.timeoutNum = 0;
        }


    },
    close:function(){
        systemApi.log("WebSocket interval 2 close");
        if(this.webSocketIns!=null )
        this.webSocketIns.close();
    },
    createIntervalIns:function(){
        this.clearIntervalIns();
        systemApi.log("WebSocket create interval!"+this.errNum);
        this.interval = setInterval(()=>{
            systemApi.log("WebSocket interval "+this.timeoutNum);
            this.timeoutNum++;
            if(this.timeoutNum>5){
                systemApi.log("WebSocket timeout Error!"+this.errNum);
                this.errNum++;
                this.clearIntervalIns();
                this.close();
                this.retryConnect();
            }
        },2000);

    },
    send:function(reqStr){
        
        this.lastReqStr = reqStr;
        if(this.isValid()){
            return false;
        }
        if(this.webSocketIns!=null &&this.webSocketIns.readyState==1){
            if(this.interval ==null )
                this.createIntervalIns();
            this.webSocketIns.send(reqStr);
            systemApi.log("WebSocket send :"+reqStr);
            return true;
        }else 
            return false;
            
    },
    isValid:function(){
        return false;
        //return this.errNum>=5;
    },
    onOpen:null,
    onClose:null,
    onMessage:null,
    onError:null
};

module.exports =webSocket;
//tagtest