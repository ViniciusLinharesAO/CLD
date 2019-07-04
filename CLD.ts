function log(text) {console.log(text); console.log('----------------------------------------')};
const arquivo = require('./lerEscreverArquivo');
const generator = require('./generator');
const portas = require('./gates');
function resolver(gate, in1, in2) {return portas[gate](in1, in2)};
function isNumber(n) {if(typeof n === "number") return true; else return false};
function identificar(data) {
    let retorno = [];
    for (let i = 0; i < data[2][1]; i++) {
        for (let j = 0; j < data[1][1]; j++) {
            if (data[i+3][2]==data[1][j+2]) {
                retorno.push(data[i+3]);
            }
        }
    }
    return retorno;
}

//constantes
let result = []
let data = arquivo.ler();
const n_entr = parseInt(data[0][1]);
const n_said = parseInt(data[1][1]);
const n_gate = parseInt(data[2][1]);
const n_linh = 2**n_entr;
const gerado = generator.gerar(n_entr);
for (let linh = 0; linh < n_linh; linh++) {
    let out = [];
    for (let said = 0; said < n_gate; said++){out.push(-1)}
    let allIn = [];
    for (let i = 0; i < n_entr; i++) allIn.push(data[0][i+2]);
    let gates = [];
    for (let i = 0; i < n_gate; i++) gates.push(data[i+3]);
    for (let gate = 0; gate < n_gate; gate++) {
        for (let entr = 0; entr < 2; entr++) {
            if (!isNumber(gates[gate][entr+3])){
                let index = allIn.indexOf(gates[gate][entr+3]);
                if(index != -1) {
                    gates[gate][entr+3] = gerado[index][linh];
                } else {
                    if(out[gates[gate][entr+3][1]-1] != -1) {
                        gates[gate][entr+3] = out[gates[gate][entr+3][1]-1];
                    }
                }
            }
            if (entr == 1 && isNumber(gates[gate][3]) && isNumber(gates[gate][4])) {
                gates[gate][2] = resolver(gates[gate][1],gates[gate][3],gates[gate][4]);
                out[gate] = gates[gate][2];
                
                let index = allIn.indexOf(gates[gate][entr+3]);
                if(index != -1) {
                    gates[gate][entr+3] = gerado[index][linh];
                }
                
            }
        }
    }
    log(data)
    log(out)
    out = [];
    log(out)
    data = arquivo.ler();
}

/*

[ [ 'n_entr', '3', 'Cin', 'A', 'B' ],
  [ 'n_said', '2', 'S', 'Cout' ],
  [ 'n_gate', '5', 'g1', 'g2', 'g3', 'g4', 'g5' ],
  [ 'g1', 'xor', 'y1', 'A', 'B' ],
  [ 'g2', 'xor', 'S', 'y1', 'Cin' ],
  [ 'g3', 'and', 'y3', 'y1', 'Cin' ],
  [ 'g4', 'and', 'y4', 'y1', 'Cin' ],
  [ 'g5', 'or', 'Cout', 'y3', 'y4' ] ]

  arquivo.escrever(gerado.join('\n'));
  for (let i = 0; i <= 100; i += 5) saida.splice(i, 0, '\n');

*/
