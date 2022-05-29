
let arreglo_auto = [];     //array vacio
let gen_id = 1;      //variable generadora de id, que se ira incrementando
alert("Bienvenidos al sistema de compra y venta de autos!");
let flag = true;

while (flag) {

    let mensaje = "Indique lo que desea hacer: ";
    mensaje += "\n1) Cargar nuevo auto";
    mensaje += "\n2) Eliminar un auto";
    mensaje += "\n3) Mostrar autos en stock";
    mensaje += "\n4) Aplicar un descuento";
    mensaje += "\n5) Salir";
    mensaje += "\n6) Mostrar autos con precios pares";
    let resp =  prompt(mensaje);
    
    
    switch (resp) {
        case "1":
            ingresar_nuevo_auto();
            break;
        case "2":
            eliminar_auto();
            break;
        case "3":
            mostrar_autos();
            break;
        case "4":
            aplicar_descuento();
            break;
        case "5":
            alert("Gracias por utilizar nuestra pagina :) ");
            flag = false;
            break;
        case "6":
            mostrar_autos_precio_par();
            break;
        case null:
            alert("Gracias por utilizar nuestra pagina :) ");
            flag = false;
            break;
        default:
            alert("No ingresaste una opcion valida");
    }
}


//solicito datos al usuario y lo guardo en el array vacio, con push.
function ingresar_nuevo_auto() {

    let auto = solicitar_datos_auto();    //si esta todo correcto devolvera un auto
    if (auto) {
        //si vino un dato adentro
        auto.set_id(gen_id);    //asigno un nuevo id 
        gen_id++;
        arreglo_auto.push(auto);
        alert("Auto agregado con exito");
    }
}

function solicitar_datos_auto() {
    let check = true;
    while (check) {

        let msj = "";
        let marca = prompt("Ingrese marca").trim();
        let modelo = prompt("Ingrese modelo").trim();
        let precio = parseFloat(prompt("Ingrese precio").trim());

        //validaciones
        if (!marca) {
            msj += "\nDebe ingresar marca";
        }
        if (!modelo) {
            msj += "\nDebe ingresar modelo";
        }
        if (isNaN(precio)) {
            msj += "\nDebe ingresar un valor numerico";
        }
        if (msj != "") {
            alert(msj);
            check = confirm("Desea cargar de nuevo los datos?");
        } else {
            return new Auto(marca, modelo, precio);
        }
    }
}


function eliminar_auto() {
    //primero hay que ver si hay autos para eliminar
    if (existen_autos()) {
        let id_ingresado = prompt("Ingrese el id del auto a eliminar");

        //nos aseguramos que el id ingresado a eliminar existe dentro del array 
        if (arreglo_auto.some((a) => a.id == id_ingresado)) {

            //utilizamos find() para identificar el elemento que el usuario ingreso 
            let auto_encontrado = arreglo_auto.find((a) => a.id == id_ingresado);

            if (auto_encontrado) {

                let resp = confirm("Está seguro que desea eliminar el auto: " + auto_encontrado.mostrar_descripcion() + " ?");
                if (resp) {
                    //generamos un nuevo arreglo con todos los elementos cuyo id sea != del ingresado
                    arreglo_auto = arreglo_auto.filter((a) => a.id != id_ingresado);

                    alert("Auto fue eliminado con exito");
                }
            }
        }
        else {
            //si no existe el id ingresado avisa al usuario
            alert("el id ingresado no existe");
        }
    }
}



function existen_autos() {
    if (arreglo_auto.length == 0) {
        alert("no hay autos en stock");
        return false
    }
    return true;
}


function mostrar_autos() {
    if (existen_autos()) {
        let resp = prompt("Si desea mostrar precios en forma ascendente presione 'A', si desea descendente presione 'D'.").toUpperCase();

        if (resp == "A") {

            arreglo_auto.sort((a, b) => {
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                return 0;
            })
        }
        if (resp == "D") {

            arreglo_auto.sort((a, b) => {
                if (a.precio > b.precio) {
                    return -1;
                }
                if (a.precio < b.precio) {
                    return 1;
                }
                return 0;
            })
        }
        mostrar_arreglo();
    }
}


function mostrar_arreglo() {
    let mensaje = "Los autos en stock son";
    arreglo_auto.forEach((auto) => {
        mensaje += "\n" + auto.mostrar_descripcion();
    })

    alert(mensaje);
}


//hacemos nuestra propia funcion buscar
function buscar_auto(id_a_buscar) {
    let count = 0;
    while (count < arreglo_auto.length) {
        if (arreglo_auto[count].id == id_a_buscar) {
            return arreglo_auto[count];
        }
        count++;
    }

}


function aplicar_descuento() {
    if (existen_autos()) {
        let descuento = +prompt("Ingrese el descuento a aplicar");

        if (!isNaN(descuento)) {

            let desc = descuento / 100;

            const arreglo_auto_descuentos = arreglo_auto.map((auto) => {
                return {
                    marca: auto.marca,
                    modelo: auto.modelo,
                    precio: auto.precio * (1 - desc)
                }
            })
            alert("A los autos se les aplicara un descuento del " + descuento + "%. ")
            let mensaje = "Los autos con los descuentos aplicados son : \n"
            arreglo_auto_descuentos.forEach((auto) => {
                mensaje += "Marca: " + auto.marca + " - " + "Modelo: " + auto.modelo + " - " + "Precio con descuento: " + auto.precio + "\n"
            })

            alert(mensaje);
            return
        }
    }
}

//clasificamos por precio par

function mostrar_autos_precio_par(){
    if(existen_autos()){
        let precioPares = precioPar(arreglo_auto)
        let mensaje = "Los autos con precios pares son: \n"
        precioPares.forEach((auto) => {
            mensaje += "Marca: " +auto.marca+" - "+"Modelo: "+auto.modelo+" - "+"Precio: "+auto.precio+ "\n"
        })
        alert(mensaje)
    }
}

function precioPar(array){
    let precioPar = []
    array.forEach((auto) => {
        if(auto.precio % 2 == 0){
            precioPar.push(auto)
        }
    })
    return precioPar
}





//**reemplazo del switch */

// const menu_opciones = 
// {
//     '1' : ()=> ingresar_nuevo_auto(),
//     '2' : ()=> eliminar_auto(),
//     '3' : ()=> mostrar_autos(),
//     '4' : ()=> aplicar_descuento(),
//     '5' : ()=> {
//         alert("Gracias por utilizar nuestra pagina :) ");
//         flag = false;
//     },
//     '6' : ()=> mostrar_autos_precio_par(),
//     null: ()=> {
//         alert("Gracias por utilizar nuestra pagina :)");
//         flag = false;  
//     } 
// }3

// const op_default = ()=> alert("No ingresaste una opcion valida");