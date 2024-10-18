'use strict';

/*
 * CORBALAN, NICOLAS LEONEL
 *
 * El orden de esta página es el siguiente:
 *
 *
 *
 */

let discografia = new Discografia();
let totaldiscos = 0;
fetch("discos.json").then(response => response.json()).then(discosPreCargados => {
    // Recorro el array con un forEach
    discosPreCargados.forEach(function(disco) {
        // La funcion agregar disco retorna el índice del último elemento agregado
        let indice = discografia.agregarDisco(disco.nombre, disco.artista, disco.id, disco.portada);
        let pistaId = 0;
        for(let pista of disco.pistas){
            // Uso la funcion agregarPista de la clase Disco
            discografia["listaDiscos"][indice].agregarPista(pista.nombre, pista.duracion, pistaId);
            pistaId++;
        }
    });
    totaldiscos++;
});

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    // TODO:
    discografia.cargarNuevoDisco();
}

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    // TODO
    // console.log(discografia.listaDiscos);
    document.getElementById("cantidadDiscos").innerHTML = "Se están mostrando "+ discografia.listaDiscos.length + " discos";
    discografia.mostrarDiscos();
};

function buscarDisco() {
    const codigoSolicitado = solicitarNumeroEnRango(0, 999, "Introduzca el código del disco");

    let discoEncontrado = false;
    discografia.listaDiscos.forEach((disco) => {
        if (codigoSolicitado === disco.getId){
            discoEncontrado = true;
            document.getElementById("cantidadDiscos").innerHTML = "Se está mostrando 1 disco";
            document.getElementById("contenedorDiscos").innerHTML = disco.generarEstructuraHtml();
        }
    });

    if(!discoEncontrado){
        alert("No se pudo encontrar ningún disco con ese código");
    }
}

function formatearHhMmSs(segundosTotales) {
    let hs = Math.floor(segundosTotales / 3600);
    let min = Math.floor(segundosTotales / 60)%60;
    let seg = Math.floor(segundosTotales % 60);

    return [hs, min, seg];
}

function formatoHhMmSs(segundosTotales, tipoDeString) {
    let hs = Math.floor(segundosTotales / 3600);
    let min = Math.floor(segundosTotales / 60)%60;
    let seg = Math.floor(segundosTotales % 60);

    let string = ""; // String que devolverá la función
    // Fotmato en el que lo va a devolver
    switch(tipoDeString){
        case 1:
            hs = (hs >= 10)? hs : "0" + hs;
            min = (min >= 10)? min : "0" + min;
            seg = (seg >= 10)? seg : "0" + seg;
            string = `${hs}:${min}:${seg}`;
            break;
        case 2:
            string = `${hs} h ${min} min ${seg} seg`;
            break;
        default:
            return [hs, min, seg];
    }

    return string;
}

/**
 * Llamada desde el código. Solicita un texto al usuario
 */
function solicitarTexto(_mensaje) {
    let texto;
    do {
        texto = prompt(_mensaje || "Ingrese un texto") ?? '';
        texto = texto.trim();

        if(!esTexto(texto)) {
            alert("El dato ingresado no es un texto válido 😢");
        }else {
            break;
        }
    }while(true);
    return texto;
}

function solicitarNumeroEnRango(min, max, _mensaje) {
    let numero;
    do {
        numero = parseInt(prompt((_mensaje || `Ingrese un número en rango`) + ` (${min} al ${max})`));

        // console.log(esNumero(numero));
        if(!esNumero(numero)) {
            alert("El dato ingresado no es un numero válido");
        }else if(!esNumeroEnRango(numero, min, max)){
            alert("El numero ingresado no está en rango");
        }else{
            break;
        }
    }while(true);
    return numero;
}

function esTexto (valor) {
    // Si es un string && tiene al menos 1 caracter && no es número
    return typeof valor === "string" && valor.trim().length > 0 && isNaN(valor);
}

function esNumero (valor) {
    // Si es un número
    return !isNaN(valor);
}

function esNumeroEnRango (valor, min, max) {
    // Si es un número && es mayor al mínimo && es menor al máximo
    return esNumero(valor) && valor >= min && valor <= max;
}

function esCodigoUnico(codigoRecibido) {
    // Recorro el array con los disco
    // discografia.listaDiscos.same((disco) => disco.getId === codigoRecibido);
    for(let disco of discografia.listaDiscos){
        // Miro si el código ingresado es igual a el del disco del array
        if(codigoRecibido == disco.getId){
            // El código ya existe
            return false;
        }
    }
    // El código no existe
    return true;
}