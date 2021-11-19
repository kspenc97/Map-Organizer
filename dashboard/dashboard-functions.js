//get Local Storage
const getStorage = function(){
    const storesJSON = localStorage.getItem('stores');

    if(storesJSON !== null){
        return JSON.parse(storesJSON)
    } else {
        return []
    }
}
// save Stores to Storage
const saveStores = function(storesData){
localStorage.setItem('stores', JSON.stringify(storesData));

}


