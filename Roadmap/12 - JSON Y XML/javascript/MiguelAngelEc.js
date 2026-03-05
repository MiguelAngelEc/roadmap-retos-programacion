const datos = []

datos.push({
    id: 1,
    name: "Miguel Angel Castillo",
    age: 12
    },
    {
        id: 2,
        name: "Leo",
        age: 25
    },
    {
        id: 3,
        name: "Susana",
        age: 5
    }   
)

function search(id){
    try {
        if(id === undefined){
            throw new Error("Datos encontrados")
        }
        return datos.filter((item) => item.id === id)
    } catch (error) {
        console.log("Error: ", error.message)
    }
    
}
console.log(search(4))