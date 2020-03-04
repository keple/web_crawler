let MkFlow = class{
    priorityMap = {
        login : 0,
        search : 1,
        doWork : 2
    }
    returnWorks(info){
        let works = [];
        if(info.isLogin.flag) works.push('login');
        if(info.isSearch.flag) works.push('search');
        
        works.push('doWork');

        return works;
    }
    setPriorityMap({map}){
        //login-> search-> doWork
        this.priorityMap = map || this.priorityMap;
        this.workNames = Object.keys(this.priorityMap);
    }
    

}
module.exports = MkFlow;