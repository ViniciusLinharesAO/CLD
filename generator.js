module.exports = {
    gerar (n) {
        let alt = 0;
        let A = 0;
        let B = 1;
        let gerado = [];
        for (let i = 0; i < n; i++) {
            gerado.unshift([]);
            alt = 0;
            A = 0;
            B = 1;
            for (let j = 0; j < 2**n; j++) {
                if(alt == 2**i) {
                    let save = A;
                    A = B;
                    B = save;
                    alt = 1;  
                } else {
                    alt++;
                };
                gerado[0].push(A);
            };
        };
        return gerado;
    }
}