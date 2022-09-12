
M.AutoInit();

document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
        document.querySelectorAll(".articulos").forEach(articulo =>{
            articulo.textContent.toUpperCase().includes(e.target.value.toUpperCase())
            ?articulo.classList.remove("filtro")
            :articulo.classList.add("filtro")
        }) 
    }
})


const pedirDatosServidor = async() => {
    await fetch('JS/bbdd.json')
            .then((response) => response.json())
            .then ((data) =>{
                productos = data
                generaCardProductos()
              })
            .catch ((error) => alert("se ha producido un error"))
}

pedirDatosServidor()

function generaCardProductos() {
        productos.forEach((producto) => {
        cardProducto.innerHTML += `<div class="col l3 m6 s12 articulos">
              <div class="class card large light-green accent-2">
                 <div class="class card-image">
                    <img src="${producto.foto}" alt="producto" class="center-align">
                 </div>
                 <div class="class card-content">
                   <p class="card-title">${producto.nombre}</p>
                   <p> ${producto.marca}</p>
                   <p class="center-align"><em>$${producto.precio}</em></p>
                 </div>
                 <div class="card-action center-align">
                    <button id="btn-cargar-${producto.codigo}" class="waves-effect waves-light btn light-green accent-4 tituloEtiqueta">Agregar al carrito
                    </button>
                 </div> 
               </div>`
    });
    agregarProducto();
}

generaCardProductos();


function cargaTablaDeCarrito() {
    total = 0
    cantidadProductos = 1
    carrito.forEach((producto) => {
        total += producto.subTotal
        cantidadProductos += producto.cantidad
        cuerpoTabla.innerHTML += `<tr>
                                 <td>${producto.nombre}</td>
                                 <td>${producto.precio}</td>
                                 <td>${producto.cantidad}</td>                                
                                 <td>${producto.subTotal.toFixed(2)}</td>
                                 <td><button id="btn-borrar-${producto.codigo}" class="waves-effect
                                 waves-light btn red">x</button></td>
                                 </tr>`
                                //  <td>${producto.cantidad}</td>
    });
    localStorage.setItem("carrito", JSON.stringify(carrito))
    muestraTotal.innerHTML = `<h5 class="right">TOTAL $ ${total.toFixed(2)}</h5>`
    borrarProducto()
}

cargaTablaDeCarrito();

function agregarProducto() {
    productos.forEach((producto) => {
        document
            .querySelector(`#btn-cargar-${producto.codigo}`)
            .addEventListener("click", () => {
                cargaTotal()
                let existe = (carrito.includes(producto))
                existe ? producto.cantidad++ :
                    (producto.cantidad = 1, carrito.push(producto))
                producto.subTotal = producto.precio * producto.cantidad
                cuerpoTabla.innerHTML = ""
                cargaTablaDeCarrito()
                sAlert ('AGREDADO Gracias!!','success','#eeff41')
            });
    });
}

function borrarProducto() {
    carrito.forEach((producto) => {
        document
            .querySelector(`#btn-borrar-${producto.codigo}`)
            .addEventListener("click", () => {
                let existe = (carrito.includes(producto))
                existe &&
                    (carrito = carrito.filter(productoFiltrado => productoFiltrado.codigo !== producto.codigo),
                    cuerpoTabla.innerHTML = "",
                    cantidadProductos -= ((producto.cantidad) +1),
                    cargaTotal(),
                    cargaTablaDeCarrito(),
                    sAlert('BORRADO!', 'warning', '#ff3d00'))
            });
    })
}

const cargaTotal = ()=> {
    muestraCantidad.innerHTML = `${cantidadProductos}`
}

const sAlert =(mensaje, icono, colorFondo)=> {
    Swal.fire({
        title: mensaje,
        toast: true,
        position: 'top-end',
        icon: icono,
        showConfirmButton: false,
        background: colorFondo,
        color: 'black',
        timer: 1000
    })
}
