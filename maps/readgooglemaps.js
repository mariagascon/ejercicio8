function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        /* Aqui l'objecte response representa l'objecte JSON que ens 
           ha retornat el servidor */
        
        document.getElementById("tabla").innerHTML = "<tr class='encabezado'><th class='name'>Nombre</th><th class='vericity'>Dirección</th><th class='lat'>Latitud</th><th class='long'>Longitud</th><th class='tip'>Tipo de establecimiento</th><th class='icon'>Icono</th></tr>";
        /* Introduce dentro del elemento "tabla" la información que se encuentra
        tras el = */

        for (i=0; i<response.results.length; i++) {
        /* Este 'for' recorre todos los resultados con el objetivo de imprimir
        aquellos que se encuentren entre la posición 0 y la última posición */
            document.getElementById("tabla").innerHTML +=
            /* Introduce dentro del elemento "tabla" la información que se encuentra
            tras el =; en este caso todos los resultados correspondientes a nombre, dirección, 
            longitud y latitud, tipología e iconos los introduce a través de filas y celdas*/ 
            "<tr><td class='nombre'>"+response.results[i].name+"</td>"+
            "<td class='direccion'>"+response.results[i].vicinity+"</td>"+
            "<td class='latitud'>"+response.results[i].geometry.location.lat+"</td>"+
            "<td class='longitud'>"+response.results[i].geometry.location.lng+"</td>"+
            "<td class='tipologia'>"+response.results[i].types+"</td>"+
            "<td class='icono'><img src=' "+response.results[i].icon+" '></td></tr>";
        }   
    });
}

