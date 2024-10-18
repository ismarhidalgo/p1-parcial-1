// class Pista {
//     constructor(pistaNombre, pistaDuracion) {
//         this.pistaNombre = pistaNombre;
//         this.pistaDuracion = pistaDuracion;
//     }
// }

class Pista {
    #pistaNombre;
    #pistaDuracion;
    #pistaId;

    constructor(nombre, duracion, id) {
        this.#pistaNombre = nombre;
        this.#pistaDuracion = duracion;
        this.#pistaId = id;
    }

    generarEstructuraHtml(discoId, idPistaMasLarga) {
        // La clase que se le va a poner a la duración del la pista
        let clase = "hints__duration";
        clase += (this.#pistaDuracion > 180) ? " hints__duration--large" : "";
        clase += (idPistaMasLarga == this.#pistaId) ? " hints__duration--largest" : "";

        let otrosAtributos = "";
        if(idPistaMasLarga == this.#pistaId) {
            otrosAtributos = `title="Pista más larga"`;
        }

        return `
            <li id="disco${discoId}Pista${this.#pistaId}" class="hints__item">
                <p class="hints__number">${this.#pistaId + 1}</p>
                <h5 class="hints__name">${this.#pistaNombre}</h5>
                <p class="${clase}" ${otrosAtributos}>${formatoHhMmSs(this.#pistaDuracion, 1)}</p>
            </li>`
    }

    get getNombre() {
        return this.#pistaNombre;
    }

    get getDuracion(){
        return this.#pistaDuracion;
    }

    get getId(){
        return this.#pistaId;
    }
}