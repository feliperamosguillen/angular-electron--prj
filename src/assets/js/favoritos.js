/*
function nextFavoriteNumber(){
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  data = JSON.parse(retrievedObject);
  var joe = 0;
  //Contamos el número de favoritos actuales
  $.each(data, function (index, value) {
      joe = joe + 1;
  });
  //Devolvemos el número del siguiente favorito
  return joe+1;
}

function saveFavorite(_seccion, _detalle){
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  var data = {};
  data = JSON.parse(retrievedObject);
  var b_seccion = false;
  var b_detalle = false;
  var _nombre = "";
  var indexKey = 0;

  $.each(data, function (index, value) {
     var dataChild = value;

     //console.log(dataChild);
     $.each(dataChild, function (indexChild, valueChild) {
       if(indexChild=="seccion"){
         if(valueChild == _seccion){
           b_seccion = true;
           _seccion = _seccion;
         }
       }

       if(indexChild=="detalle"){
         if(valueChild == _detalle){
           b_detalle = true;
           _detalle = _detalle;
         }
       }

       if(b_seccion == true && b_detalle==true){
         if(indexChild=="nombre"){
           _nombre = valueChild;
            indexKey = index;

            var favorito = {seccion: _seccion, detalle: _detalle, nombre: _nombre};

            data[indexKey] = favorito;
         }
       }
     });
  });

  if((b_seccion == false && b_detalle == false) ||
     (b_seccion == true && b_detalle == false)){

    var favorito = {seccion: _seccion, detalle: _detalle, nombre: 'Favorito ' + nextFavoriteNumber()};

    //if(!retrievedObject === null){
    //  data = JSON.parse(retrievedObject);
    //}
    console.log(data);
    if(data===null){
      var data = {};

      data[0] = favorito;
    }else {
      data[nextFavoriteNumber()-1] = favorito;
    }

  }

  BrowserStorage.set('favoritosNesbook', JSON.stringify(data));

  /*
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  console.log('retrievedObject: ', JSON.parse(retrievedObject));

  var ciResponseText = document.getElementById('jsonText');
  var obj = JSON.parse(retrievedObject);
  ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
  ---cerrar comentario
}
*/

function nextFavoriteNumber(){
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  data = JSON.parse(retrievedObject);
  var joe = 0;
  //Contamos el número de favoritos actuales
  $.each(data, function (index, value) {
      joe = joe + 1;
  });
  //Devolvemos el número del siguiente favorito
  return joe+1;
}

function saveFavorite(_seccion, _detalle){
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  var data = {};
  data = JSON.parse(retrievedObject);
  var b_seccion = false;
  var b_detalle = false;
  var _nombre = "";
  var indexKey = 0;
  var _node = 0;
  var f = new Date();
  var _fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
  var _descripcion = "";

  _descripcion = "Filtros seleccionados";

  $.each(data, function (index, value) {
     var dataChild = value;

     //console.log(dataChild);
     $.each(dataChild, function (indexChild, valueChild) {
       if(indexChild=="seccion"){
         if(valueChild == _seccion){
           b_seccion = true;
           _seccion = _seccion;
         }
       }

       if(indexChild=="detalle"){
         if(valueChild == _detalle){
           b_detalle = true;
           _detalle = _detalle;
         }
       }

       if(indexChild=="fecha"){
         _fecha = valueChild;
       }

       if(indexChild=="node"){
         _node = valueChild;
       }

       if(indexChild=="descripcion"){
         _descripcion = valueChild;
       }

       if(b_seccion == true && b_detalle==true){
         if(indexChild=="nombre"){
           _nombre = valueChild;
            indexKey = index;
            _node = indexKey + 1;
            var favorito = {seccion: _seccion, detalle: _detalle, nombre: _nombre, descripcion: _descripcion, node: _node, fecha: _fecha};

            data[indexKey] = favorito;
         }
       }
     });
  });

  if((b_seccion == false && b_detalle == false) ||
     (b_seccion == true && b_detalle == false)){
    _node = nextFavoriteNumber();

    if(_seccion=="Catlead" || _seccion=="Shopper" || _seccion=="Biblioteca" || _seccion=="Modelo 90-60-30"){
      var arrDetalle = _detalle.split("|");
      _nombre = arrDetalle[1];
      _detalle = arrDetalle[0];
      _descripcion = "Documento " +  _seccion;
    }else{
      _nombre = _seccion + ' ' + _node;
    }


    var favorito = {seccion: _seccion, detalle: _detalle, nombre: _nombre, descripcion: _descripcion, node: _node, fecha: _fecha};

    //if(!retrievedObject === null){
    //  data = JSON.parse(retrievedObject);
    //}
    //console.log(data);
    if(data===null){
      var data = {};

      data[0] = favorito;
    }else {
      data[nextFavoriteNumber()-1] = favorito;
    }

  }

  BrowserStorage.set('favoritosNesbook', JSON.stringify(data));
/*
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  console.log('retrievedObject: ', JSON.parse(retrievedObject));


  var ciResponseText = document.getElementById('jsonText');
  var obj = JSON.parse(retrievedObject);
  ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
*/
  return _node;
}

function deleteFavorite(_node, reload){
  //alert(_node);
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  var data = {};
  data = JSON.parse(retrievedObject);
  //console.log(data);
  delete data[_node-1];
  BrowserStorage.set('favoritosNesbook', JSON.stringify(data));

  if(reload)
    window.location.href = "favoritos.html";
}

function listFavorites(){
  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  var data = {};
  data = JSON.parse(retrievedObject);
  var html = "";
  var _seccion = "";

  //console.log(data);
  $.each(data, function (index, value) {
     var dataChild = value;

     if (dataChild.seccion=="Lista de Precios"){
       _seccion = "lista-de-precios"
     }else if (dataChild.seccion=="Precio Promocional"){
       _seccion = "precio-promocional"
     }else if (dataChild.seccion=="Inversión"){
       _seccion = "inversion"
     }else if (dataChild.seccion=="Modelo 90-60-30"){
       _seccion = "906030"
     }else{
       _seccion = dataChild.seccion.toLowerCase();
     }

     html += "<div class=\"col-md-10 col-md-offset-1 favorito-item\" id=\"fav-1\" style=\"display: inline-block; position: relative;\">";
     html += "   <div class=\"icon-favorito\">";
     html += "    <img src=\"doc/img/favoritos/favorito.png\">";
     html += "  </div>";
     html += "  <div class=\"favorito-nombre\">";
     html += "    <a href='" + _seccion + ".html?" + dataChild.detalle + "&node=" + dataChild.node + "' style='color: #fff; font-weight: bold;'>" + dataChild.nombre + "</a><br>";
     html += "    <span><b>" + dataChild.descripcion + "</b> - Creado el día: <b>" + dataChild.fecha + "</b></span>";
     html += "  </div>";
     html += "  <div class=\"icon-delete\" onclick=\"javascript: deleteFavorite('" + dataChild.node + "', true);\">";
     html += "    <img src=\"doc/img/favoritos/delete.png\">";
     html += "  </div>";
     html += "</div>";
  });

  return html;
}

function esFavorito(_detalle){
  var bFavorito = false;

  var retrievedObject = BrowserStorage.get('favoritosNesbook');
  var data = {};
  data = JSON.parse(retrievedObject);

  //console.log(data);
  $.each(data, function (index, value) {
     var dataChild = value;

     if (dataChild.detalle == "nombre=" + _detalle){
       bFavorito = true;
     }
  });

  return bFavorito;
}
