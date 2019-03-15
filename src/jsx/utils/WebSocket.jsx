

var webSocket = {
    webSocketIns:null,
    creatWebSocket:function (url){
        if(url==null||url==undefined||url.length<=1) return;
        if(this.webSocketIns==null || this.webSocketIns.readyState!=1){
            if(this.webSocketIns!=null) 
                this.webSocketIns.close();
            var clientId = systemApi.getValue("clientId");
            var time = new Date();
            time = time.getTime();
            var paramsStr = "clientId="+clientId+"&time="+time;
            url=url+"?"+paramsStr+"&sign="+md5(paramsStr+"&token="+systemApi.getValue("tigertoken"));
            this.webSocketIns = new WebSocket(url);
            this.webSocketIns.onopen = (evt)=>{
                this.onOpen && this.onOpen(evt);
            };
            this.webSocketIns.onmessage = (evt)=>{
                console.log("onmessage");
                this.onMessage && this.onMessage(evt.data);
            };
            this.webSocketIns.onclose = (evt)=>{
                console.log("WebSocket Closed!");
                this.onClose && this.onClose(evt);
            };
            this.webSocketIns.onerror = (evt)=>{
                console.log("WebSocket Error!");
                this.onError && this.onError(evt);
            };
        }
        
    },
    close:function(){
        if(this.webSocketIns!=null )
        this.webSocketIns.close();
    },
    send:function(reqStr){
        //return;
        if(this.webSocketIns!=null &&this.webSocketIns.readyState==1){
            this.webSocketIns.send(reqStr);
            console.log(reqStr);
            return true;
        }else 
            return false;
            
    },
    onOpen:null,
    onClose:null,
    onMessage:null,
    onError:null
};

module.exports =webSocket;