var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario = "";
var imgUri = "";
var longitude;
var latitude;
usuario = JSON.parse(window.localStorage.getItem("usuario"));

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);
}

function onDeviceReady(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
}

//caso de erro
function onError(error){
    alert("erro"+error.code + "Mensagem: " + error.message);
}

function getPhoto(values){
    if (values==1) {
            navigator.camera.getPicture(onSuccessImg, onError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType:Camera.EncodingType.JPEG
        });    
    }
    if (values==2) {
            navigator.camera.getPicture(onSuccessImg, onError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true, 
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType:Camera.EncodingType.JPEG
        });
    }
	

}

function onSuccessImg(imageData){
    var imagem = document.getElementById('imgPet');
    imagem.src = imageData;
    imgUri = imageData;

    $('#salvar').removeClass("col s12 z-depth-1 waves-effect waves-light btn-large white grey-text darken-text-2 disabled");
    $('#salvar').addClass("col s12 z-depth-1 waves-effect waves-light btn-large white grey-text darken-text-2");
}

function onError(message){
    alert("erro: "+ message);
}

function photoUpload(){
	$('#formCadPet').on('submit', function (e){
		e.preventDefault();
	    var options =  new FileUploadOptions();
	    options.fileKey = "fotoPet";
	    options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
	    options.mimeType="image/jpeg";

	    var dono = usuario.id;

	    var serverUrl = encodeURI(base_url+"pet");
	    var nome = $("#nome").val();
	    var raca = $("#raca").val();
	    var peso = $("#peso").val();
	    var tipo = $("#tipo").val();
	    var tamanho = $("#tamanho").val();
	    var sexo = $("#sexo").val();

	    var params = {};
		params.nomePet = nome;
		params.raca = raca;
		params.tipo = tipo;
		params.tamanho = tamanho;
		params.peso = peso;
		params.dono = dono;
		params.sexo = sexo;
		params.longitude = longitude;
		params.latitude = latitude


		options.params = params;


	    var ft =  new FileTransfer();
	    ft.upload(imgUri, serverUrl, onSuccesUpload, onErrorUpload, options);
	});
}

function onSuccesUpload(r){
    Materialize.toast('Pet adicionado com sucesso!', 4000, 'rounded');
}

function onErrorUpload(error){
    alert("An error has occurred: Code = " + error.code);
    alert("upload error source " + error.source);
    alert("upload error target " + error.target);
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
}


function preencherSelect(){
		$.ajax({
	        type:"GET",
	        url: base_url+"tipo",
	        success: function (retorno){
	            var dados = JSON.parse(retorno);
	            var $selectDropdown = 
	                  $("#tipo")
	                    .empty()
	                    .html(' ');
	            for (var i = 0; i < dados.length; i++) {
	                $selectDropdown.append(
	                  $("<option></option>")
	                    .attr("value", dados[i].id)
	                    .attr("data-icon", 'http://meca.ifrn.edu.br/buscapet/api/arquivos/imgtipo/'+dados[i].icone)
	                    .attr("class", 'left circle')
	                    .text(dados[i].nomeTipo)
	                );

	                // trigger event
	                $selectDropdown.trigger('contentChanged');


	              $('select').on('contentChanged', function() {
	                // re-initialize (update)
	                $(this).material_select();
	              });
	            }
	        }
	});
}