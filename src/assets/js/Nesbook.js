/***************************************
		 	CARUSEL
/***************************************/

var viewportWidth, divWidth, tb;
	$(function() {

		viewport = $('#container').innerWidth();
		tb = $('#thumbs');
		divWidth = tb.outerWidth();

		$('#container').mousemove(function(e)
		{
      tb.css({left: ((viewport - divWidth)*((e.pageX / viewport).toFixed(3))).toFixed(1) +"px" });
 		});
		/*
    $('.history-block').on('click', function(){
      $('.history-block').css('width', '300px');
      $('.history-block').find('.title').css('width', '260px');
       $('.history-block .timeline').hide(300);
        $(this).css('width', '600px');
        $(this).find('.title').css('width', '500px');
       $(this).find('.timeline').show(800);
      $('#container').mousemove(function(e)
        {
          tb.css({left: ((viewport - divWidth-300)*((e.pageX / viewport).toFixed(3))).toFixed(1) + 300 + "px" });
          });
    });


    $('.timeline ul li').on('click', function(){
        $(this).parent().blink();
    });*/
});


/**********************************************************/
/***** FUNCIONES PARA CONTROL DE ACCESOS*******************/
/**********************************************************/
function _entrar(){
	$("#login").click(function(){
		var email = $("#inputuser").val();
		var password = $("#inputPassword").val();
		var _id = 0;
		var _canal = "";
		var _cliente = "";
		var _nivel = 0;

		// Checking for blank fields.
		if( email =='' || password ==''){
			$('input[type="text"],input[type="password"]').css("border","2px solid red");
			$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
			alert("Favor de proporcionar sus datos.");
		}else {
			var emailValido = validateEmail(email);

			if (email=="1234"){
				emailValido = true;
			}
			//Si el usuario tiene un formato válido
			emailValido = true; //se omite la validación de formato de correo
			if ( emailValido ){
				$.getJSON( "bd/usuarios.json" )
					.done(function( data ) {
						$.each( data, function( key, value ) {
							var returnedData = $.grep(data, function (element, index) {
									return element.correo == email.toLowerCase() && element.password == password;
							});
/*
							returnedData = $.grep(data, function (element, index) {
									return element.password == password;
							});
*/
							$.each( returnedData, function( key, value ) {
								_id = value.correo;
								_canal = value.canal;
								_cliente = value.clientes;
								_nivel = value.nivel;
							});

						});

						if(_id==0){
							alert("Datos incorrectos.");
						}else{
							set_logged_id(_id, _canal, _cliente, _nivel);
							get_logged_id();
							window.location.href = "home.html";
						}
					})
					.fail(function( jqxhr, textStatus, error ) {
						var err = textStatus + ", " + error;
						console.log( "Request Failed: " + err );
				});
			}else{
				alert("Usuario no válido.");
				$('input[type="text"]').css("border","2px solid red");
				$('input[type="text"]').css("box-shadow","0 0 3px red");
			}
		}
	});
}

function close_session(){
	BrowserStorage.set('_loginNesbook', 0);
	window.location.href = "index.html";
}

function get_logged_id(){
	var _loginNesbook = BrowserStorage.get('_loginNesbook');
	_loginNesbook = JSON.parse(_loginNesbook);

	if (_loginNesbook == 0){
		window.location.href = "index.html";
	}
	return _loginNesbook;
}

function set_logged_id(_id, _canal, _cliente, _nivel){
	//var _datos = '[{ "id": ' + _id + ', "nivel": ' + _nivel + ', "canal": ' + _canal + ', "cliente": ' + _cliente + ' }]';
	var _datos = {id: _id, nivel: _nivel, canal: _canal, cliente: _cliente};

	BrowserStorage.set('_loginNesbook', JSON.stringify(_datos));
}

function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
}

function get_llaves(){
	var _datos = get_logged_id();

	if (_datos===null){
		window.location.href="index.html";
	}else{
		var _canal = "";
		var _nivel = 0;

		$.each(_datos, function (index, value) {
			if(index=="canal"){
				_canal = value;
			}
			if(index=="nivel"){
				_nivel = value;
			}
		});

		$("#_canales").val(_canal);
		$("#_nivel").val(_nivel);
	}
}

/*Colapsa filtros*/
function colapsarFiltros(){
	$("#frm-filtros").slideToggle("slow");
}
