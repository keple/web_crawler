//sample data
module.exports = {
    "coupang" : {
        baseUrl:"https://www.coupang.com/np/search?q=cpu&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=&backgroundColor=",
        identifiers:"#productList .search-product-wrap",
        extIdentifiers:['.name','.price-value','.arrival-info','.used-product-info'],
        extMatch:['name','price','arrival','info'],
        pagination:true,
        paginationButtons:'.search-pagination a',
        paginationButtonsXPath:"//div[@class='search-pagination']//a[text()='{chgposition}']",
        storage:[],
        maxPage : 9,
        isLogin : {
            flag:false,
            id: {
                elm : '',
                value : ''
            },
            password:{
                elm : '',
                value : ''
            },
            loginButton:''
        },
        isSearch:{
            flag:false,
            keywords:[],
            searchElm:'',
            searchButton:''
        }
        
        
    }
};
