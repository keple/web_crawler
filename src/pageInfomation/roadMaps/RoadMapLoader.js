let Node = require("../data/Node.js");
class RoadMapLoader{

    constructor(){
        
    }
    LoadNodeObject(obj){
        return new Node(obj);
    }

}
module.exports = RoadMapLoader;