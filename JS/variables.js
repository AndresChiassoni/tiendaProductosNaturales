let total = 0;
let cantidadProductos = 0
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // genera carrito si no estaba en localStorage
const cuerpoTabla = document.querySelector("#cuerpoTabla")
const cardProducto = document.getElementById("cardProducto")
const muestraTotal = document.getElementById("totalCompra")
const muestraCantidad = document.getElementById("cantidadTotal")
