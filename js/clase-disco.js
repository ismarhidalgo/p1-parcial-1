'use strict';

class Disco {
    #nombre;
    #artista;
    #id;
    #portada;
    #pistas;

    constructor(nombre, artista, id, portada, _pistas){
        this.#nombre = nombre;
        this.#artista = artista;
        this.#id= id;
        this.#portada = portada;
        this.#pistas = _pistas || [];
    }

    /*
     * Metodo que retorna la estructura html del disco, junto con sus pistas
     */
    generarEstructuraHtml() {
        return `
            <article>
                <header>
                    <div class="info">
                        <h2>${this.#nombre}</h2>
                        <p class="artista"><span class="text-bold">${this.#artista}</span> ● ${this.#pistas.length} Pistas, ${this.getDuracionTotal.toHhMmSs(2)}, (promedio: ${(this.getDuracionTotal / this.#pistas.length).toHhMmSs(2)}) </p>
                        <p class="id">id: ${this.#id}</p>
                    </div>
                    <div class="portada">
                        <img alt="Portada del disco: ${this.#nombre}" src="${this.#portada}">
                    </div>
                </header>
                <div>
                    <ul>
                        ${this.#pistas.map(pista => pista.generarEstructuraHtml()).join(" ")}
                    </ul>
                </div>
            </article>
        `;
    }

    /*
     * Función que retorna la duración total del disco entre todas las pistas que tiene
     */
    get getDuracionTotal() {
        return this.#pistas.reduce((duracionTotal, pista) => duracionTotal + pista.getDuracion, 0);
    }

    /*
     * Función usada principalmente para validar si el códgio ya existe en el archivo main.js
     */
    get getId() {
        return this.#id;
    }
}