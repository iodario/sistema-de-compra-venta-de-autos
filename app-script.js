
alert("Bienvenidos al sistema de compra y venta de autos!");
let flag = true;

while (flag) {

    let mensaje = "Indique lo que desea hacer: ";
    mensaje += "\n1) Cargar nuevo auto";
    mensaje += "\n2) Eliminar un auto";
    mensaje += "\n3) Mostrar autos en stock";
    mensaje += "\n4) Aplicar un descuento";
    mensaje += "\n5) Salir";
    let resp = prompt(mensaje);

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
        case null:
            alert("Gracias por utilizar nuestra pagina :) ");
            flag = false;
            break;
        default:
            alert("No ingresaste una opcion valida");
    }
}

let arreglo_auto = [];     //array vacio
let gen_id = 1;      //variable generadora de id, que se ira incrementando

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
            alert("id no valido");
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


