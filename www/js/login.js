var base_url = "http://meca.ifrn.edu.br/buscapet/api/";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);
}

function onDeviceReady(){
	
}

function cadastrar(){
	
	$('#formCadastro').on('submit', function (e){
		e.preventDefault();
		var dados = $('#formCadastro').serialize();
		
		var senha = $("#senha").val();
		var senha2 = $("#senha2").val();
		var nome = $("#nomeUsu").val();
		var data_nascimento = $("#datanasc").val();
		var email = $("#email").val();

		if (senha != "" && senha2 != "" && nome != "" && email != "") {
			if (senha == senha2) {
				$.ajax({
				    type:"POST",
				    url: base_url+"usuario",
				    data: dados,
				    success: function (retorno){
				    	var dados = JSON.parse(retorno);
					    if (dados.mensagem) {
					    	Materialize.toast(dados.mensagem, 4000, 'rounded');
			            }else{
			                window.localStorage.setItem('usuario', retorno);
					    	
			                window.location.href = "selecionarAvatar.html";
			            }
			          
				        
			        }
			    });
			}else{
				Materialize.toast('As senhas informadas são diferentes!', 4000, 'rounded');
			}
		}else{
			Materialize.toast('Preenhca todos os campos!', 4000, 'rounded');
		}
		/*
		
	    */ 
	    return false;
	});
}

function login(){
	$('#formLogin').on('submit', function (e){
		e.preventDefault();
		var dados = $('#formLog').serialize();
		var senha = $('#senha').val();
		var email = $('#email').val();
		var url = base_url+"login/"+senha+"/"+email+"/"+1;
		if (senha != "" && email != "") {				
			$.ajax({
			    type:"GET",
			    url: url,
			    success: function (retorno){
				    if (retorno != "false") {
				    	window.localStorage.setItem('usuario', retorno);

		                window.location.href = "index.html";
		            }else{
		                Materialize.toast('Usuario não encontrado!', 4000, 'rounded');
		            }
		        }
		    });
		}else{
			Materialize.toast('Preencha todos os campos!', 4000, 'rounded');
		}
	 	
	    return false;
	});	
}
