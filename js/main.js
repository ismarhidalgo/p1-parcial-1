'use strict';

/*
 * CORBALAN, NICOLAS LEONEL
 */

// DECLARACIÓN DE VARIABLES -------------------------------------------------------------------
let listaDiscos; // Uso let porque inicializo el array al recorrer el json
const $divDiscos = document.querySelector("#contenedorDiscos"); // Contenedor en el que se mostrarán los discos
const $pCantDiscos = document.querySelector("#cantidadDiscos"); // <p> que informa la -cantidad(Cant)- de discos que se están mostrando

// RECORRER EL JSON CON LOS DISCOS ------------------------------------------------------------
fetch("discos.json").then(response => response.json()).then(discosJson => {
    listaDiscos = discosJson.map((disco) => {
        return new Disco(
            disco.nombre,
            disco.artista,
            disco.id,
            disco.portada,
            disco.pistas.map((pista) => new Pista(pista.nombre, pista.duracion))
        );
    });
});

// EVENTOS CLICK ------------------------------------------------------------------------------
/*
 * Evento asociado a un botón, pide los datos para un disco
 */
document.querySelector("#btnNuevoDisco").addEventListener("click", ()=>{
    // PIDO LOS DATOS DEL DISCO
    const discoNombre = solicitarTexto("Ingrese el nombre del disco");
    const discoArtista = solicitarTexto("Ingrese el nombre del artista o la banda");
    const discoPortada = solicitarTexto("Ingrese el link a la portada del disco");
    const discoPistas = [];
    let discoId;
    do {
        discoId = solicitarNumeroEnRango(0, 999, "Ingrese el código único del disco");

        if(esCodigoUnico(discoId)){
            alert("Este código ya existe");
        }else{
            break;
        }
    }while(true);

    // PIDO LOS DATOS DE LAS PISTAS Y LAS VOY AGREGANDO AL ARRAY discoPistas
    do {
        const pistaNombre = solicitarTexto("Ingrese el nombre de la pista");
        const pistaDuracion = solicitarNumeroEnRango(1, 7000, "Ingrese la duración de la pista en segundos");

        discoPistas.push(new Pista(pistaNombre, pistaDuracion));
    }while(confirm(`¿Desea cargar otra pista? \n${discoPistas.length} pista/s cargadas hasta el momento`));

    // CREO EL OBJETO DISCO
    const disco = new Disco(
        discoNombre,
        discoArtista,
        discoId,
        discoPortada,
        discoPistas
    );

    // AGREGO EL OBJETO DISCO AL ARRAY
    listaDiscos.push(disco);
});

/*
 * Evento asociado a un botón, muestra todos los discos del array
 */
document.querySelector("#btnMostrarDiscos").addEventListener("click", ()=>{
    // COMPRUEBO SI HAY DISCOS PARA MOSTRAR PARA INFORMARLE AL USUARIO
    if(listaDiscos.length === 0) alert("No hay discos que mostrar")

    // BORRO TODO LO QUE PUEDA TENER EL CONTENEDOR Y CONFIGURO $pCantDiscos
    $divDiscos.innerHTML = "";
    mostrarInfoGeneral(listaDiscos.length);

    // RECORRO TODOS LOS DISCOS Y GENERO SU ESTRUCTURA HTML
    listaDiscos.forEach(disco => {
        $divDiscos.innerHTML += disco.generarEstructuraHtml();
    });
});

/*
 * Evento asociado a un botón, muestra los datos de un disco en
 * específico en base a su id (ingresado por el usuario)
 */
document.querySelector("#btnBuscarDisco").addEventListener("click", ()=>{
    // PIDO EL ID DEL DISCO QUE BUSCA
    const discoId = solicitarNumeroEnRango(0, 999);

    // UTILIZO .find PARA VER SI EXISTE ALGUNA COINCIDENCIA
    const busqueda = listaDiscos.find(disco => discoId === disco.getId);

    // COMPRUEBO EL RESULTADO DE LA BÚSQUEDA
    if(busqueda != undefined) {
        // La busqueda fue exitosa, el disco existe
        $divDiscos.innerHTML = "";
        mostrarInfoGeneral(1);

        $divDiscos.innerHTML += busqueda.generarEstructuraHtml();
    }else {
        // La NO fue exitosa, el disco no existe
        alert("No existe un disco con ese id 😔");
    }
});

// METODOS Y FUNCIONES ------------------------------------------------------------------------
/*
 * Método de Number que transforma su valor en
 * horas, minutos y segundos y los retorna en
 * el formato especificado por parámetro (opcional)
 */
Number.prototype.toHhMmSs = function (_formato = 1) {
    // Método de Number que convierte una cantidad de segundos las horas, minutos y segundos en el formato indicado
    let hh = Math.floor(this / 3600).toString(); // 3600 seg es 1 hora
    let mm = Math.floor((this / 60) % 60).toString(); // 60 seg es 1 minuto, pero no puedo tener más de 60min
    let ss = Math.floor(this % 60).toString(); // No puedo tener más de 60 segundos

    // Función para agregar un 0 en caso de que alguno de los valores tenga 1 solo dígito
    hh = hh < 10 ? "0" + hh: hh;
    mm = mm < 10 ? "0" + mm: mm;
    ss = ss < 10 ? "0" + ss: ss;

    // Creo un objeto con los formatos admitidos
    const FORMATOS = {
        0 : {hh, mm, ss},
        1 : `${hh}:${mm}:${ss}`,
        2 : `${hh} h ${mm} min ${ss} seg`,
        3 : `${mm}:${ss}`
    };

    return FORMATOS[_formato];
};

/*
 * Función que muestra la cantidad de discos en pantalla
 * y la duración total entre todos los discos
 */
function mostrarInfoGeneral(cantidad){
    const duracionTotal = listaDiscos.reduce((acumulador, disco) => acumulador + disco.getDuracionTotal, 0);
    $pCantDiscos.innerHTML = `Se están mostrando: ${cantidad} disco/s - Duracion total: ${duracionTotal.toHhMmSs(2)}`;
}

// SOLICITAR VALORES AL USUARIO (textos, numeros) ---------------------------------------------
function solicitarTexto(_mensaje) {
    let texto;
    do {
        texto = prompt(_mensaje || "Ingrese un texto") ?? '';
        texto = texto.trim();

        if(!esTexto(texto)) {
            alert("El dato ingresado no es un texto válido 😢");
        }else {
            return texto;
        }
    }while(true);
}

function solicitarNumeroEnRango(min, max, _mensaje) {
    let numero;
    do {
        numero = parseInt(prompt((_mensaje || `Ingrese un número en rango`) + ` (${min} al ${max})`));

        if(!esNumero(numero)) {
            alert("El dato ingresado no es numérico");
        }else if(!esNumeroEnRango(numero, min, max)){
            alert("El numero ingresado no está en rango");
        }else{
            return numero;
        }
    }while(true);
}

// VALIDACIONES -------------------------------------------------------------------------------
function estaVacio(valor) {
    /* Yo uso el operador nullish (??), por lo que no debería tener
     * un valor null, pero nunca está de más validarlo igualmente
     */
    return valor === null || typeof valor === "string" && valor.trim() === "";
}

function esTexto(valor) {
    return typeof valor === "string" && isNaN(valor);
}

function esNumero(valor) {
    return !isNaN(valor);
}

function esNumeroEnRango(valor, min, max) {
    return esNumero(valor) && valor >= min && valor <= max;
}

function esCodigoUnico(valor) {
    // Si encuentra una coincidencia, devuelve true
    return (listaDiscos.some((disco) => valor == disco.getId));
}