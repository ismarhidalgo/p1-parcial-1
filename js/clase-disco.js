"use strict";

class Disco {
  #nombre;
  #artista;
  #id;
  #portada;
  #pistas;

  constructor(nombre, artista, id, portada, _pistas) {
    this.#nombre = nombre;
    this.#artista = artista;
    this.#id = id;
    this.#portada = portada;
    this.#pistas = Array.isArray(_pistas) ? _pistas : [];
  }

  get getPistaMasLarga() {
    return this.#pistas.reduce((max, pista) =>
      pista.getDuracion > max.getDuracion ? pista : max
    );
  }

  get getDuracionTotal() {
    return this.#pistas.reduce((acum, pista) => acum + pista.getDuracion, 0);
  }

  get getId() {
    return this.#id;
  }

  /**
   * Devuelve el HTML con los datos del disco y sus pistas.
   */
  generarEstructuraHtml() {
    const duracionTotal = this.getDuracionTotal;
    const pistaMasLarga = this.getPistaMasLarga;
    const promedio = duracionTotal / this.#pistas.length;

    const pistasHtml = this.#pistas.map(pista =>
      pista.generarEstructuraHtml(
        pista === pistaMasLarga ? "destacada" : ""
      )
    ).join(" ");

    return `
      <article>
        <header>
          <div class="info">
            <h2>${this.#nombre}</h2>
            <p class="artista">
              <span class="text-bold">${this.#artista}</span> ● 
              ${this.#pistas.length} Pistas, ${duracionTotal.toHhMmSs(2)}, 
              (promedio: ${promedio.toHhMmSs(2)})
            </p>
            <p class="pista-mas-larga">
              Pista con mayor duración: ${pistaMasLarga.getNombre} (${pistaMasLarga.getDuracion.toHhMmSs(2)})
            </p>
            <p class="id">ID: ${this.#id}</p>
          </div>
          <div class="portada">
            <img alt="Portada del disco: ${this.#nombre}" src="${this.#portada}">
          </div>
        </header>
        <div>
          <ul>
            ${pistasHtml}
          </ul>
        </div>
      </article>
    `;
  }
}