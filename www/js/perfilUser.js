var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario = "";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);

}

function onDeviceReady(){
    
}

function mostrarDados(id){

    var url = base_url+"usuario/"+id;
    $.ajax({
        type:"GET",
        url: url,
        success: function (retorno){
            if (retorno != "false") {
                var dados = JSON.parse(retorno);
                $("#imgUser").attr("src", "http://meca.ifrn.edu.br/buscapet/api/arquivos/imguser/"+dados.fotoUsu);
                $("#nomeUser").text(dados.nomeUsu);


            }else{
                Materialize.toast('Usuario não encontrado!', 4000, 'rounded');
            }
           }
    });
    buscarPets(id);
}

function buscarPets(idUser){
    var url = base_url+"petsbyusu/"+idUser;
    $.ajax({
        type:"GET",
        url: url,
        success: function (retorno){
            if (retorno.length) {
                var dados = JSON.parse(retorno);
                for (var i = 0; i < dados.length; i++) {
                    var pet = dados[i];
                    var foto = "http://meca.ifrn.edu.br/buscapet/api/arquivos/imgpet/"+dados[i].fotoPet;
                    $("#pets").append("<div class='col s4 s12'>"+
                          "<div class='card small'>"+
                            "<div class='card-image'>"+
                              "<img src='"+foto+"'>"+
                              "<span class='card-title'>"+dados[i].nomePet+"</span>"+
                            "</div>"+
                            "<div class='card-content'>"+
                              "<span>Sexo: "+dados[i].sexo+"</span><br>"+
                              "<span>Raça: "+dados[i].raca+"</span>"+
                            "</div>"+
                            "<a id='pet"+dados[i].id+"' onclick = perfil('"+dados[i].id+"') class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>&#xE8F4;</i></a>"+
                          "</div>"+
                        "</div>");
                }  
            }     
        }
    });
}

function perfil(id){
    window.localStorage.setItem('idPet', id);
    window.location.href = "perfilpet.html";
}
