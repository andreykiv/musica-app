const {listarTodasCanciones, borrarCancion, leerCancion, crearCancion, ordenarCanciones, editarArtista}= require('./canciones.js');
const yargs = require('yargs')

yargs.command({
    command: 'read',
    describe: 'leer cancion',
    builder: {
        titulo: {
            describe: 'txt',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        leerCancion(argv.titulo)
    }
})

yargs.command({
    command: 'create',
    describe: 'crear cancion',
    builder: {
        titulo: {
            describe: 'titulo cancion',
            demandOption: true,
            type: 'string'
        },
        artista: {
            describe: 'artista',
            demandOption: true,
            type: 'string'
        },
        anyo: {
            describe: 'anyo',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        crearCancion(argv.titulo, argv.artista, argv.anyo)
    }
})

yargs.command({
    command: 'delete',
    describe: 'borrar cancion',
    builder: {
        titulo: {
            describe: 'txt',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        borrarCancion(argv.titulo)
    }
})

yargs.command({
    command: 'list',
    describe: 'listar canciones',
    builder: {
    },
    handler() {
        listarTodasCanciones()
    }
})

yargs.command({
    command: 'sort',
    describe: 'ordenar canciones',
    builder: {
        criterio: {
            describe: 'artista o anyo',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        ordenarCanciones(argv.criterio)
    }
})

yargs.command({
    command: 'edit',
    describe: 'editar nombre del artista',
    builder: {
        titulo: {
            describe: 'titulo de la cancion',
            demandOption: true,
            type: 'string'
        },
        nuevoArtista: {
            describe: 'nuevo nombre del artista',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        editarArtista(argv.titulo, argv.nuevoArtista)
    }
})

yargs.parse()