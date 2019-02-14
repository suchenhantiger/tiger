import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export function getStoreConfig(){
    return applyMiddleware(thunk)(createStore)(function(){},{});
}
