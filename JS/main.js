
const TCEA = 0.85;
const IVA = 1.21;
let importeInicial = 5500;
let precioFinal = 0;
let cuotasFinac = 0;
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
    let nombre = prompt("Ingrese el nombre del producto: ")
    let marca = (prompt("Ingrese la marca: ")).toUpperCase()
    let precio = parseFloat(prompt("Ingresa el importe"))
    let stock = parseInt(prompt("Ingrese el stock"))
    productos.push(new Producto(codigo, nombre, marca, precio, stock))
    console.table(productos)
}


function generadorAutomatico() {
    productos.push(new Producto(1221, 'Aceite de oliva extra virgen 500ml', 'TERRASANA', 732.15, 25));
    productos.push(new Producto(1231, 'Salsa de tomate  500 ml sin T.A.C.C.', 'TERRASANA', 423.89, 30));
    productos.push(new Producto(2554, 'Mermelada de sauco gr sin T.A.C.C.', 'TERRASANA', 529.22, 15));
    productos.push(new Producto(3115, 'Vino orgánico Malbec roble 750 ml', 'TERRAVITA', 806.25, 12));
    productos.push(new Producto(5255, 'Mayonesa vegana sabor original 352 gr', 'EGGLESS', 181.34, 50));
    productos.push(new Producto(2711, 'Dátiles sin carozo x 200 grs pack compostable', 'PLANTY', 270.05, 50));
    productos.push(new Producto(1544, 'Jugo y pulpa de arandano x 500 ml Sin TACC', 'NATUFRESH', 339.36, 25));
    productos.push(new Producto(3555, 'Té Patagonia rooibos 15 Saq', 'INTI ZEN', 325.98, 10));
}










