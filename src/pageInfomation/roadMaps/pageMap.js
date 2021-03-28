//sample data
module.exports = {
    "coupang" : {
        baseUrl:"https://www.coupang.com/np/search?component=&q=%EB%8B%8C%ED%85%90%EB%8F%84&channel=user",
        identifiers:"#productList .search-product-wrap",
        extIdentifiers:['.name','.price-value','.delivery'],
        extMatch:['name','price','arrival'],
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
    },
    "danawa" : {
        baseUrl : "http://search.danawa.com/dsearch.php?k1=cpu&module=goods&act=dispMain",
        identifiers:".product_list .prod_item",
        extIdentifiers:['.prod_name','.prod_spec_set','.price_sect'],
        extMatch:['name','spec','price'],
        pagination:true,
        paginationButtons:'.search_paging_nav .num_search_wrap .paging_number_wrap a',
        maxPage:10,
        isLogin:{
            flag:false,
            id:{
                elm:'',
                value:''
            },
            password:{
                elm:'',
                value:''
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
