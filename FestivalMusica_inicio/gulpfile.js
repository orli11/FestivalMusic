const { src, dest, watch, parallel } = require("gulp");

//Dependencias de CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//Dependencias de imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');

function css( done ) {

    src('src/scss/**/*.scss') //Identificr el archivo 
        .pipe( plumber() )    //No corta la ejecucion del programa cuando hay algun error    
        .pipe( sass() )                //Compilarlo
        .pipe(dest('build/css'))       //Almacenarla en el disco duro

    done();//Callback que avisa a gulp cuando llegamos al final
}
function imagenes( done ) {
    const opciones = {
        optimizacionLevel: 3
    }
    src('src/img/**/*.{png,jpg}') 
    .pipe( cache(imagemin(opciones)))
    .pipe( dest('build/img'))
    done();
}

function versionAvif ( done ) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}') //Para buscar dos formatos
    .pipe( avif(opciones) )
    .pipe( dest('build/img'))

    done();
}
function versionWebp ( done ) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png, jpg}') //Para buscar dos formatos
    .pipe( webp(opciones) )
    .pipe( dest('build/img'))

    done();
}

function dev ( done ) {
    watch('src/scss/**/*.scss', css)
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
