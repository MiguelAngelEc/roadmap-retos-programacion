
class Calculadora{
    suma(a, b){
        try {
            if(isNaN(a) || isNaN(b)){
                throw new Error("Ambos valores deben ser enteros");
            }
            let resul = Number(a) + Number(b);
            return resul;
        } catch (error) {
            console.log("Ocurrio un error en suma(): ", error.message)
            return null;
        }
    }

    resta(a, b){
        try {
            if(isNaN(a) || isNaN(b)){
                throw new Error("Ambos numeros deben ser enteros");
            }
            let result = Number(a) - Number(b);
            return result;
        } catch (error) {
            console.log("Ocurrio un error al restar(): ", error.message)
            return null;
        }
    }

    multiplicacion(a, b){
        try{
            if(isNaN(a) || isNaN(b)){
                throw new Error("Ambos numeros deben ser enteros")
            }
            let result = Number(a) * Number(b)
            return result;
        }catch(error){
            console.log("Ocurrio un error al multiplicar(): ", error.message)
            return null;
        }
    }

    division(a, b){
        try {
            const numA = Number(a)
            const numB = Number(b)
            if(isNaN(numA) || isNaN (numB)){
                throw new Error("Ambos numeros deben ser enteros")
            }else if(numB === 0){
                throw new Error("No puede ser dividido para 0")
            }

            let result = numA / numB;
            return result;
        } catch (error) {
            console.log("Ocurrio un error al dividir(): ", error.message)
            return null;
        }
    }

    operar(a, operador, b){
        try {
            switch (operador) {
            case "+":
                return this.suma(a, b);
            case "-":
                return this.resta(a, b);
            case "*":
                return this.multiplicacion(a, b);
            case "/":
                return this.division(a, b);
            default:
                throw new Error("Operador no valido");
            }
        } catch (error) {
            console.log("Ocurrio un error al operar(): ", error.message)
            return null;
        }
        
    }
}

const calc = new Calculadora();

console.log(calc.operar(100, "/", 100))
