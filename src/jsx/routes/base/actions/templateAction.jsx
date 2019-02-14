export function getTemplate(component, tmplid, update){
    return function(dispatch){
        var templates = require("../../../templates/"+tmplid+".json");
        update && update(templates);
    }
}
