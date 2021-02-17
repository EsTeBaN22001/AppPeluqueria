let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarServicios();

    // Resalta el div actual segun cual tab se presiona
    mostrarSeccion();

    // Mostrar u ocultar una sección segun el tab que se presiona
    cambiarSeccion();
<<<<<<< HEAD
=======

    // paginación Siguiente/Anterior
    paginaSiguiente();
    paginaAnterior();

    // Comprueba la página actual para ocultar o mostrar la paginación
    botonesPaginador();
>>>>>>> newFeature
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
    }else{
        elemento.classList.add('seleccionado');
    }
<<<<<<< HEAD
=======
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
>>>>>>> newFeature
}