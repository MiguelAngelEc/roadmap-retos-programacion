const fs = require("fs/promises");
const fsSync = require('fs');
const path = require("path");
const readline = require('readline')

// async function main() {
//     const usuario = process.argv[2] || 'MiguelAngelEc';


//     const nombreArchivo = `${usuario}.txt`;
//     const ruta = path.join(process.cwd(), nombreArchivo)

//     const nombre = 'Miguel Angel Castillo Enriquez'
//     const edad = 37
//     const lenguajeFavorito = 'JavaScript'

//     const contenido = `${nombre}\n${edad}\n${lenguajeFavorito}`

//     try {
//         await fs.writeFile(ruta, contenido, 'utf-8')
//         console.log(`Archivo creado: ${ruta}`);
        
//         const data = await fs.readFile(ruta, 'utf-8')
//         console.log('-----Contenido de Archivo-------')
//         console.log(data)

//         await fs.unlink(ruta)
//         console.log(`Archivo eliminado: ${nombreArchivo}`)

//     } catch (err) {
//         console.error(`Error al manejar el archivo: ${err.message}`)
//     }
// }

// main();

//  * DIFICULTAD EXTRA (opcional):
//  * Desarrolla un programa de gestión de ventas que almacena sus datos en un 
//  * archivo .txt.
//  * - Cada producto se guarda en una línea del archivo de la siguiente manera:
//  *   [nombre_producto], [cantidad_vendida], [precio].
//  * - Siguiendo ese formato, y mediante terminal, debe permitir añadir, consultar,
//  *   actualizar, eliminar productos y salir.
//  * - También debe poseer opciones para calcular la venta total y por producto.
//  * - La opción salir borra el .txt.
//  */
// ventas.js
// Uso: node ventas.js <usuario_opcional>
// Ejemplo: node ventas.js MiguelAngelEc

class Producto {
  constructor(name, amount, price) {
    this.name = name;
    this.amount = Number(amount); // cantidad entera o decimal según tu preferencia
    this.price = Number(price);
  }
}

// --- createInterface() es una manera de encapsular todo el setup, para no repetir código cada vez que queremos preguntar algo al usuario---
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
}
// Creamos un promesa para luego pasarle como parametro el createInterface 
function question(rl, texto) {
  return new Promise((resolve) => {
    rl.question(texto, (answer) => resolve(answer));
  });
}

// --- Archivo (nombre dinámico por usuario o por defecto) ---
const usuario = process.argv[2] || null;
const nombreArchivo = usuario ? `${usuario}_ventas.txt` : 'ventas.txt';
const ruta = path.join(process.cwd(), nombreArchivo);

// --- Operaciones sobre archivo ---
async function leerProductos() {
  try {
    // Si el archivo no existe, retornamos lista vacía
    await fs.access(ruta).catch(() => { throw { code: 'NO_EXISTE' }; });
    const contenido = await fs.readFile(ruta, 'utf8');
    if (!contenido.trim()) return [];
    const lineas = contenido.split('/\r?\n/').filter((l) => l.trim() !== '');
    const productos = lineas.map((line) => {
      const partes = line.split(',').map((p) => p.trim());
      // formato: nombre, cantidad, precio
      const [name, amount, price] = partes;
      return new Producto(name, Number(amount), Number(price));
    });
    return productos;
  } catch (err) {
    if (err && err.code === 'NO_EXISTE') return [];
    console.error('Error leyendo productos:', err);
    return []; // devolvemos vacio en caso de fallo
  }
}

async function guardarProductos(productos) {
  try {
    const contenido = productos
      .map((p) => `${p.name}, ${p.amount}, ${p.price}`)
      .join('\n') + (productos.length ? '\n' : '');
    await fs.writeFile(ruta, contenido, 'utf8');
  } catch (err) {
    console.error('Error guardando productos:', err);
    throw err;
  }
}

async function anadirProducto(producto) {
  try {
    const linea = `${producto.name}, ${producto.amount}, ${producto.price}\n`;
    // Append crea el archivo si no existe
    await fs.appendFile(ruta, linea, 'utf8');
  } catch (err) {
    console.error('Error añadiendo producto:', err);
    throw err;
  }
}

async function eliminarProductoPorNombre(nombre) {
  const productos = await leerProductos();
  const filtrados = productos.filter((p) => p.name.toLowerCase() !== nombre.toLowerCase());
  if (filtrados.length === productos.length) return false; // no encontrado
  await guardarProductos(filtrados);
  return true;
}

async function actualizarProductoPorNombre(nombre, nuevos) {
  const productos = await leerProductos();
  let encontrado = false;
  const actualizados = productos.map((p) => {
    if (p.name.toLowerCase() === nombre.toLowerCase()) {
      encontrado = true;
      // Si nuevos contienen undefined o '', mantenemos el valor anterior
      const name = nuevos.name && nuevos.name.trim() ? nuevos.name.trim() : p.name;
      const amount = (nuevos.amount !== undefined && nuevos.amount !== '') ? Number(nuevos.amount) : p.amount;
      const price = (nuevos.price !== undefined && nuevos.price !== '') ? Number(nuevos.price) : p.price;
      return new Producto(name, amount, price);
    }
    return p;
  });
  if (!encontrado) return false;
  await guardarProductos(actualizados);
  return true;
}

