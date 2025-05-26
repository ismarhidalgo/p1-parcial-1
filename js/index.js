"use strict";

// DECLARACIÓN DE VARIABLES -------------------------------------------------------------------
let listaDiscos; // Uso let porque inicializo el array al recorrer el json
const $divDiscos = document.querySelector("#contenedorDiscos"); // Contenedor en el que se mostrarán los discos
const $pCantDiscos = document.querySelector("#cantidadDiscos"); // <p> que informa la -cantidad(Cant)- de discos que se están mostrando
const $discosCargados = document.querySelector("#discosCargados");

// RECORRER EL JSON CON LOS DISCOS ------------------------------------------------------------
fetch("discos.json").then((response) => response.json()).then((discosJson) => {
    listaDiscos = discosJson.map((disco) => {
      return new Disco(
        disco.nombre,
        disco.artista,
        disco.id,
        disco.portada,
        disco.pistas.map((pista) => new Pista(pista.nombre, pista.duracion))
      );
    });

    
    $discosCargados.textContent = `Total de discos cargados: ${listaDiscos.length}`;
  });

// EVENTOS CLICK ------------------------------------------------------------------------------
// Evento asociado a un botón, pide los datos para un disco */

document.querySelector("#btnNuevoDisco").addEventListener("click", () => {
  // PIDO LOS DATOS DEL DISCO
  let discoNombre;
  do {
    discoNombre = prompt("Ingrese el nombre del disco:");
    if (!discoNombre || discoNombre.trim() === "" || (!isNaN(discoNombre))) {
      alert("El nombre del disco no puede ser un número o estar vacío");
    } 
  } while (!discoNombre || discoNombre.trim() === "" || !isNaN(discoNombre));

  let discoArtista;
  do {
    discoArtista = prompt("Ingrese el nombre del artista o banda:");
    if (!discoArtista || discoArtista.trim() === "" || (!isNaN(discoArtista))) {
      alert("El nombre del artista no puede ser un número o estar vacío.");
    }
  } while (!discoArtista || discoArtista.trim() === "" || !isNaN(discoArtista));

  let discoPortada;
  do {
    discoPortada = prompt("Ingrese el link de la imagen de portada:");
    if (!discoPortada || discoPortada.trim() === "" || (!isNaN(discoPortada))) {
      alert("Debe ingresar un link de imagen válido.");
    }
  } while (!discoPortada || discoPortada.trim() === "" || !isNaN(discoPortada));

  let discoId;
  do {
    discoId = parseInt(prompt("Ingrese el código único del disco (entre 0 y 999):"));

    if (isNaN(discoId) || discoId < 0 || discoId > 999) {
      alert("El código debe ser un número entre 0 y 999.");
    } else if (esCodigoUnico(discoId)) {
      alert("Este código ya existe, ingrese uno diferente.");
      discoId = null;
    }
  } while (discoId === null || isNaN(discoId) || discoId < 0 || discoId > 999);

  const discoPistas = [];
  do {
    let pistaNombre;
    do {
      pistaNombre = prompt("Ingrese el nombre de la pista:");
      if (!pistaNombre || pistaNombre.trim() === "" || (!isNaN(pistaNombre))) {
        alert("El nombre de la pista no puede ser un número o estar vacío.");
      }
    } while (!pistaNombre || pistaNombre.trim() === "" || (!isNaN(pistaNombre)));
    
    let pistaDuracion;
    do {
      pistaDuracion = parseInt(
        prompt("Ingrese la duración de la pista en segundos (1 a 7000):"));
      if (isNaN(pistaDuracion) || pistaDuracion < 1 || pistaDuracion > 7000) {
        alert("La duración debe ser un número entre 1 y 7000 segundos.");
      }
    } while (isNaN(pistaDuracion) || pistaDuracion < 1 || pistaDuracion > 7000);
    discoPistas.push(new Pista(pistaNombre.trim(), pistaDuracion));
  } while (confirm(`¿Desea cargar otra pista? \n${discoPistas.length} pista/s cargadas hasta el momento`));

  const disco = new Disco(
    discoNombre.trim(),
    discoArtista.trim(),
    discoId,
    discoPortada.trim(),
    discoPistas
  );

  listaDiscos.push(disco);
  $discosCargados.textContent = `Total de discos cargados: ${listaDiscos.length}`;
  //localStorage.setItem("discosGuardados", JSON.stringify(listaDiscos)); Guarda los discos
  mostrarInfoGeneral(listaDiscos.length);
  alert("¡Disco cargado con éxito!");
});

document.querySelector("#btnMostrarDiscos").addEventListener("click", () => {
  if (listaDiscos.length === 0) alert("No hay discos que mostrar");
  $divDiscos.innerHTML = "";

  mostrarInfoGeneral(listaDiscos.length);
  listaDiscos.forEach((disco) => {
    $divDiscos.innerHTML += disco.generarEstructuraHtml()});
});

document.querySelector("#btnBuscarDisco").addEventListener("click", () => {
  const discoId = solicitarNumeroEnRango(0, 999);
  const busqueda = listaDiscos.find((disco) => discoId === disco.getId);
  
  if (busqueda != undefined) {
    $divDiscos.innerHTML = "";
    mostrarInfoGeneral(1);
    $divDiscos.innerHTML += busqueda.generarEstructuraHtml();
  } else {
    alert("No existe un disco con ese id ");
  }});

// METODOS Y FUNCIONES ------------------------------------------------------------------------
Number.prototype.toHhMmSs = function (_formato = 1) {
  let hh = Math.floor(this / 3600).toString();
  let mm = Math.floor((this / 60) % 60).toString();
  let ss = Math.floor(this % 60).toString();

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  const FORMATOS = {
    0: { hh, mm, ss },
    1: `${hh}:${mm}:${ss}`,
    2: `${hh} h ${mm} min ${ss} seg`,
    3: `${mm}:${ss}`,
  };
  return FORMATOS[_formato];
};
  function mostrarInfoGeneral(cantidad) {
    const duracionTotal = listaDiscos.reduce(
      (acumulador, disco) => acumulador + disco.getDuracionTotal, 0 );
    $pCantDiscos.innerHTML = `Se están mostrando: ${cantidad} disco/s - Duracion total: ${duracionTotal.toHhMmSs(2)}`;
  }

  function solicitarTexto(_mensaje) {
    let texto;
    do {
      texto = prompt(_mensaje || "Ingrese un texto") ?? "";
      texto = texto.trim();
      if (!esTexto(texto) || !isNaN(discoNombre)) {
        alert("El dato ingresado no es un texto válido ");
      } 
      else {
        return texto;
      }
    } while (true);
  }

  function solicitarNumeroEnRango(min, max, _mensaje) {
    let numero;
    do {
      numero = parseInt(
        prompt(
          (_mensaje || `Ingrese un número en rango`) + ` (${min} al ${max})`
        )
      );
      if (!esNumero(numero)) {
        alert("El dato ingresado no es numérico");
      } else if (!esNumeroEnRango(numero, min, max)) {
        alert("El número ingresado no está en rango");
      } else {
        return numero;
      }
    } while (true);
  }

  // VALIDACIONES -------------------------------------------------------------------------------
  function estaVacio(valor) {
    return valor === null || (typeof valor === "string" && valor.trim() === "");
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
    return listaDiscos.some((disco) => valor == disco.getId);
  }
