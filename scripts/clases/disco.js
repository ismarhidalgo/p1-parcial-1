class Disco {
    #discoNombre;
    #discoArtista;
    #discoId;
    #discoPortada;
    #discoPistas;

    constructor(nombre, artista, id, portada, _pistas){
        this.#discoNombre = nombre;
        this.#discoArtista = artista;
        this.#discoId = id;
        this.#discoPortada = portada;
        this.#discoPistas = _pistas ?? [];
    }

    agregarPista(nombre, duracion, id){
        const pista = new pista(nombre, duracion, id);
        this.#discoPistas.push(pista);
    }

    generarEstructuraHtml(){
        let estructura = "";
        let liPistas = "";
        // Li con las pista
        this.#discoPistas.forEach(pista => {
            // Utilzia el id del disco para determinar el id del li en el html (disco[ID]Pista[ID])
            liPistas += pista.generarEstructuraHtml(this.#discoId, this.getPistaMasLarga);
        });

        estructura =
        `
        <article id="disco${this.#discoId}" class="disc">
            <header class="disc__header">
                <div>
                    <img class="disc__img" alt="Portada del disco ${this.#discoNombre}" src="${this.#discoPortada}">
                </div>
                <div>
                    <h3 class="disc__name">${this.#discoNombre}</h3>
                    <h4 class="disc__band">${this.#discoArtista} <span class="disc__band--span">${this.#discoPistas.length} pistas, ${this.getDuracionTotal} ${this.getPromedioDuracion}</span></h4>
                    <p class="disc__id">id - ${this.#discoId}</p>
                </div>
            </header>
            <div class="disc__body">
                <ul class="hints">
                    <li class="hints__item hints__item--first-child">
                        <p class="hints__number">#</p>
                        <h5 class="hints__name">Nombre de la pista</h5>
                        <p class="hints__duration">Duración</p>
                    </li>
                    ${liPistas}
                </ul>
            </div>
        </article>
        `;
        return estructura;
    }

    mostrarDiscoPorConsola() {
        console.log(this);
    }

    get getNombre(){
        // Retorna un objeto con todos los datos del disco
        return this.#discoNombre;
    }

    get getArtista(){
        // Retorna un objeto con todos los datos del disco
        return this.#discoArtista;
    }

    get getId(){
        // Retorna un objeto con todos los datos del disco
        return this.#discoId;
    }

    get getPortada(){
        // Retorna un objeto con todos los datos del disco
        return this.#discoPortada;
    }

    get getPistas(){
        // Retorna un objeto con todos los datos del disco
        return this.#discoPistas;
    }

    get getDuracionTotal(){
        let duracionTotal = 0;

        this.#discoPistas.forEach(pista => {
            duracionTotal += pista.getDuracion;
        });

        return formatoHhMmSs(duracionTotal, 2);
    }

    get getPromedioDuracion(){
        let duracionTotal = 0;

        this.#discoPistas.forEach(pista => {
            duracionTotal += pista.getDuracion;
        });
        let promedio = duracionTotal / this.#discoPistas.length;
        return formatoHhMmSs(promedio, 1);
    }

    get getPistaMasLarga() {
        // Función que tetorna el id de la pista más larga
        const pistaId = this.#discoPistas.reduce((masAlto, pista)=>{
            if(masAlto[0] < pista.getDuracion) {
                return [pista.getDuracion, pista.getId];
            }else{
                return [masAlto[0], masAlto[1]];
            }
        }, [this.#discoPistas[0].getDuracion, this.#discoPistas[0].getId]);

        return pistaId[1];
    }
}

// numeros.reduce((masAlto, numero) => numero > masAlto ? numero : masAlto, numeros[0])


// numeros.reduce((masAlto, numero) => {
//     return numero > masAlto ? numero : masAlto
// }, -Infinity) 

// numeros.reduce((acumulador, elemento) => {
//     return acumulador + elemento
// }, 0)