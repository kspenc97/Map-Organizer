

const logOut = document.getElementById("log-out");
//const timeBox = document.getElementById('time-box');
const storeNameInp = document.getElementById('store-name');
const storeNotesInp = document.getElementById('store-notes');
const storeCreationForm = document.getElementById('store-creation');
const storeListDiv = document.getElementById('store-list-div');
const windowDiv = document.getElementById('window-div');
const storeCreationBtn = document.getElementById('store-creation-btn');
//ICONS
const maroonI = document.getElementById('maroon-icon');
const greenI = document.getElementById('green-icon');
const blueI = document.getElementById('blue-icon');
const orangeI = document.getElementById('orange-icon');
const purpleI = document.getElementById('purple-icon');
const greyI = document.getElementById('grey-icon');
const goldI = document.getElementById('gold-icon');
//PIN WINDOW
const pinWindow = document.getElementById('store-pin-window');
const pinTitle = document.getElementById('store-pin-title');
const pinNotes = document.getElementById('store-pin-notes');
const pinStatusDiv = document.getElementById('store-pin-status');
const pinUpdate = document.getElementById('store-pin-last-update');
const pinButton = document.getElementById('store-pin-edit');
const pinTemp = document.getElementById('pin-temp-data');
//switching this number past 7 or past 14 will turn the color to yellow or red
//
//Window
const titleInput = document.getElementById('store-title-window-input')
const windowResetBtn = document.getElementById('reset-store-button');
const windowIcon = document.getElementById('window-icon');
const iconSelect = document.getElementById('icon-color-select');
const yellowStatus = document.getElementById('yellow-status-select');
const redStatus = document.getElementById('red-status-select');
const windowCloseButton = document.getElementById('window-close-btn');
//View Switch
const viewSwitch = document.getElementById('viewSwitch');
const map = document.getElementById('map');
const storeListCont = document.getElementById('store-list-div-container')
//
let storeView = false;
viewSwitch.addEventListener('click', function(){
    if(storeView === false){
        map.classList.add('hide');  
        storeListCont.classList.add('show');
        logOut.classList.add('hide');
        storeView=true;
        allStoresList(stores);
    } else if(storeView===true){
        map.classList.remove('hide');
        storeListCont.classList.remove('show');
        logOut.classList.remove('hide');


        storeView=false;

    }
})
//
let stores = getStorage();

storeCreationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let inputName = storeNameInp.value
    let inputNotes = storeNotesInp.value
    createStore(inputName, inputNotes);
    storeNameInp.value = '';
    storeNotesInp.value = '';
})
/////////////////
//CREATE SINGLE STORE
const createStore = function (storeName, storeNotes, markerData, tillYellow, tillRed) {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    //const storeCall = '';
    let store = {
        id: id,
        storeName: storeName,
        storeNotes: storeNotes,
        createdAt: timestamp,
        updatedAt: timestamp,
        tillYellow: 1,
        tillRed: 2,
        classColor: '',
        iconClass: 'fas fa-map-marker-alt fa-maroon',
        storeMarker: markerData,
        //storeCallFunc: '',
        storePinHTML: ''
    }
    /* const setStoreCall = () => {
        const storeCallFunc = () => {
            return store
        }
        return storeCallFunc
    }
    store.storeCallFunc = setStoreCall();
    console.log(store.storeCallFunc()); */
    stores.unshift(store);
    saveStores(stores);
    allStoresList(stores);
}
//Color calculator for full list
const timeColorAll = function (storeList) {
    storeList.forEach(function (store) {
        let nowVal = moment().valueOf();
        let lastUpdate = moment(store.updatedAt)
        let lastUpdateVal = lastUpdate.valueOf();
        let weekVal = 604800000;
        if ((nowVal - lastUpdateVal) >= (store.tillRed * weekVal)) {
            store.classColor = ' red'
        } else if ((nowVal - lastUpdateVal) >= (store.tillYellow * weekVal)) {
            store.classColor = ' yellow'
        } else {
            store.classColor = ''
        }
    })
    saveStores(storeList);
}

