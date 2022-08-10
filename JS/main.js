
const TCEA = 0.85;
const IVA = 1.21;
let importeInicial = 5500;
let precioFinal = 0;
let cuotasFinac = 0;
let acum = 0;
let codigo = 1;
const productos = [];

class Producto {
    constructor(codigo, nombre, marca, precio, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
    }
    precioConIva() {
        let precioFinal = (this.precio * IVA).toFixed(2)
        console.log(precioFinal)
    }
    restaStock(unidades) {
        this.stock = this.stock - unidades
        console.log("del código", this.codigo, "quedan ", this.stock, " unidades")
    }
}


function calculaCuotas() {
    alert("El importe de su compra es de $" + importeInicial.toFixed(2))
    for (i = 1; i < 3; i++) {
        let cuotasFinac = parseInt(prompt("Ingrese en cuántas cuotas desea pagar '1 a 12'"))
        if (cuotasFinac < 1 || cuotasFinac > 12) {
            alert("no hay financiación en esas cuotas, intente de nuevo")
        }
        else if (cuotasFinac == 1) {
            alert("El importe a pagar no tiene intereses")
            i = 3
        }
        else {
            let precioFinal = calculaIntereses(importeInicial, cuotasFinac, TCEA)
            alert("El importe Total es de $" + (precioFinal.toFixed(2)) + " a pagar en " +
                cuotasFinac +
                " cuotas de $" + ((precioFinal / cuotasFinac).toFixed(2)))
            i = 3
        }
    }
}

function calculaIntereses(impInic, cuotas, tasaInt) {
    return (((impInic / cuotas) + (tasaInt / 12 * impInic)) * cuotas)
    // retorna: cuota neta + intereses * cantidad de cuotas
}

function agregarProductos() {
    //debugger
    let codigo = parseInt(prompt("Ingrese el código del producto a agregar: "))
    let nombre = (prompt("Ingrese el nombre del producto: ")).toUpperCase()
    let marca = (prompt("Ingrese la marca: ")).toUpperCase()
    let precio = parseFloat(prompt("Ingresa el importe"))
    let stock = parseInt(prompt("Ingrese el stock"))
    productos.push(new Producto(codigo, nombre, marca, precio, stock))
    console.table(productos)
}

function generadorAutomatico() {
    productos.push(new Producto(1221, 'ACEITE DE OLIVA EXTRA VIRGEN 500ML', 'TERRASANA', 732.15, 25));
    productos.push(new Producto(1231, 'SALSA DE TOMATE  500 ML SIN T.A.C.C.', 'TERRASANA', 423.89, 30));
    productos.push(new Producto(2554, 'MERMELADA DE SAUCO GR SIN T.A.C.C.', 'TERRASANA', 529.22, 15));
    productos.push(new Producto(3115, 'VINO ORGÁNICO MALBEC ROBLE 750 ML', 'TERRAVITA', 806.25, 12));
    productos.push(new Producto(5255, 'MAYONESA VEGANA SABOR ORIGINAL 352 GR', 'EGGLESS', 181.34, 50));
    productos.push(new Producto(2711, 'DÁTILES SIN CAROZO X 200 GRS PACK COMPOSTABLE', 'PLANTY', 270.05, 50));
    productos.push(new Producto(1544, 'JUGO Y PULPA DE ARANDANO X 500 ML SIN TACC', 'NATUFRESH', 339.36, 25));
    productos.push(new Producto(3555, 'TÉ PATAGONIA ROOIBOS 15 SAQ', 'INTI ZEN', 325.98, 10));
    productos.push(new Producto(3120, 'VINO ORGÁNICO CABERNET FRANC ROBLE 750 ML', 'TERRAVITA', 802.15, 12))
}

generadorAutomatico()


function buscarProducto() {
    //debugger
    let product = (prompt("Ingresa el producto a buscar")).toUpperCase()
    let resultado = productos.filter(elemento => elemento.nombre.includes(product))
    console.table(resultado)
}

function calculaCompra() {
    acum = 0;
    do {
        let codigo = parseInt(prompt("Ingresa el código del producto ('0' termina compra): "))
        if (codigo == 0) {
            break;
        }
        let resultado = productos.find(elemento => elemento.codigo === codigo);
        if (resultado === undefined) {
            alert("El codigo no existe!")
        } else {
            let cantidad = parseInt(prompt("Ingresa la cantidad"));
            console.log("Producto:", (resultado.nombre), " - precio unitario $", (resultado.precio),
                "- cantidad:", cantidad, " subtotal $", (resultado.precio * cantidad).toFixed(2))
            acum += (resultado.precio) * cantidad;
        }
    } while (codigo != 0);

    console.log("Su compra TOTAL es de $", acum);
}
