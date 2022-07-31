
const TCEA = 0.85;
let importeInicial = 5500;
let precioFinal = 0;
let cuotasFinac = 0;

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
