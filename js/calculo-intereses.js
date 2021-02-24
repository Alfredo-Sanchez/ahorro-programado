
 function calculoIntereses(monto){
  const dias = 30
  const tasas = [ 5, 6, 6.5, 7, 8]
  
  let montoAcumulado = monto
  let interesAcumulado = 0
  let arrayIntereses = []
  let arrayCiclos = []
  let index = 0
  let contador = 0
  let montoAhorradoPorTramos = []
  
  for(let i = 1; i <= 60; i++){
    let interesMensual = montoAcumulado*dias*tasas[index]/36500;
    arrayIntereses.push(Math.round(interesMensual))
    interesAcumulado += Math.round(interesMensual)
//     console.log('Intereses Acumulado '+interesAcumulado)
    
    switch(i){
      case 12:
        if(contador === 0){
            // console.log('El monto acumulado es: '+ montoAcumulado)
            arrayCiclos.push(interesAcumulado);
            // console.log(arrayCiclos);
            montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
            // console.log(montoAhorradoPorTramos)
            index += 1
            contador += 1
            i = 0
             arrayIntereses = []
             montoAcumulado = 0
             interesAcumulado = 0
          }   
         break;
        
      // case 18:
      //   if(contador === 1){
      //     arrayCiclos.push(interesAcumulado)
      //     montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
      //     index += 1
      //     contador += 1
      //     i = 0
      //     arrayIntereses = []
      //     montoAcumulado = 0
      //     interesAcumulado = 0
      //    }
      //   break;
     case 24:
        if(contador === 1){
          arrayCiclos.push(interesAcumulado)
           montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
          index += 1
          contador += 1
          i = 0
          montoAcumulado = 0
          interesAcumulado = 0
         }
        break;
        
     case 36:
        if(contador === 2){
          arrayCiclos.push(interesAcumulado)
          montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
          index += 1
          contador += 1
          i = 0
          montoAcumulado = 0
          interesAcumulado = 0
         }
        break;
        
    case 48:
        if(contador === 3){
          arrayCiclos.push(interesAcumulado)
           montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
          index += 1
          contador += 1
          i = 0
          montoAcumulado = 0
          interesAcumulado = 0
         }
        break;
        
    case 60:
        if(contador === 4){
          arrayCiclos.push(interesAcumulado)
          montoAhorradoPorTramos.push(montoAcumulado + arrayCiclos[arrayCiclos.length -1])
          contador += 1
         }
        break;
        
   }//fin switch
         montoAcumulado += monto
  }
       
  return montoAhorradoPorTramos
}

export  { calculoIntereses };