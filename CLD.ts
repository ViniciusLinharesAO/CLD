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

let data = arquivo.ler();
let agr =[];
const n_entr = parseInt(data[0][1]);
const n_said = parseInt(data[1][1]);
const n_gate = parseInt(data[2][1]);
const n_linh = 2**n_entr;
let result = [];
for (let i = 0; i < n_said; i++) result.push('');
const gerado = generator.gerar(n_entr);
for (let linh = 0; linh < n_linh; linh++) {
    let out = [];
    for (let said = 0; said < n_gate; said++) out.push(-1);
    let allIn = [];
    for (let i = 0; i < n_entr; i++) allIn.push(data[0][i+2]);
    let allOut = [];
    for (let i = 0; i < n_said; i++) allOut.push(data[1][i+2]);
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
                let index = allOut.indexOf(gates[gate][2]);
                gates[gate][2] = resolver(gates[gate][1],gates[gate][3],gates[gate][4]);
                if(index != -1) {
                    result[index] = gates[gate][2];
                }
                out[gate] = gates[gate][2];
            }
        }
    }
    out = [];
    data = arquivo.ler();
    agr.push(...result);
    
}

let allIn = [];
for (let i = 0; i < n_entr; i++) allIn.push(data[0][i+2]);
let allOut = [];
for (let i = 0; i < n_said; i++) allOut.push(data[1][i+2]);

let tabela = 'Respectivamente\n';
tabela += 'entradas: ';
for (let i = 0; i < n_entr; i++) tabela += `${allIn[i]} `;
tabela += '\n'
tabela += 'saídas: ';
for (let j = 0; j < n_said; j++) tabela += `${allOut[j]} `;
tabela += '\n'
for (let linh = 0; linh < n_linh; linh++) {
    for (let i = 0; i < n_entr; i++) {
        tabela += `${gerado[i][linh]} `
    }
    tabela += '|| '
    for (let j = 0; j < n_said; j++) {
        tabela += `${agr[j+linh]} `
    }
    tabela += '\n'
}

arquivo.escrever(tabela);