//let weekAgo = now.subtract(8, 'day');
/* 

const checkTime = function(storeList){
//getting current time when function runs & getting the UTC number
let time = moment();
let timeNum = time.valueOf();
//Looping over each store and checking
storeList.forEach(function(indivStore){
    //
if(((timeNum-indivStore.updatedAt.valueOf()) > 604800000) && ((timeNum-indivStore.updatedAt.valueOf())< 1209600000)){
    timeBox.classList.add('red');  
} else if((timeNum-indivStore.updatedAt.valueOf())> 1209600000){
    timeBox.classList.add('yellow');
} else {
    timeBox.classList.add('green');
}
}) 
}

checkTime(stores);
 */
/////////////

/* resetBtn.addEventListener('click', function(e){
    e.preventDefault();
    console.log(e.target.parentNode.className);
    e.target.parentNode.classList.remove("yellow");
    e.target.parentNode.classList.remove("red");

}) */



//Add Store Form
storeNameInp.addEventListener('input', function (e) {
    console.log(e.target.value);
})

storeNotesInp.addEventListener('input', function (e) {
    console.log(e.target.value);
})





//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//Add to render stores
const allStoresList = function (data) {
    storeListDiv.innerHTML = '';
    timeColorAll(data);
    data.forEach(function (store) {
        //Creating Base Div
        const singleStore = document.createElement('div');
        singleStore.className = 'single-store';
        //
        let lastUpdate = moment(store.updatedAt)
        singleStore.innerHTML = `
<h1 class='store-title'>${store.storeName}</h1>
<h5 class='notes-area'>${store.storeNotes}</h5>
<div class='time-box${store.classColor}'>
<p>Last visited: ${lastUpdate.fromNow()}</p>
</div>
<p>Store Icon</p>
<i class='${store.iconClass}'></i>
<hr>
`

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-store-btn'
        editBtn.innerText = 'Edit Store'
        editBtn.addEventListener('click', function () {
            fetchStore(store.id);
            windowDiv.classList.add('show');
        })
        //Adding to Full list div
        singleStore.appendChild(editBtn);
        storeListDiv.appendChild(singleStore);
    })
}
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//Fetch Single Stores
//
//
//
const fetchStore = function (storeId) {
     singStoreData = stores.find((function(store){
        if(store.id === storeId){
        return store;
        }
    }))
    windowDiv.innerHTML = '';
    let singleStore = document.createElement('div');
    //last update for individual
    let lastUpdate = moment(singStoreData.updatedAt)
    //main inner html
   singleStore.innerHTML = `
    <input id='store-title-window' placeholder='Add store name here!' value='${singStoreData.storeName}' />
    <textarea id='store-notes-window' placeholder='Add store notes here!'>${singStoreData.storeNotes}</textarea>
    <div class='time-box${singStoreData.classColor}'>
        <p>Last Visited: ${lastUpdate.fromNow()}</p>     
    </div>   
    `
    singleStore.appendChild(windowResetBtn);
    singleStore.appendChild(windowIcon);
    singleStore.appendChild(iconSelect);
    singleStore.appendChild(yellowStatus);
    singleStore.appendChild(redStatus);
    singleStore.appendChild(windowCloseButton);
    windowDiv.appendChild(singleStore);
    //Title input
    const storeTitle = document.getElementById('store-title-window');
    storeTitle.addEventListener('input', function (e) {
        singStoreData.storeName = e.target.value
        setupPinWindow(singStoreData);
        saveStores(stores);
        allStoresList(stores);
    })
    // Store Notes
    const notesArea = document.getElementById('store-notes-window');
    notesArea.addEventListener('input', function (e) {
        singStoreData.storeNotes = e.target.value
        setupPinWindow(singStoreData);
        saveStores(stores);
        allStoresList(stores);

    })
    //Icon Select
    iconSelect.addEventListener('change', function (e) {
        singStoreData.iconClass = ``
        windowIcon.className = ``
        singStoreData.iconClass = `${e.target.value}`
        windowIcon.className = `${e.target.value}`
        saveStores(stores);
        initMap();
    })
    //Yellow Select
    yellowStatus.addEventListener('change', function(e){
        let tempVal= parseFloat(e.target.value);
        singStoreData.tillYellow = tempVal;
        saveStores(stores);
        allStoresList(stores);
        fetchStore(singStoreData.id);
    })
    //Red Selet
    redStatus.addEventListener('change', function(e){
        let tempVal= parseFloat(e.target.value);
        singStoreData.tillRed = tempVal;
        saveStores(stores);
        allStoresList(stores);
        fetchStore(singStoreData.id);
    })
    //Timer Reset
    windowResetBtn.addEventListener('click', function () {
        let nowMoment = moment();
        let nowVal = nowMoment.valueOf();
        singStoreData.updatedAt = nowVal;
        setupPinWindow(singStoreData);
        saveStores(stores);
        allStoresList(stores);
        fetchStore(singStoreData.id);
    })
    //Close Button    
    windowCloseButton.addEventListener('click', function () {
        windowDiv.className = 'window-div';
    })
}


