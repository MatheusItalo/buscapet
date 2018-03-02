var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario = "";
var map;
var janelas = {};

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);

}

function onDeviceReady(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position){

    
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);
    
    var mapOptions = {
        center: latLong,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $.ajax({
            type:"GET",
            url: base_url+"pets",
            success: function (retorno){
                var dados = JSON.parse(retorno);
                for (var i = 0; i < dados.length; i++) {
                    var latLong = new google.maps.LatLng(dados[i].latitude, dados[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLong,
                        title: dados[i].nome_tipo, 
                        icon: {
                          url: base_url+"arquivos/imgtipo/"+dados[i].icone_tipo,
                          size: {
                          width: 50,
                          height: 65
                        }
                      }
                    });

                    var contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h4 id="firstHeading" class="firstHeading">'+dados[i].nomePet+'</h4>'+
                        '<div id="bodyContent">'+
                        '<p class="texto"> raça: '+dados[i].raca+'</p>'+
                        '<p class="texto"> peso: '+dados[i].peso+'</p>'+
                        '<p class="texto"> dono: '+dados[i].nome_user+'</p>'+
                        '<p><a href="#" onclick="verDetalhes('+dados[i].id+')">'+
                        'Ver detalhes</a> '+
                        '</div>'+
                        '</div>';
                    

                    janelas[i] = new google.maps.InfoWindow({
                        content: contentString
                    });


                    marker.setMap(map);
                    abrirJanela(i, marker);
                }
            }
    });

}

function abrirJanela(i, marca){
    marca.addListener('click', function() {
        janelas[i].open(map, marca);
    });
}

//caso de erro
function onError(error){
    alert("erro"+error.code + "Mensagem: " + error.message);
}

function sair(){
    window.localStorage.removeItem('usuario');
    window.location.href = "telaInicial.html";
}

function verDetalhes(id){
    window.localStorage.setItem('idPet', id);
    window.location.href = "perfilpet.html";
}

function perfil(){
    var user = JSON.parse(window.localStorage.getItem("usuario"));
    window.localStorage.setItem('idUser', user.id);                        
    window.location.href = "perfilusuario.html";
}
