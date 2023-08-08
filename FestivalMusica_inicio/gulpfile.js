const { src, dest } = require("gulp");
const sass = require("sass");

function css( done ) {

    src('src/scss/app.scss')           //Identificr el archivo 
        .pipe( sass() )                //Compilarlo
        .pibe(dest('build/css'))       //Almacenarla en el disco duro

    done();//Callback que avisa a gulp cuando llegamos al final
}

exports.css = css;