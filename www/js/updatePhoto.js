var base_url = "http://meca.ifrn.edu.br/buscapet/api/";
var usuario;
var imgUri = "";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady);
}

function onDeviceReady(){
    usuario = JSON.parse(window.localStorage.getItem("usuario"));
}

function getPhoto(values){
    if (values==1) {
            navigator.camera.getPicture(onSuccess, onError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType:Camera.EncodingType.JPEG
        });    
    }
    if (values==2) {
            navigator.camera.getPicture(onSuccess, onError, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true, 
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType:Camera.EncodingType.JPEG
        });
    }
	

}

function onSuccess(imageData){
    var imagem = document.getElementById('fotoUsu');
    imagem.src = imageData;
    imgUri = imageData;

    $('#mudar').removeClass("col s3 z-depth-1 waves-effect waves-light btn-large white grey-text darken-text-2 disabled");
    $('#mudar').addClass("col s3 z-depth-1 waves-effect waves-light btn-large white grey-text darken-text-2");
}

function onError(message){
    alert("erro: "+ message);
}

function photoUpload(){
    var options =  new FileUploadOptions();
    options.fileKey = "fotousu";
    options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
    options.mimeType="image/jpeg";

    var id = usuario.id;

    var serverUrl = encodeURI(base_url+"fotousu/"+id);
    
    var ft =  new FileTransfer();
    ft.upload(imgUri, serverUrl, onSuccesUpload, onErrorUpload, options);
}

function onSuccesUpload(r){
    var senha = usuario.senha;
    var email = usuario.email;
    var url = base_url+"login/"+senha+"/"+email+"/"+0;
    $.ajax({
         type:"GET",
         url: url,
         success: function (retorno){
              window.localStorage.setItem('usuario', retorno);

              Materialize.toast('Foto alterada com sucesso!', 4000, 'rounded');
              window.location.href = "confirmacao.html";
       }
    });
}

function onErrorUpload(error){
    alert("An error has occurred: Code = " + error.code);
    alert("upload error source " + error.source);
    alert("upload error target " + error.target);
}