function log(text) {console.log(text)};
const arquivo = require('./lerEscreverArquivo');
const generator = require('./generator');
const portas = require('./gates');

//constantes
const info = arquivo.ler();

const n_entr = info[0][1];
const entr_names = [];
for (let i = 0; i < n_entr; i++) entr_names.push(info[0][i+2]);

const n_said = info[1][1];
const said_names = [];
for (let i = 0; i < n_said; i++) said_names.push(info[1][i+2]);

const n_gate = info[2][1];
const gate_names = [];
for (let i = 0; i < n_gate; i++) gate_names.push(info[2][i+2]);
const gates = [];
for (let i = 0; i < n_gate; i++) gates.push(info[i+3]);

function resolver(gate, in1, in2) {return portas[gate](in1, in2)};

let gerado = generator.gerar(n_entr);

resolver(gates[0][1],gerado[2][7],gerado[0][0]);

arquivo.escrever(gerado.join('\n'));
