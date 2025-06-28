// Capturamos el botón del HTML usando su ID y agregamos un "escuchador" de clics
document.getElementById("btnProcesar").addEventListener("click", function () {

    // Obtenemos los valores de los inputs
    let nombre = document.getElementById("nombre").value.trim(); // .trim() elimina espacios al inicio y final
    let edadTexto = document.getElementById("edad").value;
    let edad = Number(edadTexto); // Convertimos el texto a número

    // Validación: El nombre no debe estar vacío
    if (nombre === "") {
        document.getElementById("salida").innerHTML = "❌ Por favor escribe tu nombre.";
        return;
    }

    // Validación: La edad debe ser un número entre 1 y 100
    if (isNaN(edad) || edad < 1 || edad > 100) {
        document.getElementById("salida").innerHTML = "❌ Escribe una edad correcta entre 1 y 100 años.";
        return;
    }

    // Creamos un objeto con los datos del usuario
    let usuario = {
        id: Date.now(),   // Se genera un número único usando la hora actual
        nombre: nombre,
        edad: edad
    };

    // Usamos Set para garantizar que no haya datos repetidos
    let setUsuarios = new Set();
    setUsuarios.add(JSON.stringify(usuario)); // Lo convertimos a texto para poder compararlo en el Set

    // Usamos Map para asignar una categoría según la edad
    let categorias = new Map();
    let categoria = edad < 18 ? "Joven" : "Adulto";
    categorias.set(categoria, nombre);

    // Mensaje personalizado según la edad
    let mensaje = edad < 18
        ? `Hola ${nombre}, sigue aprendiendo y creciendo en conocimiento, ¡Tu puedes mi bro! `
        : `Hola ${nombre}, sigue explorando oportunidades ¡Eres el mejor!.`;

    // Empezamos a construir el HTML para mostrar los datos
    let salida = `<h3>Bienvenido</h3>`;
    salida += `<p>Sus Datos:</p>`;
    salida += `<ul>`;
    salida += `<li>Id: ${usuario.id}</li>`;
    salida += `<li>Nombre: ${usuario.nombre}</li>`;
    salida += `<li>Edad: ${usuario.edad}</li>`;
    salida += `</ul>`;

    salida += `<p><strong>Datos únicos:</strong></p><ul>`;
    for (let item of setUsuarios) {
        let obj = JSON.parse(item);
        salida += `<li>${obj.nombre} (${obj.edad})</li>`;
    }
    salida += `</ul>`;

    salida += `<p><strong>Categoría (Map):</strong></p><ul>`;
    categorias.forEach((valor, clave) => {
        salida += `<li>${clave}: ${valor}</li>`;
    });
    salida += `</ul>`;

    salida += `<p>${mensaje}</p>`;

    // Finalmente mostramos todo en el div "salida"
    document.getElementById("salida").innerHTML = salida;
});
