'use strict';

class Pista {
    #nombre;
    #duracion;

    constructor(nombre, duracion) {
        this.#nombre = nombre;
        this.#duracion = duracion;
    }

    /*
     * Función que genera la estructura html de la pista
     */
    generarEstructuraHtml(_clasesExtra = "") {
        return `
            <li>
                <h3>${this.#nombre}</h3>
                <p class="${this.obtenerClases()}">${this.#duracion.toHhMmSs(3)}</p>
            </li>
        `;
    }

    /*
     * Función que retorna un string con las clases que la
     * pista debería tener en base a sus características
     */
    obtenerClases() {
        let clases = "duracion";
        if(this.#duracion > 180) clases += " duracion--larga";

        return clases;
    }

    get getDuracion() {
        return this.#duracion;
    }
}