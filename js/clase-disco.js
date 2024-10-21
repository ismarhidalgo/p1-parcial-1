'use strict';

class Disco {
    // Ordenadas en el orden en el que aparecen en el json (sin ningún motivo aparente)
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
                    <div>
                        <h2>${this.#nombre}</h2>
                        <p>${this.#artista} ● ${this.#pistas.length} Pistas, ${this.getDuracionTotal.toHhMmSs(2)}, (promedio: ${(this.getDuracionTotal / this.#pistas.length).toHhMmSs(2)}) </p>
                        <p>${this.#id}</p>
                    </div>
                    <div>
                        <img alt="Portada del disco: ${this.#nombre}" src="${this.#portada}">
                    </div>
                </header>
                <div>
                    <ul>
                        ${this.#pistas.map(pista => pista.generarEstructuraHtml()).join()}
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

    get getId() {
        return this.#id;
    }
}