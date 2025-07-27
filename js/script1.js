/* ---------- Mapa --------- */

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(sucess, error, options)
}else{
    alert("Los servicios de geolocolaizacion no estan disponibles")
}

function sucess(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let map = L.map('map', {
        center: [latitude, longitude],
        zoom: 10
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mi OpenStreetMap'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints:[
            L.latLng(latitude, longitude),
            L.latLng(41.35846197887758, 2.1239872421599526)
        ],
        lenguage: 'es',
        
    }).addTo(map)
}

function error(){

}