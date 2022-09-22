
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

const pedirDatosServidor = () => {
        fetch(URL)
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
              <div class="class card large" id="${producto.colorCard}">
                 <div class="class card-image">
                    <img src="${producto.foto}" alt="producto" class="center-align">
                 </div>
                 <div class="class card-content">
                   <p class="card-title">${producto.nombre}</p>
                   <p>${producto.marca}</p>
                   <p class="center-align contienePrecio">$${(producto.precio).toFixed(2)}</p>
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
    cantidadProductos = 0
    carrito.forEach((producto) => {
        total += producto.subTotal
        cantidadProductos += producto.cantidad
        cuerpoTabla.innerHTML += `<tr>
                                 <td class="center"><img src="${producto.foto}" class="fotoEnCarro"></td>
                                 <td class="center">${producto.nombre}</td>
                                 <td class="center">${(producto.precio).toFixed(2)}</td>
                                 <td class="center">${producto.cantidad}</td>                                
                                 <td class="center">${producto.subTotal.toFixed(2)}</td>
                                 <td class="center"><button id="btn-borrar-${producto.codigo}" class="waves-effect
                                 waves-light btn red">x</button></td>
                                 </tr>`
    });
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
    muestraTotal.innerHTML = `<h5 class="right">TOTAL $ ${total.toFixed(2)}</h5>`
    muestraCantidad.innerHTML = `${cantidadProductos}`
    borrarProducto()
}

cargaTablaDeCarrito();


function agregarProducto() {
    productos.forEach((producto) => {
        document
            .querySelector(`#btn-cargar-${producto.codigo}`)
            .addEventListener("click", () => {  
                let existe = carrito.some(someProd => someProd.codigo === producto.codigo)
                existe ? (prodFind = carrito.find((productoFind) => 
                            productoFind.codigo === producto.codigo),
                            prodFind.cantidad++)
                        :(producto.cantidad = 1, carrito.push(producto))
                producto.subTotal = producto.precio * producto.cantidad
                cuerpoTabla.innerHTML = ""
                cargaTablaDeCarrito()
                sAlert ('AGREDADO Gracias!!','success','#eeff41', 'top-end')
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
                    producto.cantidad--,
                    cargaTablaDeCarrito(),
                    sAlert('BORRADO!', 'warning', '#ff3d00', 'top-end'))
            });
    })
}

function borrarCarro() {
    document.querySelector("#botonPagar")
           .addEventListener("click", () => { 
                     (carrito.length !== 0) && sAlert('Muchas Gracias por su Compra!!', 'success', '#c6ff00',
                             'center')                              
                     carrito.length = 0
                     cargaTablaDeCarrito()
                     cuerpoTabla.innerHTML = ""
                 })      
}

borrarCarro()

const sAlert = (mensaje, icono, colorFondo, posicion) => {
    Swal.fire({
        title: mensaje,
        toast: true,
        position: posicion,
        icon: icono,
        showConfirmButton: false,
        background: colorFondo,
        color: 'black',
        timer: 1500
    })
}
