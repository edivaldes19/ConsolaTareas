import { guardarDB, leerDB } from './helpers/guardarArchivo.js'
import {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} from './helpers/inquirer.js'
import { Tareas } from './models/tareas.js'
console.clear()
const main = async () => {
    let opcion = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()
    if (tareasDB) tareas.cargarTareasFromArray(tareasDB)
    do {
        opcion = await inquirerMenu()
        switch (opcion) {
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc)
                break
            case '2':
                tareas.listadoCompleto()
                break
            case '3':
                tareas.listarPendientesCompetadas(true)
                break
            case '4':
                tareas.listarPendientesCompetadas(false)
                break
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== `${tareas.listadoArr.length + 1}`) {
                    const ok = await confirmar('¿Estás seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea eliminada.')
                    }
                }
                break
        }
        guardarDB(tareas.listadoArr)
        if (opcion !== '7') await pausa()
    } while (opcion !== '7')
}
main()