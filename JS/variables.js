let total = 0;
const productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // genera carrito si no estaba en localStorage
const cuerpoTabla = document.querySelector("#cuerpoTabla")
const cardProducto = document.getElementById("cardProducto")
const muestraTotal = document.getElementById("totalCompra")

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

function generadorAutomatico() {
    productos.push(new Producto(1221, 'ACEITE DE OLIVA EXTRA VIRGEN 500 ML', 'TERRASANA', 732.15, 25));
    productos.push(new Producto(1231, 'SALSA DE TOMATE  500 ML SIN T.A.C.C.', 'TERRASANA', 423.89, 30));
    productos.push(new Producto(2554, 'MERMELADA DE SAUCO 300 GR SIN T.A.C.C.', 'TERRASANA', 529.22, 15));
    productos.push(new Producto(3115, 'VINO ORGÁNICO MALBEC ROBLE 750 ML', 'TERRAVITA', 806.25, 12));
    productos.push(new Producto(5255, 'MAYONESA VEGANA SABOR ORIGINAL 352 GR', 'EGGLESS', 181.34, 50));
    productos.push(new Producto(2711, 'DÁTILES SIN CAROZO X 200 GRS PACK COMPOS', 'PLANTY', 270.05, 50));
    productos.push(new Producto(1544, 'JUGO Y PULPA ARANDANO X 500 ML S/TACC', 'NATUFRESH', 339.36, 25));
    productos.push(new Producto(3555, 'TÉ PATAGONIA ROOIBOS 15 SAQ', 'INTI ZEN', 325.98, 10));
    productos.push(new Producto(3120, 'VINO ORGÁNICO CABERNET FRANC 750 ML', 'TERRAVITA', 802.15, 12))
}

generadorAutomatico()