const { src, dest, watch, parallel } = require("gulp");

//JS
const terser = require('gulp-terser-js'); //mejora el js

//Dependencias de CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //Funcione en el navegador que elijas
const cssnano = require('cssnano'); //Comprime el codigo de CSS
const postcss = require('gulp-postcss'); //Hace algunas transformaciones por medio de los dos anteriores
const sourcemaps = require('gulp-sourcemaps');

//Dependencias de imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');

function css( done ) {

    src('src/scss/**/*.scss') //Identificr el archivo 
        .pipe( sourcemaps.init())
        .pipe( plumber() )    //No corta la ejecucion del programa cuando hay algun error    
        .pipe( sass() )                //Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.')) //Ubica el css que está comprimido
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
    .pipe( dest('build/img'));

    done();
}
function versionWebp ( done ) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}') //Para buscar dos formatos
    .pipe( webp(opciones) )
    .pipe( dest('build/img'));

    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
    .pipe(sourcemaps.init() )
    .pipe( terser()) //mejora el js
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
}

function dev ( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript)
    done();
}

exports.css = css
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif,javascript, dev);
