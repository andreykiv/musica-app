const fs = require('fs')
const chalk = require('chalk')

const leerCanciones = (fichero) => {
    //readFileSync forma asyncrona
    try {
        const buffer = fs.readFileSync(fichero)
        const datosString = buffer.toString()
        return JSON.parse(datosString)
    } catch (error){
        console.log(error);
        return []
    }
}

const escribirCancion = (fichero, cancion) => {
    try{
        fs.writeFileSync(fichero, JSON.stringify(cancion));
    } catch (err){
        return console.error(err.message);
    }
}

//crear cancion
const crearCancion =  (titulo, artista, anyo) => {
    //convertimos json a js:
    const canciones = leerCanciones('canciones.json')
    // buscar si existe la nota
    const indice = canciones.findIndex(
        (cancion) => cancion.titulo == titulo
    )
    if (indice === -1) {
        console.log('Cancion creada')
        canciones.push({ titulo:titulo, artista:artista, anyo:anyo}) // cuerpo:cuerpo
        escribirCancion('canciones.json', canciones)
    } else {
        console.log('Canción ya existente')
        return canciones.length
    }
}


//leer cancion (a partir del titulo)
const leerCancion = (titulo) => {
    const canciones = leerCanciones('canciones.json')
    const cancionEncontrada = canciones.find(function (cancion) {
        return cancion.titulo.toLowerCase().includes(titulo.toLowerCase()) || cancion.titulo.toLowerCase().includes(titulo.toLowerCase())
    })
    if(cancionEncontrada){
        debugger
        console.log('Cancion encontrada')
        console.log(cancionEncontrada) 
    } else {
        console.log('No se encuentra la cancion')
    }
}

// editar artista (a partir del titulo)
const editarArtista = function(titulo, nuevoArtista){
    const canciones = leerCanciones('canciones.json')
    const indice = canciones.findIndex((cancion) => cancion.titulo === titulo)
    if (indice === -1) {
        console.log('Cancion no encontrada')
        return {}
    } else {
        console.log("Nombre del artista cambiado");
        canciones[indice].artista = nuevoArtista
        escribirCancion('canciones.json', canciones)
    }
}

// editarArtista("Thriller", "TESTARTISTA");

const borrarCancion = (titulo) => {
    let canciones = leerCanciones('canciones.json')
    let cancionesFiltradas = canciones.filter((cancion) => {
        return cancion.titulo !== titulo
    })
    console.log(cancionesFiltradas);
    if (canciones.length > cancionesFiltradas.length) {
        console.log('cancion borrada');
        escribirCancion('canciones.json', cancionesFiltradas)
    } else {
        console.log('Canción no se puede borrar porque no existe')
    }
}

//listar todas canciones
const listarTodasCanciones = function(){
    const buffer = fs.readFileSync('canciones.json')
    const datosString = buffer.toString()
    console.log(JSON.parse(datosString));
}




//ordenar canciones segun artista o año
const ordenarCanciones =(opcion) => {
    const canciones = leerCanciones('canciones.json')
    canciones.sort(function (cancionA, cancionB) {
        if (cancionA[opcion].toLowerCase() < cancionB[opcion].toLowerCase()) {
            return -1
        } else if (cancionA[opcion].toLowerCase() > cancionB[opcion].toLowerCase()) {
            return 1
        } else {
            return 0
        }
    })
    escribirCancion('canciones.json', canciones)
}

module.exports = {
    listarTodasCanciones,
    borrarCancion,
    leerCancion,
    crearCancion,
    ordenarCanciones,
    editarArtista
}