/**
 * Clase que modela la entidad Auto
 */

class Auto {
    
    constructor(marca, modelo, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.id = -1;
    }

    mostrar_descripcion() {
        return (`${this.id} - ${this.modelo} - ${this.marca} -  $${this.precio}`)
    }

    // seteo el nuevo valor de id
    set_id(nuevo_id) {
        this.id = nuevo_id;
    }
}