async function calcularVentaTotal() {
  const productos = await leerProductos();
  return productos.reduce((acc, p) => acc + (p.amount * p.price), 0);
}

// --- Interfaz de menú ---
async function menu() {
  const rl = createInterface();
  console.log('--- GESTOR DE VENTAS (archivo:', nombreArchivo, ') ---');

  let salir = false;
  while (!salir) {
    console.log('\nElige una opción:');
    console.log('1) Añadir producto');
    console.log('2) Listar todos los productos');
    console.log('3) Buscar producto por nombre');
    console.log('4) Actualizar producto');
    console.log('5) Eliminar producto');
    console.log('6) Calcular venta total');
    console.log('7) Calcular venta por producto (mostrar cada uno)');
    console.log('0) Salir (borrar archivo)');
    const opcion = (await question(rl, '> ')).trim();

    try {
      switch (opcion) {
        case '1': {
          const name = (await question(rl, 'Nombre del producto: ')).trim();
          const amountStr = (await question(rl, 'Cantidad vendida: ')).trim();
          const priceStr = (await question(rl, 'Precio unitario: ')).trim();
          const amount = Number(amountStr);
          const price = Number(priceStr);
          if (!name || Number.isNaN(amount) || Number.isNaN(price)) {
            console.log('Datos inválidos. Intenta de nuevo.');
            break;
          }
          await anadirProducto(new Producto(name, amount, price));
          console.log('Producto añadido.');
          break;
        }

        case '2': {
          const productos = await leerProductos();
          if (productos.length === 0) {
            console.log('No hay productos registrados.');
            break;
          }
          console.log('--- Productos ---');
          productos.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} — cantidad: ${p.amount} — precio: ${p.price}`);
          });
          break;
        }

        case '3': {
          const nombre = (await question(rl, 'Nombre a buscar: ')).trim();
          const productos = await leerProductos();
          const encontrados = productos.filter((p) => p.name.toLowerCase().includes(nombre.toLowerCase()));
          if (encontrados.length === 0) {
            console.log('No se encontraron productos.');
          } else {
            console.log('--- Resultados ---');
            encontrados.forEach((p) => {
              console.log(`${p.name} — cantidad: ${p.amount} — precio: ${p.price} — subtotal: ${p.amount * p.price}`);
            });
          }
          break;
        }

        case '4': {
          const nombre = (await question(rl, 'Nombre del producto a actualizar: ')).trim();
          const productos = await leerProductos();
          const existe = productos.some((p) => p.name.toLowerCase() === nombre.toLowerCase());
          if (!existe) {
            console.log('Producto no encontrado.');
            break;
          }
          console.log('Deja vacío el campo para mantener el valor actual.');
          const nuevoName = (await question(rl, 'Nuevo nombre: ')).trim();
          const nuevoAmount = (await question(rl, 'Nueva cantidad: ')).trim();
          const nuevoPrice = (await question(rl, 'Nuevo precio: ')).trim();
          const ok = await actualizarProductoPorNombre(nombre, {
            name: nuevoName,
            amount: nuevoAmount,
            price: nuevoPrice,
          });
          console.log(ok ? 'Producto actualizado.' : 'Error al actualizar.');
          break;
        }

        case '5': {
          const nombre = (await question(rl, 'Nombre del producto a eliminar: ')).trim();
          const ok = await eliminarProductoPorNombre(nombre);
          console.log(ok ? 'Producto eliminado.' : 'No se encontró el producto.');
          break;
        }

        case '6': {
          const total = await calcularVentaTotal();
          console.log('Venta total (suma de cantidad * precio):', total);
          break;
        }

        case '7': {
          const productos = await leerProductos();
          if (productos.length === 0) {
            console.log('No hay productos.');
            break;
          }
          console.log('Ventas por producto:');
          productos.forEach((p) => {
            console.log(`${p.name}: cantidad ${p.amount} * precio ${p.price} = ${p.amount * p.price}`);
          });
          break;
        }

        case '0': {
          // Al salir borramos el archivo (si existe)
          rl.close();
          try {
            await fs.unlink(ruta).catch(() => {}); // ignorar si no existe
            console.log('Archivo borrado. Saliendo...');
          } catch (err) {
            console.error('Error borrando archivo al salir:', err);
          }
          salir = true;
          break;
        }

        default:
          console.log('Opción inválida. Elige otra.');
      }
    } catch (err) {
      console.error('Error en la operación:', err);
    }
  }

  // final
  process.exit(0);
}

// --- Ejecutar el menú ---
(async () => {
  try {
    // Creamos archivo si no existe (opcional)
    if (!fsSync.existsSync(ruta)) {
      await fs.writeFile(ruta, '', 'utf8');
    }
    await menu();
  } catch (err) {
    console.error('Error iniciando la aplicación:', err);
  }
})();
