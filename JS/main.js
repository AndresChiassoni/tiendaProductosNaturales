generaCardProductos()

function generaCardProductos() {
    productos.forEach((producto) => {
        cardProducto.innerHTML += `<div class="class col s4">
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
                                          <button id="btn-cargar-${producto.codigo}" class="waves-effect waves-light btn">Agregar al carrito</button>
                                          <button id="btn-borrar-${producto.codigo}" class="waves-effect waves-light btn red">Quitar </button>                
                                       </div>
                                     </div>
                                    </div>`                                 
    });
    cargaTablaDeCarrito();
    funcionalidadBtnAgregar();
}

function cargaTablaDeCarrito() {
    total = 0
    carrito.forEach((producto) => {
        total += producto.subTotal
        cuerpoTabla.innerHTML += `<tr>
                                 <td>${producto.codigo}</td>
                                 <td>${producto.nombre}</td>
                                 <td>${producto.marca}</td>
                                 <td>${producto.precio}</td>
                                 <td>${producto.cantidad}</td>
                                 <td>${producto.subTotal.toFixed(2)}</td>
                              </tr>`
    });
    localStorage.setItem("carrito", JSON.stringify(carrito))
    muestraTotal.innerHTML = `<h3>TOTAL $ ${total.toFixed(2)}</h3>`
    borrarProducto()
}

function funcionalidadBtnAgregar() {
    productos.forEach((producto) => {
        document
                .querySelector(`#btn-cargar-${producto.codigo}`)
                .addEventListener("click", () => {
                    agregaProductoAlCarro(producto)
                    cuerpoTabla.innerHTML = ""
                    cargaTablaDeCarrito()
                 });
    });  
}

function agregaProductoAlCarro(producto) {
    let control = carrito.includes(producto) 
//    control ? producto.cantidad ++ : producto.cantidad = 1 , carrito.push(producto); 
        if (control) {
            producto.cantidad ++
        } else {
            producto.cantidad = 1
            carrito.push(producto);
        }
    producto.subTotal = producto.precio * producto.cantidad
}

function borrarProducto() {
    carrito.forEach((producto) => {
        document
            .querySelector(`#btn-borrar-${producto.codigo}`)
            .addEventListener("click", () => {
                carrito = carrito.filter(productoFiltrado => productoFiltrado.codigo !== producto.codigo);
                cuerpoTabla.innerHTML = ""
                cargaTablaDeCarrito()
             });
        
    })

}

// function muestraTotal() {
    // muestraTotal.innerHTML = `<p>${total}</p>`
// }




// function agregarProducto() {
    // 
    // let codigo = parseInt(prompt("Ingrese el código del producto a agregar: "))
    
    // let verifica = productos.find(element => element.codigo === codigo)
    // if (verifica === undefined) {
        // let nombre = (prompt("Ingrese el nombre del producto: ")).toUpperCase()
        // let marca = (prompt("Ingrese la marca: ")).toUpperCase()
        // let precio = parseFloat(prompt("Ingresa el importe"))
        // let stock = parseInt(prompt("Ingrese el stock"))
        // productos.unshift(new Producto(codigo, nombre, marca, precio, stock))
        // cuerpoTabla.innerHTML = ""
        // cargaTablaDeProductos()
    // } else {
        // alert("el código ya existe")
    // }
// }
// 
// function borrarProducto() {
    // produAbor = parseInt(prompt("Ingresa el código del producto a quitar"))
    // let indice = productos.findIndex(element => element.codigo === produAbor)
    // if (indice != -1) {
        // productos.splice(indice, 1)
        // cuerpoTabla.innerHTML = ""
        // cargaTablaDeProductos()
    // } else {
        // alert("El producto no existe")
    // }
// }



// function cargaTablaDeProductos() {
// productos.forEach((producto) => {
// cuerpoTabla.innerHTML += `<tr>
// <td>${producto.codigo}</td>
// <td>${producto.nombre}</td>
// <td>${producto.marca}</td>
// <td>${producto.precio}</td>
// <td>${producto.stock}</td>
// </tr>`
// })
// }
// cargaTablaDeProductos()

// function calculaCuotas() {
    // alert("El importe de su compra es de $" + importeInicial.toFixed(2))
    // for (i = 1; i < 3; i++) {
        // let cuotasFinac = parseInt(prompt("Ingrese en cuántas cuotas desea pagar '1 a 12'"))
        // if (cuotasFinac < 1 || cuotasFinac > 12) {
            // alert("no hay financiación en esas cuotas, intente de nuevo")
        // }
        // else if (cuotasFinac == 1) {
            // alert("El importe a pagar no tiene intereses")
            // i = 3
        // }
        // else {
            // let precioFinal = calculaIntereses(importeInicial, cuotasFinac, TCEA)
            // alert("El importe Total es de $" + (precioFinal.toFixed(2)) + " a pagar en " +
                // cuotasFinac +
                // " cuotas de $" + ((precioFinal / cuotasFinac).toFixed(2)))
            // i = 3
        // }
    // }
//}

// function calculaIntereses(impInic, cuotas, tasaInt) {
    // return (((impInic / cuotas) + (tasaInt / 12 * impInic)) * cuotas)
    // retorna: cuota neta + intereses * cantidad de cuotas
// }
// 
// 
// function buscarProducto() {
    // debugger
    // let product = (prompt("Ingresa el producto a buscar")).toUpperCase()
    // let resultado = productos.filter(elemento => elemento.nombre.includes(product))
    // console.table(resultado)
// }
// 
// function calculaCompra() {
    // acum = 0;
    // do {
        // let codigo = parseInt(prompt("Ingresa el código del producto ('0' termina compra): "))
        // if (codigo == 0) {
            // break;
        // }
        // let resultado = productos.find(elemento => elemento.codigo === codigo);
        // if (resultado === undefined) {
            // alert("El codigo no existe!")
        // } else {
            // let cantidad = parseInt(prompt("Ingresa la cantidad"));
            // console.log("Producto:", (resultado.nombre), " - precio unitario $", (resultado.precio),
                // "- cantidad:", cantidad, " subtotal $", (resultado.precio * cantidad).toFixed(2))
            // acum += (resultado.precio) * cantidad;
        // }
    // } while (codigo != 0);

    // console.log("Su compra TOTAL es de $", acum);
// }

// function ingresarTexto() {
    // parrafoUsuario.innerText = prompt("Ingrese un texto a la página").toUpperCase()
    // parrafoUsuario.className = "texto-ingresado"
// }
