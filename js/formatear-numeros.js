function formatearNumeros(e){    
    let entrada = e.target.value.replaceAll('.', '');
        entrada = entrada.split('').reverse();
    let salida = []
    let aux = ''
    let paginador = Math.ceil(entrada.length / 3);

    for(let i = 0; i < paginador; i++){
        for(let j = 0; j < 3; j++){
            if(entrada[j + (i*3)] != undefined){
                aux += entrada[j + (i*3)];
            }
        }
        salida.push(aux);
        aux = '';

        e.target.value = salida.join('.').split('').reverse().join('');
    }    
}

export { formatearNumeros }