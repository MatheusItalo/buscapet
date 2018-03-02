var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario;
var imgUri = "";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);
}

function onDeviceReady(){
    usuario = JSON.parse(window.localStorage.getItem("usuario"));
    EnviarEmail();
}

function EnviarEmail(){
    var dados = {
        email: usuario.email,
        nome: usuario.nomeUsu,
        id: usuario.id
    }

    $.ajax({
        type:"POST",
        url: base_url+"enviaremail",
        data: dados,
        success: function (retorno){
            Materialize.toast('Email enviado Com sucesso!', 4000, 'rounded');
        },
        error: function (error){
            alert(error.status);
        }
    });
    return false;
}

function login(){
        var senha = usuario.senha;
        var email = usuario.email;
        var url = base_url+"login/"+senha+"/"+email+"/"+1;              
            $.ajax({
                type:"GET",
                url: url,
                success: function (retorno){
                    if (retorno != "false") {
                        window.localStorage.setItem('usuario', retorno);

                        window.location.href = "index.html";
                    }else{
                        Materialize.toast('Email ainda não confirmado!', 4000, 'rounded');
                    }
                }
            });
}