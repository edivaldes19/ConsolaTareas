import colors from 'colors';
import inquirer from 'inquirer'
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2'.blue} Listar todas las tareas`
            },
            {
                value: '3',
                name: `${'3'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.blue} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.blue} Borrar una tarea`
            },
            {
                value: '7',
                name: `${'7'.blue} SALIR`
            }
        ]
    }
]
const inquirerMenu = async () => {
    console.clear()
    console.log('=============================='.blue)
    console.log('Seleccione una opción'.blue)
    console.log('==============================\n'.blue)
    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Pulse ${'ENTER'.blue} para continuar...`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) return 'Ingrese un valor'
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}
const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${`${index + 1}.`.blue} ${tarea.desc}`
        }
    })
    choices.push({
        value: `${tareas.length + 1}`,
        name: `${`${tareas.length + 1}.`.blue} CANCELAR`
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id
}
const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}
const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${`${index + 1}.`.blue} ${tarea.desc}`,
            checked: tarea.completadoEn != null ? true : false
        }
    })
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar...',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta)
    return ids
}
export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList }