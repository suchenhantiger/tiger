import { combineReducers } from 'redux';
import {SHOW_LOADING, HIDE_LOADING, SHOW_MESSAGE, HIDE_MESSAGE} from './actions';

export function injectReducer(store, reducers){
    reducers = Object.assign(reducers, {
        base:baseReducer
    });
    store.replaceReducer(combineReducers(reducers));
}

function baseReducer(state,action){
    var {type} = action;
    state = state || {
        loading:false,
        messageshow:false,
        message:"",
        msgType:""
    };

    if(type == SHOW_LOADING){
        return Object.assign({}, state, {loading:true});
    }
    else if(type == HIDE_LOADING){
        return Object.assign({}, state, {loading:false});
    }
    else if(type == SHOW_MESSAGE){
        var {message,msgType} = action;
        return Object.assign({}, state, {messageshow:true,msgType,message});
    }
    else if(type == HIDE_MESSAGE){
        var {message} = action;
        return Object.assign({}, state, {messageshow:false});
    }

    return state;
}
