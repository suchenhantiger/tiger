

var webSocket = {
    webSocketIns:null,
    errNum:0,
    timeoutNum:0,
    interval:null,
    creatWebSocket:function (url){
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
                console.log(e);
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
                systemApi.log("WebSocket onmessage");
                systemApi.log(evt.data);
                this.timeoutNum=0;
                this.onMessage && this.onMessage(evt.data);
            };
            this.webSocketIns.onclose = (evt)=>{
                systemApi.log("WebSocket Closed!");
                this.clearIntervalIns();
                this.onClose && this.onClose(evt);
            };
            this.webSocketIns.onerror = (evt)=>{
                this.clearIntervalIns();
                this.errNum++;
                systemApi.log("WebSocket Error!"+this.errNum);
                this.onError && this.onError(evt);
            };

            this.clearIntervalIns();
            systemApi.log("WebSocket create interval!"+this.errNum);
            this.interval = setInterval(()=>{
                systemApi.log("WebSocket interval");
                this.timeoutNum++;
                if(this.timeoutNum>5){
                    systemApi.log("WebSocket timeout Error!"+this.errNum);
                    this.errNum++;
                    this.clearIntervalIns();
                    this.close();
                }
            },2000);



        }


        
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
    send:function(reqStr){
        //return;
        if(this.isValid()){
            return false;
        }
        if(this.webSocketIns!=null &&this.webSocketIns.readyState==1){
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