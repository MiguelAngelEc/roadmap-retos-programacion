// class Animal{
//     constructor(especie = "Por definir", nombre = "Por definir", raza = "Por definir", sonido = "Por definir"){
//         this.especie = especie;
//         this.nombre = nombre;
//         this.raza = raza;
//         this.sonido = sonido;
//     }

//     animalComer() {
//         console.log(`El ${this.especie} esta comiendo`)
//     }

//     animalSonido(){
//         console.log(`El Animal perteneciente a la especie ${this.especie} de nombre ${this.nombre} hace ${this.sonido}`)
//     }

// }

// // Subclase extructurada con constructor y creacion de un nuevo parametro
// class Perro extends Animal {
//   constructor(especie = "Perro", nombre = "Por definir", raza = "Por definir", sonido = "Por definir", truco) {
//     super(especie, nombre, raza, sonido);
//     this.truco = truco;
//   }
    
//     perroTrucar(){
//         console.log(`El perro ${this.nombre} sabe ${this.truco}`)
//     }

// }

// //Subclase creada solo para ejecutar la funcion de la clase Animal para comprender que asi igual funciona
// class Gato extends Animal{
 
// }

// // Polimorfismo, en la cual se puede ver como se cambia una funcion dependiendo de la necesidad de la Subclase
// class Tortuga extends Animal{

//     animalSonido() {
//         console.log(`El Animal perteneciente a la especie ${this.especie} de nombre ${this.nombre} no tiene un sonido especifico`)
//     }
    
// }

// // Se crea un array 
// const animales =[
//     new Perro("Perro", "Rocky", "Husky", "Wuau Wuau", "Saltar"),
//     new Gato("Gato", "Michi", "Miau Miau"),
//     new Tortuga("Tortuga", "Pedri")
// ]

// // Se hace un bucle para llamar con una sola funcion a const animales
// for(let animal of animales){
//     animal.animalSonido()
//     //Validamos para que la funcion perroTrucar funciones solamente si se encuentra en la subclase Perro 
//     if (animal instanceof Perro){
//         animal.perroTrucar()
//     }
// }


// Reto EXTRA

class Empleado{
    constructor(id, nombre) {
        this.id = id
        this.nombre =nombre
    }
}

class Gerente extends Empleado{
    constructor(id, nombre, listEmpledos = []){
        super(id, nombre)
        this.listEmpledos = listEmpledos
    }

    asignarTarea(empleado, tarea){
        console.log(`El gerente ${this.nombre} asigna "${tarea}" a ${empleado.nombre}`)
    }

    mostrarEmpleados(){
        console.log(`Emplados a cargo de ${this.nombre}:`)
        this.listEmpledos.forEach(empleado => 
            console.log(`- ${empleado.nombre}`)
        )
    }
}

class GerenteProyectos extends Empleado{
    constructor(id, nombre, listProyectos = []){
        super(id, nombre)
        this.listProyectos = listProyectos
    }

    planificarProyecto(proyecto) {
        this.listProyectos.push(proyecto)
        console.log(`El gerente ${this.nombre} planifica el proyecto "${proyecto}"`)
    }

    reportarProyecto(proyecto){
        console.log(`El gerente ${this.nombre} reporta el proyecto "${proyecto}"`)
    }
}

class Programador extends Empleado{
    constructor(id, nombre, lenguajes = [], proyectoActual = "Sin Asignar"){
        super(id, nombre)
        this.lenguajes = lenguajes
        this.proyectoActual = proyectoActual
    }

    programar(){
        console.log(`${this.nombre} está programando en: ${this.lenguajes.join(", ")}`);
    }

    reportarAvance(){
        console.log(`${this.nombre} reporta avance en el proyecto: ${this.proyectoActual}`);
    }
}

const empleado1 = new Empleado(1, "Miguel")
const empleado2 = new Empleado(2, "Leo")
const empleado3 = new Empleado(3, "Jess")
const tarea1 = "Eliminar el Bug"
const tarea2 = "Corregir la pagina Web"
const proyecyo1 = "Crear el analisis de la empresa"
const proyecto2 = "Creacion de Paginas Web"

const gerente = new Gerente(4, "Pamela", [empleado1, empleado2, empleado3])

const gerenteProyectos = new GerenteProyectos(2, empleado2.nombre, [proyecyo1, proyecto2])

const programador = new Programador(1, empleado1.nombre, ["JavaScript", "pythom"], proyecto2)

gerente.mostrarEmpleados()
gerente.asignarTarea(empleado1, tarea1)
gerente.asignarTarea(empleado2, proyecyo1)
gerenteProyectos.planificarProyecto(proyecyo1)
gerenteProyectos.reportarProyecto(proyecyo1)
programador.programar()
programador.reportarAvance()
