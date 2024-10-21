class Discografia{
    constructor(_discos) {
        this.listaDiscos = _discos ?? [];
    }

    agregarDisco(nombre, artista, id, portada, pistas){
        // Función que recibe parámetros para crear una objeto de la clase Disco y guardarla en el array
        const disco = new Disco(nombre, artista, id, portada, pistas);
        return this.listaDiscos.push(disco) - 1;
    }

    cargarNuevoDisco(){
        const discoNombre = solicitarTexto("Ingrese el nombre del disco");
        const discoArtista = solicitarTexto("Ingrese el nombre del artista");
        const discoPortada = solicitarTexto("Ingrese el link a la portada");
        let discoId;
        do {
            discoId = solicitarNumeroEnRango(0, 999, "Ingrese el código numérico único del disco");

            if(!esCodigoUnico(discoId)){
                alert("Este código ya existe");
            }else{
                break;
            }
        }while(true);

        const discoIndice = this.agregarDisco(discoNombre, discoArtista, discoId, discoPortada);
        let pistaId = 0; // También usado para mostrar la cantidad de pistas agregadas en el confirm
        do {
            const pistaNombre = solicitarTexto("Ingrese el nombre de la pista");
            const pistaDuracion = solicitarNumeroEnRango(1, 7000, "Ingrese la duración de la pista en segundos");

            this.listaDiscos[discoIndice].agregarPista(pistaNombre, pistaDuracion, pistaId);
            pistaId++;
        }while(confirm(`¿Desea cargar otra pista?\n(${pistaId} agregada/s hasta ahora)`));
    }

    mostrarDiscos() {
        const contenedor = document.getElementById("contenedorDiscos");
        contenedor.innerHTML = "";

        this.listaDiscos.forEach(disco => {
            // Pista con más duración
            contenedor.innerHTML += disco.generarEstructuraHtml();
        });
    }
}