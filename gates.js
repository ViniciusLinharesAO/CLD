module.exports = { 
    not (x) {return !x ? 1:0},
     and (x,y) {return x&y},
     or (x,y) {return x|y},
     xor (x,y) {return x^y},
     nand (x,y) {return this.not(this.and(x,y))},
     nor (x,y) {return this.not(this.and(x,y))},
     nxor (x,y) {return this.not(this.and(x,y))},
}
