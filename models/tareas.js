import { Tarea } from './tarea.js';
class Tareas {
    _listado = {}
    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }
    constructor() {
        this._listado = {}
    }
    borrarTarea(id = '') {
        if (this._listado[id]) delete this._listado[id]
    }
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea)
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }
    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, index) => console.log(`${`${index + 1}.`.blue} ${tarea.desc} :: ${tarea.completadoEn != null ? 'Completada'.blue : 'Pendiente'.red}`))
        console.log(`Total de tareas: ${`${this.listadoArr.length}`.blue}`)
    }
    listarPendientesCompetadas(completadas = true) {
        console.log()
        if (completadas) {
            const completadas = this.listadoArr.filter(tarea => tarea.completadoEn != null)
            completadas.forEach((tarea, index) => console.log(`${`${index + 1}.`.blue} ${tarea.desc} :: ${tarea.completadoEn.blue}`))
            console.log(`Total de tareas completadas: ${`${completadas.length}`.blue}`)
        } else {
            const pendientes = this.listadoArr.filter(tarea => tarea.completadoEn == null)
            pendientes.forEach((tarea, index) => console.log(`${`${index + 1}.`.blue} ${tarea.desc}`))
            console.log(`Total de tareas pendientes: ${`${pendientes.length}`.blue}`)
        }
    }
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (tarea.completadoEn == null) tarea.completadoEn = new Date().toISOString()
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) this._listado[tarea.id].tarea.completadoEn = null
        })
    }
}
export { Tareas }