let contactosCargados = [];

function mostrarContactos(contactos) {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = ""; 
    contactos.forEach(contacto => {
        const li = document.createElement("li");
        li.textContent = `${contacto.nombre} ${contacto.apellido} - ${contacto.telefono}`;
        contentElement.appendChild(li);
    });
}

function cargar() {
    fetch("http://www.raydelto.org/agenda.php")
        .then(response => response.json())
        .then(contactos => {
            contactosCargados = contactos; 
            mostrarContactos(contactosCargados); 
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
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('telefono').value = "";
        cargar(); 
    })
    .catch(error => {
        console.error("Error al registrar el contacto:", error);
    });
}

function buscarContacto() {
    const searchTerm = document.getElementById('search').value.toLowerCase();

    if(searchTerm ==""){
        mostrarContactos(contactosCargados);
        return;
    }
    const resultadosFiltrados = contactosCargados.filter(contacto => {
        return contacto.nombre.toLowerCase().includes(searchTerm) ||
               contacto.apellido.toLowerCase().includes(searchTerm);
    });

    mostrarContactos(resultadosFiltrados);
}

document.getElementById('agregar').addEventListener('click', registrarContacto);
document.getElementById('search').addEventListener('input', buscarContacto);
document.onload(cargar());