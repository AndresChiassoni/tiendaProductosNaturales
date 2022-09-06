
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
        cardProducto.innerHTML += `<div class="col l4 m6 s12">
              <div class="class card light-green accent-2">
                 <div class="class card-image">
                    <img src="./Assets/images/stevia.jpg" alt="aceite">
                 </div>
                 <div class="class card-content">
                   <p class="card-title">${producto.nombre}</p>
                   <p> ${producto.marca}</p>
                   <p class="center-align"><em>$${producto.precio}</em></p>
                 </div>
                 <div class="card-action center-align">
                    <button id="btn-cargar-${producto.codigo}" class="waves-effect waves-light btn">Agregar al carrito
                    </button>
                 </div> 
               </div>`
    });
    agregarProducto();
}

generaCardProductos();

function cargaTablaDeCarrito() {
    total = 0
    carrito.forEach((producto) => {
        total += producto.subTotal
        cuerpoTabla.innerHTML += `<tr>
                                 <td>${producto.nombre}</td>
                                 <td class="center-align">${producto.precio}</td>
                                 <td class="center-align">${producto.cantidad}</td>
                                 <td class="center-align">${producto.subTotal.toFixed(2)}</td>
                                 <td class="center-align"><button id="btn-borrar-${producto.codigo}" class="waves-effect
                                 waves-light btn red">Quitar </button></td>
                              </tr>`
    });
    localStorage.setItem("carrito", JSON.stringify(carrito))
    muestraTotal.innerHTML = `<h3>TOTAL $ ${total.toFixed(2)}</h3>`
    borrarProducto()
}

cargaTablaDeCarrito();

function agregarProducto() {
    productos.forEach((producto) => {
        document
            .querySelector(`#btn-cargar-${producto.codigo}`)
            .addEventListener("click", () => {
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
                    cargaTablaDeCarrito(),
                    sAlert('BORRADO!', 'warning', '#ff3d00'))
            });
    })
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
