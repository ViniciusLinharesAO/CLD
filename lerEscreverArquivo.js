module.exports = {
  ler() {
    let data = require('fs').readFileSync('texto2.txt', 'utf8');
    data = data.split("\n");

    let count = 0;
    data = data.map((arr) => {
      if (arr[0] == '%') {
        count++;
        return 0;
      } else return arr.split(",");
    });

    for (let i = 0; i < count; i++) {
      let index = data
        .findIndex(position => position === 0);
      data.splice(index, 1);
      data = [...data];
    }
    return data;
  },
  escrever(texto) {
    require('fs').writeFile('./saida.txt', `${texto}`, { enconding: 'utf-8', flag: 'w' }, function (err) {
      if (err) throw err;
      console.log('Arquivo salvo!');
    });
  }
}