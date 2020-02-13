class Palo {
    constructor(figura, color, nombre) {
        this.figura = figura;
        this.color = color;
        this.nombre = nombre;
    }
}


var palos = [
     
    new Palo(' cora', 'Rojo', 'Corazones'),
    new Palo('treb', 'Negro', 'Treboles'),
    new Palo('brillo', 'Rojo', 'Diamantes'),
    new Palo('cori', 'Negro', 'espadaz')
];

var cartas = ['As', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Jack', 'Queen', 'King'];

var Valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class Carta {
    constructor(palo, valor = [], texto) {
        this.palo = palo;
        this.valor = valor;
        this.texto = texto;
    }
}

class Barajas1 {
    baraja = [];

    orden = [];
    
    comodin;

    mezclar() {
        while (this.orden.length < 51) {
            let valor = Math.floor(Math.random() * (51));
            this.comodin = this.orden.find(element => element == valor)
            let condicion = (this.comodin == undefined) ? this.orden.push(valor) : valor;
        }
        for (let n = 0; n < this.baraja.length - 1; n++) {
            this.comodin = this.baraja[this.orden[n]]
            this.baraja[this.orden[n]] = this.baraja[n]
            this.baraja[n] = this.comodin;
        }
        return this.baraja
    }
    crearMazo() {

        for (let p = 0; p < palos.length; p++) {
            for (let q = 0; q < cartas.length; q++) {
                if (q == 0) {
                    this.baraja.push(new carta(palos[p], [1, 11], cartas[q]))
                } else if (q > 9) {
                    this.baraja.push(new carta(palos[p], Valores[9], cartas[q]))
                } else {
                    this.baraja.push(new carta(palos[p], Valores[q], cartas[q]))
                }

            }
        }
    }
}
class juego extends Barajas1 {
    cont = 0;
    acumulador = [];
    pedir() {

        this.acumulador.push(this.baraja[this.cont].valor);
        this.cont++;
        let comp = this.acumulador.find(element => typeof(element) === 'object')
        this.validar()
        return this.acumulador
    }
    validar() {
        let valo = this.acumulador.reduce(
            function(valorAnterior, valorActual, indice, vector) {
                if (typeof(valorAnterior) == 'object') {
                    if (valorAnterior > 10) {
                        return valorAnterior[0] + valorActual;
                    } else {
                        return valorAnterior[1] + valorActual;
                    }
                } else {
                    return valorAnterior + valorActual;
                }

            })

        if (valo == 21) {

            console.log('felicitaciones has  ganada un premio')

        } else if (valo < 21) {



            console.log('puedes seguiR piendo y pidiendo')

        } else if (valo > 21) {


            console.log('lo sentimos tienes mala suerte  PERDISTE ')
        }

        console.log(` suma total ${valo}`)
    }
}