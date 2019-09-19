class Node {
    constructor(initObj){
        this.obj = initObj;
    }
    setProp(prop){
        this.obj = {
            ...this.obj,
            ...prop
        }
    }
    getProp(name){
        return this.obj[name];
    }
}
module.exports = Node;