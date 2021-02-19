let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarServicios();

    // Resalta el div actual segun cual tab se presiona
    mostrarSeccion();

    // Mostrar u ocultar una sección segun el tab que se presiona
    cambiarSeccion();

    // paginación Siguiente/Anterior
    paginaSiguiente();
    paginaAnterior();

    // Comprueba la página actual para ocultar o mostrar la paginación
    botonesPaginador();

    // Mostrar resumen de la cita (o error en caso de que no haya pasado la validación )
    mostrarResumen();

    // Almacena el nombre de la cita en el objeto
    nombreCita();

    // Almacena la fecha de la cita en el objeto
    fechaCita();

    // Deshabilitar dias anteriores
    deshabilitarFechaAnterior();
}

function mostrarSeccion(){
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            // Eliminar "mostrar-seccion" de la seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
            
            // Agrega "mostrar-seccion" donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            // Eliminar la clase de actual del tab anterior
            document.querySelector('.tabs button.actual').classList.remove('actual');

            // Agregar la clase de actual en el nuevo tab
            const tab = document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('actual');
        }
        )
    })};


async function mostrarServicios(){
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const {servicios} = db;
        
        // Generar el HTML
        servicios.forEach(servicio => {
            const {id, nombre, precio} = servicio;

            // DOM Scripting

            // Generar nombre del servicio
            const nombreServicio = document.createElement('p');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            // Generar precio del servicio
            const precioServicio = document.createElement('p');
            precioServicio.textContent = `$${precio}`;
            precioServicio.classList.add('precio-servicio');

            // generar div contenedor de cada servicio
            const servicioDiv = document.createElement('div');
            servicioDiv.classList.add('servicio');
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);
            servicioDiv.dataset.idServicio = id;

            // Modo seleccionado de un servicio
            servicioDiv.onclick = seleccionarServicio;

            // agregar html
            document.querySelector('#servicios').appendChild(servicioDiv);
        });

    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e){
    // Forzar que el elemento el cual le damos click sea el div
    let elemento;

    if(e.target.tagName === 'P'){
        elemento = e.target.parentElement;
    }else{
        elemento = e.target;
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');

        const id = parseInt(elemento.dataset.idServicio);

        eliminarServicio(id);
    }else{
        elemento.classList.add('seleccionado');

        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextElementSibling.textContent
        }

        agregarServicio(servicioObj);
    }
}

function eliminarServicio(id) {
    const {servicios} = cita;
    cita.servicios = servicios.filter(servicio => servicio.id !== id);
}

function agregarServicio(servicioObj) {
    // Destructuring
    const{servicios} = cita;

    cita.servicios = [...servicios, servicioObj];
}

function mostrarSeccion(){
    // Eliminar "mostrar-seccion" de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');

    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Eliminar la clase de actual del tab anterior
    const tabAnterior = document.querySelector('.tabs button.actual');

    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        }
        )
    })};

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', ()=>{
        pagina++;
        
        botonesPaginador();
        console.log(pagina);

    });
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', ()=>{
        pagina--;

        botonesPaginador();
        console.log(pagina);
        
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    }else if (pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion(); //Cambia la sección que se muestra por la de la página acutal
    cambiarSeccion();
}

function mostrarResumen(){
    // Destructuring
    const{nombre, fecha, hora, servicios} = cita;

    // Seleccionar la sección de resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    // Validación de objeto
    if (Object.values(cita).includes('')) {
        const noServicios = document.createElement('p');
        noServicios.classList.add('invalidar-cita');
        noServicios.textContent = 'Faltan datos de servicios, hora, fecha  o nombre';

        // Agregar noServicios a ResumenDiv
        resumenDiv.appendChild(noServicios);
    }
}

function nombreCita(){
    const nombreInput = document.querySelector('#nombre');

    nombreInput.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim();

        // Validación de que nombreTexto debe tener algo
        if(nombreTexto === '' || nombreTexto.length < 3){
            mostrarAlerta('Nombre invalido', 'error');
        }else{
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            cita.nombre = nombreInput.value;
        }
    })
}

function mostrarAlerta(mensaje, tipo){

    // Si hay una alerta previa no crear otra
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        return;
    }

    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    // Comprobación para saber que tipo de alerta es
    if (tipo == 'error') {
        alerta.classList.add('error');
    }

    // Insertar alerta en el DOM
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    // Eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function fechaCita(){
    const fechaInput = document.querySelector('#fecha');

    fechaInput.addEventListener('input', e => {

        const fecha = new Date(e.target.value).getUTCDay();

        if([0, 6].includes(fecha)){
            e.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('Los fines de semana no están disponibles para reservar', 'error');
        }else{
            cita.fecha = fechaInput.value;
        }
    })
}

function deshabilitarFechaAnterior(){
    const fechaInput = document.querySelector('#fecha');

    const fechaAhora = new Date();
    const year = fechaAhora.getFullYear();
    const mes = fechaAhora.getMonth() + 1;
    const dia = fechaAhora.getDate() + 1;

    const fechaDeshabilitar = `${year}-${mes < 10 ? `0${mes}` : mes}-${dia}`;

    fechaInput.min = fechaDeshabilitar;
    console.log(fechaDeshabilitar);
}