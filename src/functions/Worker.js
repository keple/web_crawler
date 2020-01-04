let Worker = class{

    constructor(){
        this.work = undefined;
    }
    saveWorks(promise){
        this.work = promise;
    }
    doWork(){
        if(!this.work){
            throw new Error("등록된 작업이 없습니다.");
        }
        
    }


}

module.export = Worker;