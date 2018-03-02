var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario = "";
var idUser;

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);

}

function onDeviceReady(){
    
}

function mostrarDados(id){

    var url = base_url+"pet/"+id;
    $.ajax({
        type:"GET",
        url: url,
        success: function (retorno){
            if (retorno != "false") {
                var dados = JSON.parse(retorno);
                $("#imgPet").attr("src", "http://meca.ifrn.edu.br/buscapet/api/arquivos/imgpet/"+dados.fotoPet);
                $("#nome").text(dados.nomePet);
                $("#peso").html(dados.peso);
                $("#sexo").html(dados.sexo);
                $("#tipo").html(dados.nome_tipo);
                $("#dono").html(dados.nome_user);
                idUser = dados.id_user;
            }else{
                Materialize.toast('Pet não encontrado!', 4000, 'rounded');
            }
           }
    });
}

function irPerfil(){
    window.localStorage.setItem('idUser', idUser);                        
    window.location.href = "perfilusuario.html";
}

