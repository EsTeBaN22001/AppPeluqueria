let pagina=1;const cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarServicios(),mostrarSeccion(),cambiarSeccion(),paginaSiguiente(),paginaAnterior(),botonesPaginador(),mostrarResumen(),nombreCita(),fechaCita(),deshabilitarFechaAnterior(),horaCita()}function mostrarSeccion(){document.querySelector("#paso-"+pagina).classList.add("mostrar-seccion");document.querySelector(`[data-paso="${pagina}"]`).classList.add("actual")}function cambiarSeccion(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),pagina=parseInt(e.target.dataset.paso),document.querySelector(".mostrar-seccion").classList.remove("mostrar-seccion");document.querySelector("#paso-"+pagina).classList.add("mostrar-seccion"),document.querySelector(".tabs button.actual").classList.remove("actual");document.querySelector(`[data-paso="${pagina}"]`).classList.add("actual")})})}async function mostrarServicios(){try{const e=await fetch("./servicios.json"),t=await e.json(),{servicios:a}=t;a.forEach(e=>{const{id:t,nombre:a,precio:o}=e,r=document.createElement("p");r.textContent=a,r.classList.add("nombre-servicio");const c=document.createElement("p");c.textContent="$"+o,c.classList.add("precio-servicio");const n=document.createElement("div");n.classList.add("servicio"),n.appendChild(r),n.appendChild(c),n.dataset.idServicio=t,n.onclick=seleccionarServicio,document.querySelector("#servicios").appendChild(n)})}catch(e){console.log(e)}}function seleccionarServicio(e){let t;if(t="P"===e.target.tagName?e.target.parentElement:e.target,t.classList.contains("seleccionado")){t.classList.remove("seleccionado");eliminarServicio(parseInt(t.dataset.idServicio))}else{t.classList.add("seleccionado");agregarServicio({id:parseInt(t.dataset.idServicio),nombre:t.firstElementChild.textContent,precio:t.firstElementChild.nextElementSibling.textContent})}}function eliminarServicio(e){const{servicios:t}=cita;cita.servicios=t.filter(t=>t.id!==e)}function agregarServicio(e){const{servicios:t}=cita;cita.servicios=[...t,e]}function mostrarSeccion(){const e=document.querySelector(".mostrar-seccion");e&&e.classList.remove("mostrar-seccion");document.querySelector("#paso-"+pagina).classList.add("mostrar-seccion");const t=document.querySelector(".tabs button.actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${pagina}"]`).classList.add("actual")}function cambiarSeccion(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),pagina=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()})})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{pagina++,botonesPaginador()})}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{pagina--,botonesPaginador()})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===pagina?e.classList.add("ocultar"):3===pagina?(t.classList.add("ocultar"),e.classList.remove("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion(),cambiarSeccion()}function mostrarResumen(){const{nombre:e,fecha:t,hora:a,servicios:o}=cita,r=document.querySelector(".contenido-resumen");for(;r.firstChild;)r.removeChild(r.firstChild);if(Object.values(cita).includes("")){const e=document.createElement("p");return e.textContent="Faltan datos de servicios, hora, fecha  o nombre",e.classList.add("invalidar-cita"),void r.appendChild(e)}}function nombreCita(){const e=document.querySelector("#nombre");e.addEventListener("input",t=>{const a=t.target.value.trim();if(""===a||a.length<3)mostrarAlerta("Nombre invalido","error");else{const t=document.querySelector(".alerta");t&&t.remove(),cita.nombre=e.value}})}function mostrarAlerta(e,t){if(document.querySelector(".alerta"))return;const a=document.createElement("div");a.textContent=e,a.classList.add("alerta"),"error"==t&&a.classList.add("error");document.querySelector(".formulario").appendChild(a),setTimeout(()=>{a.remove()},3e3)}function fechaCita(){const e=document.querySelector("#fecha");e.addEventListener("input",t=>{const a=new Date(t.target.value).getUTCDay();[0,6].includes(a)?(t.preventDefault(),e.value="",mostrarAlerta("Los fines de semana no están disponibles para reservar","error")):cita.fecha=e.value})}function deshabilitarFechaAnterior(){const e=document.querySelector("#fecha"),t=new Date,a=t.getFullYear(),o=t.getMonth()+1,r=`${a}-${o<10?"0"+o:o}-${t.getDate()+1}`;e.min=r}function horaCita(){const e=document.querySelector("#hora");e.addEventListener("input",t=>{const a=t.target.value,o=a.split(":");if(o[0]<10||o[0]>18)setTimeout(()=>{e.value=""},0),mostrarAlerta("Hora no válida","error");else{const e=document.querySelector(".alerta");e&&e.remove(),cita.hora=a}})}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=bundle.js.map
