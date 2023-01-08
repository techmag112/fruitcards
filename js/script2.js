const comparationColor = (a, b) => {
    return a + b;
};

const sortAPI = {
    quickSort(comparation) {
        //return comparation(4, 5);
        let c = 0; 
        comparationColor(4, 5);
        for (let i = 0; i < 2; i++) {
            return this.quickSort(comparation);
        }
    },

    startSort(comparation) {
        sort(comparation);
    }
};

//const sortKind = 'quickSort';
//const sort = sortAPI[sortKind];
//console.log(sortAPI.startSort(comparationColor));

console.log(sortAPI.quickSort(comparationColor));