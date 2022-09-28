require('colors')
const mostrarMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear()
        console.log('=============================='.blue)
        console.log('Seleccione una opción'.blue)
        console.log('==============================\n'.blue)
        console.log(`${'1'.blue}. Crear una tarea`)
        console.log(`${'2'.blue}. Listar todas las tareas`)
        console.log(`${'3'.blue}. Listar tareas completadas`)
        console.log(`${'4'.blue}. Listar tareas pendientes`)
        console.log(`${'5'.blue}. Completar tarea(s)`)
        console.log(`${'6'.blue}. Borrar una tarea`)
        console.log(`${'0'.blue}. SALIR\n`)
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question('Seleccione una opción: ', (opcion) => {
            readLine.close()
            resolve(opcion)
        })
    })
}
const pausa = () => {
    return new Promise((resolve, reject) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question(`\nPulse ${'ENTER'.green} para continuar...\n`, (opcion) => {
            readLine.close()
            resolve()
        })
    })
}
// module.exports = { mostrarMenu, pausa }