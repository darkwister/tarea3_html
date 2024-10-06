
let contactosCargados = [];
function cargar() {
    fetch("http://www.raydelto.org/agenda.php")
    .then(response => response.json())
    .then(contactos => {
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = "";

        contactos.forEach(contacto => {
            const li = document.createElement("li");
            li.textContent = `${contacto.nombre} ${contacto.apellido} - ${contacto.telefono}`;
            contentElement.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error al cargar los contactos:", error);
    });
}


function registrarContacto() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre === "" || apellido === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    let contacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch("http://www.raydelto.org/agenda.php", {
        method: 'POST',
        body: JSON.stringify(contacto), 
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    .then(response => response.json()) 
    .then(data => {
        console.log("Contacto registrado:", data);
        cargar(); 
    })
    .catch(error => {
        console.error("Error al registrar el contacto:", error);
    });
}

function buscarContacto(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado

    const searchTerm = document.getElementById('search').value.toLowerCase(); // Obtener el valor del buscador

    const resultadosFiltrados = contactosCargados.filter(contacto => {
        return contacto.nombre.toLowerCase().includes(searchTerm) ||
               contacto.apellido.toLowerCase().includes(searchTerm);
    });

    mostrarContactos(resultadosFiltrados);
}

document.getElementById('agregar').addEventListener('click', registrarContacto);
document.getElementById('search_button').addEventListener('click', buscarContacto);
window.onload = cargar;