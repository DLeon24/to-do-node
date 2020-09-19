// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const colors = require('colors');
const toDo = require('./por-hacer/por-hacer');

let command = argv._[0];

switch (command) {
    case 'crear':
        let tarea = toDo.create(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let list = toDo.getList();
        for (let tarea of list) {
            console.log('======TODO====='.green);
            console.log(tarea.description);
            console.log('Estado: ', tarea.complete);
            console.log('==============='.green);

        }
        break;
    case 'actualizar':
        let status = toDo.update(argv.descripcion, argv.completado);
        console.log(status);
        break;
    case 'eliminar':
        let remove = toDo.remove(argv.descripcion);
        console.log(remove);
        break;
    default:
        console.log('Comando invalido');
        break;
}