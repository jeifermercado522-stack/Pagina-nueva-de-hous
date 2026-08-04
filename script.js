//==================================================
// HOUSTYLE V6
// PARTE 1
// VARIABLES Y CARRITO
//==================================================

//=============================
// VARIABLES
//=============================

let carrito = JSON.parse(localStorage.getItem("carritoHOU")) || [];

const botonesAgregar = document.querySelectorAll(".agregar-carrito");

const carritoBtn = document.getElementById("carritoFlotante");

const panelCarrito = document.getElementById("panelCarrito");

const cerrarPanel = document.getElementById("cerrarPanel");

const listaCarrito = document.getElementById("listaCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const totalPedido = document.getElementById("totalPedido");

const abrirPedido = document.getElementById("abrirPedido");

const modal = document.getElementById("modalPedido");

const cerrarModal = document.getElementById("cerrarModal");

const enviarPedido = document.getElementById("enviarPedido");


//=============================
// GUARDAR CARRITO
//=============================

function guardarCarrito(){

localStorage.setItem(

"carritoHOU",

JSON.stringify(carrito)

);

}


//=============================
// AGREGAR PRODUCTO
//=============================

botonesAgregar.forEach(boton=>{

boton.addEventListener("click",()=>{

const nombre=boton.dataset.nombre;

const referencia=boton.dataset.referencia;

const imagen=boton.dataset.imagen;

const precio=parseInt(boton.dataset.precio);

const existe=carrito.find(

p=>p.referencia===referencia

);

if(existe){

existe.cantidad++;

}else{

carrito.push({

nombre,

referencia,

imagen,

precio,

cantidad:1

});

}

guardarCarrito();

actualizarCarrito();

mostrarToast("Producto agregado");

});

});


//=============================
// ACTUALIZAR CARRITO
//=============================

function actualizarCarrito(){

listaCarrito.innerHTML="";

let total=0;

let cantidad=0;

if(carrito.length===0){

listaCarrito.innerHTML=

"<p class='carrito-vacio'>Tu carrito está vacío.</p>";

contadorCarrito.textContent="0";

totalPedido.textContent="$0";

return;

}

carrito.forEach((producto,index)=>{

cantidad+=producto.cantidad;

const subtotal=producto.precio*producto.cantidad;

total+=subtotal;

const card=document.createElement("div");

card.className="item-carrito";

card.innerHTML=`

<img src="${producto.imagen}" class="foto-carrito">

<div class="info-carrito">

<h4>${producto.nombre}</h4>

<small>${producto.referencia}</small>

<p>$${producto.precio.toLocaleString()}</p>

<div class="acciones">

<button onclick="disminuir(${index})">−</button>

<span>${producto.cantidad}</span>

<button onclick="aumentar(${index})">+</button>

</div>

</div>

<button

class="eliminar"

onclick="eliminar(${index})">

🗑

</button>

`;

listaCarrito.appendChild(card);

});

contadorCarrito.textContent=cantidad;

totalPedido.textContent="$"+total.toLocaleString();

}
//==================================================
// HOUSTYLE V6
// PARTE 2
// FUNCIONES DEL CARRITO
//==================================================


//=============================
// AUMENTAR
//=============================

function aumentar(index){

carrito[index].cantidad++;

guardarCarrito();

actualizarCarrito();

}


//=============================
// DISMINUIR
//=============================

function disminuir(index){

if(carrito[index].cantidad>1){

carrito[index].cantidad--;

}else{

carrito.splice(index,1);

}

guardarCarrito();

actualizarCarrito();

}


//=============================
// ELIMINAR
//=============================

function eliminar(index){

carrito.splice(index,1);

guardarCarrito();

actualizarCarrito();

}


//=============================
// ABRIR CARRITO
//=============================

carritoBtn.addEventListener("click",()=>{

panelCarrito.classList.add("activo");

});


//=============================
// CERRAR CARRITO
//=============================

cerrarPanel.addEventListener("click",()=>{

panelCarrito.classList.remove("activo");

});


//=============================
// ABRIR FORMULARIO
//=============================

abrirPedido.addEventListener("click",()=>{

if(carrito.length===0){

alert("Agrega al menos un producto al carrito.");

return;

}

modal.style.display="flex";

});


//=============================
// CERRAR FORMULARIO
//=============================

cerrarModal.addEventListener("click",()=>{

modal.style.display="none";

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

}

});


//=============================
// CERRAR CON ESC
//=============================

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

panelCarrito.classList.remove("activo");

modal.style.display="none";

}

});


//=============================
// TOAST
//=============================

function mostrarToast(texto){

const toast=document.createElement("div");

toast.className="toast";

toast.textContent=texto;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("mostrar");

},50);

setTimeout(()=>{

toast.classList.remove("mostrar");

setTimeout(()=>{

toast.remove();

},300);

},2000);

}
//==================================================
// HOUSTYLE V6
// PARTE 3
// ENVIAR PEDIDO
//==================================================

enviarPedido.addEventListener("click",()=>{

const nombre=document.getElementById("nombre").value.trim();

const telefono=document.getElementById("telefono").value.trim();

const ciudad=document.getElementById("ciudad").value.trim();

const direccion=document.getElementById("direccion").value.trim();

const notas=document.getElementById("notas").value.trim();

if(nombre===""||telefono===""||ciudad===""||direccion===""){

alert("Completa todos los campos.");

return;

}

let total=0;

let mensaje=`🛍️ *NUEVO PEDIDO HOUSTYLE*

👤 *DATOS DEL CLIENTE*
• Nombre: ${nombre}
• Celular: ${telefono}
• Ciudad: ${ciudad}
• Dirección: ${direccion}

━━━━━━━━━━━━━━━━━━

👕 *PRODUCTOS*
`;

carrito.forEach((producto,index)=>{

const subtotal=producto.precio*producto.cantidad;

total+=subtotal;

mensaje+=`

${index+1}. *${producto.nombre}*
🏷️ Ref: ${producto.referencia}
📦 Cantidad: ${producto.cantidad}
💵 Precio: $${producto.precio.toLocaleString()}
💰 Subtotal: $${subtotal.toLocaleString()}
`;

});

mensaje+=`

━━━━━━━━━━━━━━━━━━

💰 *TOTAL:* $${total.toLocaleString()}
`;

if(notas!=""){

mensaje+=`

📝 *Observaciones:*
${notas}
`;

}

mensaje+=`

❤️ Gracias por comprar en *HOUSTYLE*`;

const numero="573106639358";

window.open(

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,

"_blank"

);

//=========================
// LIMPIAR TODO
//=========================

carrito=[];

guardarCarrito();

actualizarCarrito();

modal.style.display="none";

panelCarrito.classList.remove("activo");

document.getElementById("nombre").value="";

document.getElementById("telefono").value="";

document.getElementById("ciudad").value="";

document.getElementById("direccion").value="";

document.getElementById("notas").value="";

});
//==================================================
// HOUSTYLE V6
// PARTE 4
// INICIALIZACIÓN Y FUNCIONES EXTRA
//==================================================


//=============================
// VACIAR CARRITO
//=============================

function vaciarCarrito(){

if(carrito.length===0){

alert("El carrito ya está vacío.");

return;

}

if(confirm("¿Deseas vaciar todo el carrito?")){

carrito=[];

guardarCarrito();

actualizarCarrito();

mostrarToast("Carrito vaciado");

}

}


//=============================
// RECUPERAR CARRITO
//=============================

actualizarCarrito();


//=============================
// EFECTO BOTÓN AGREGAR
//=============================

botonesAgregar.forEach(boton=>{

boton.addEventListener("click",()=>{

const texto=boton.innerHTML;

boton.innerHTML="✔ Agregado";

boton.disabled=true;

setTimeout(()=>{

boton.innerHTML=texto;

boton.disabled=false;

},800);

});

});


//=============================
// CERRAR PANEL DESPUÉS DEL PEDIDO
//=============================

function cerrarTodo(){

panelCarrito.classList.remove("activo");

modal.style.display="none";

}


//=============================
// LIMPIAR FORMULARIO
//=============================

function limpiarFormulario(){

document.getElementById("nombre").value="";

document.getElementById("telefono").value="";

document.getElementById("ciudad").value="";

document.getElementById("direccion").value="";

document.getElementById("notas").value="";

}


//=============================
// RECARGAR CARRITO AL ENTRAR
//=============================

window.addEventListener("load",()=>{

actualizarCarrito();

});


//=============================
// FIN DEL SCRIPT
//=============================

console.log("✅ HOUSTYLE V6 cargado correctamente");