//Logout Button
logOut.addEventListener('click', function (e) {
    e.preventDefault();
    location.assign("/index.html")
})




//MAP SECTION
//
//
//
//MAP PIN WINDOW SETUP
const setupPinWindow = function(storeData){
    let lastUpdatePin = moment(storeData.updatedAt)
    pinTitle.textContent=storeData.storeName;
    pinNotes.textContent=storeData.storeNotes;
    pinStatusDiv.className= ``;
    pinStatusDiv.className= `store-pin-status${storeData.classColor.trim()}`;
    pinUpdate.textContent=`Last Visited: ${lastUpdatePin.fromNow()}`;
    pinTemp.textContent=storeData.id;
    }
pinButton.addEventListener('click', function(e){
    let tempId = pinTemp.textContent
    windowDiv.classList.add('show');
    fetchStore(tempId);
})
//MAP INIT FUNCTION
//
//
//
function initMap() {

    //Center on Denver
    var options = {
        zoom: 8,
        center: { lat: 39.742043, lng: -104.991531 }
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

/*     var marker = new google.maps.Marker({
        position: {
            lat: 39.4842027, lng: -104.9936873
        },
        map: map,
        icon: purpleI
    });   /////OLD MARKER FOR REFERENCE */

    google.maps.event.addListener(map, 'click', function (event) {
        createMarker({ coords: event.latLng, storeName: 'Not yet set', storeNotes: 'empty' });
    })

    //Create MARKER/Store FUNCTION
    //
    //
    function createMarker(props) {

        console.log(props)

        const marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            icon: `/images/map-icons/fas fa-map-marker-alt fa-maroon.png`,
        });
        markerData = {
            coords: props.coords
        }
        createStore('', '', markerData);
        timeColorAll(stores);
        loadMarkers(stores);
        }
    //
    //
    //Load all map markers from local storage

    const loadMarkers = function (stores) {
        stores.forEach(function (store) {
            addMarkers(store)
        })
    }
    //
    //
    //Render All Markers, used in forEach once on each
    function addMarkers(store) {
        console.log(store.iconClass)
        const marker = new google.maps.Marker({
            position: store.storeMarker.coords,
            map: map,
            icon: `/images/map-icons/${store.iconClass}.png`
                    });
        marker.addListener('click', function () {
            setupPinWindow(store);
            infoWindow.open(map, marker,);
        });
        const infoWindow = new google.maps.InfoWindow({
            content: pinWindow
        });
    }
    loadMarkers(stores);
}






initMap();




