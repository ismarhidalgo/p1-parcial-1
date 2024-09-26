'use strict';

/*
 * CORBALAN, NICOLAS LEONEL
 */
const codigos = [5, 10, 15];
class Disco {
    constructor(nombreDisco, autor, banda, codigoUnico, pistas){
        this.nombreDisco = nombreDisco;
        this.autor = autor;
        this.banda = banda;
        this.codigoUnico = codigoUnico;
        this.pistas = pistas;
    }

    // GETTERS Y SETTERS
    get getNombreDisco(){
        return this.nombreDisco();
    }

    get getAutor(){
        return this.autor();
    }

    get getBanda(){
        return this.banda();
    }

    get getCodigoUnico(){
        return this.codigoUnico();
    }

    set setNombreDisco(nuevoNombre) {
        this.nombreDisco = nuevoNombre;
    }

    set setAutor(nuevoAutor){
        this.autor = nuevoAutor;
    }

    set setBanda(nuevaBanda){
        this.banda = nuevaBanda;
    }

    set setCodigoUnico(nuevoCodigo){
        this.codigoUnico = nuevoCodigo;
    }
}

class Pista {
    constructor(pistaNombre, pistaDuracion) {
        this.pistaNombre = pistaNombre;
        this.pistaDiracion = pistaDuracion;
    }
}

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    // TODO:
    const discoNombre = solicitarTexto("Ingrese el nombre del disco");
    const discoAutor = solicitarTexto("Ingrese el autor");
    const discoBanda = solicitarTexto("Ingrese la banda");
    let discoCodigoUnico;
    const discoPistas = [];
    do{
        // DO-WHILE PARA CARGAR EL CÓDGIO ÚNICO
        discoCodigoUnico = solicitarNumeroEnRango(0, 999, "Ingrese el código numérico único del disco");

        if(!esCodigoUnico(discoCodigoUnico)){
            alert("Este código ya existe");
        }else{
            break;
        }
    }while(true);

    let numeroDePista = 1;
    do{
        // DO-WHILE PARA CARGAR LAS PISTAS
        let pistaNombre = solicitarTexto("Ingrese el nombre de la pista");
        let pistaDuracion = solicitarNumeroEnRango(1, 7000, "Ingrese la duración de la pista en segundos");

        let pista = new Pista(pistaNombre, pistaDuracion);
        discoPistas.push(pista);

        numeroDePista++;
    }while(confirm(`¿Desea cargar otra pista?\n(${numeroDePista - 1} pista/s cargadas)`));

    const disco = new Disco(
        discoNombre,
        discoAutor,
        discoBanda,
        discoCodigoUnico,
        discoPistas
    );

    discos.push(disco);
    alert("Disco cargado exitosamente");
}

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    // TODO
    console.log(discos);
};

function solicitarTexto(_mensaje) {
    let texto;
    do {
        texto = prompt(_mensaje || "Ingrese un texto") ?? '';
        texto = texto.trim();

        // console.log(esTexto(texto));

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
    return typeof valor === "string" && valor.trim().length > 0 && isNaN(valor);
}

function esNumero (valor) {
    return !isNaN(valor);
}

function esNumeroEnRango (valor, min, max) {
    return esNumero(valor) && valor >= min && valor <= max;
}

function esCodigoUnico(codigoRecibido) {
    for(let disco of discos){
        if(codigoRecibido == disco.codigoUnico){
            return false;
        }
    }
    return true;
}

const discos = [];