/*
    "nombre": "Raydelto",
    "apellido": "Hernández",
    "telefono": "809-555-2222"
*/

function cargar(){
    fetch("http://www.raydelto.org/agenda.php").then(function (datos){
        return datos.json();
    }).then(function(contactos){
        for(let x in contactos){
            document.getElementById('')
        }
    })
}

document.onload(cargar());