

$(function(){
    //Para escribir solo numeros    
    $('#monto').validCampoFranz('0123456789');
});


const form = document.getElementById('form')
const montoNumber = document.getElementById('monto')

// function soloNumeros(e){
//     let key = e.keyCode || e.wich;
//     console.log(key)
//     let tecla = String.fromCharCode(key).toLowerCase();
//     console.log(tecla)
//     let numeros = "áéíóúabcdefghijklmnñopqrstuvwxyz";
//     let especiales = [8, 37, 39, 46];
 
//     let tecla_especial = false
//      for(var i in especiales) {
//          if(key == especiales[i]) {
//              tecla_especial = true;
//              break;
//          }
//      }
 
//      if(numeros.indexOf(tecla) == -1 && !tecla_especial){
//          return false;
//      }
// }

// montoNumber.addEventListener('keypress', (e) =>{
//     soloNumeros(e)
// })

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

montoNumber.addEventListener('keyup', (e) =>{
    formatearNumeros(e)
})

let montoGlobal = []
let ahorroGlobal = []


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    sessionStorage.setItem('montoAhorro', form.monto.value.replaceAll('.',''))
    sessionStorage.setItem('tipoSimulacion', form.tipoSimulacion.value)

    const monto = parseInt(sessionStorage.getItem('montoAhorro'))
    const tipoSimulacion = sessionStorage.getItem('tipoSimulacion')

    const meses = [12, 18, 24, 36, 48, 60]
    const dias = [365, 540,  730, 1095, 1460, 1825 ]
    const tasas = [4, 5, 6, 6.5, 7, 7.5]

    let montoAhorro = [];
    let montoTotal = [];

    if (tipoSimulacion !== '1' && monto >= 50000){
        montoGlobal = form.monto.value
        if(tipoSimulacion === "mensual"){
    
           let intereses = meses.map( ( mes, index ) => {
               return parseInt(monto*mes*dias[index]*tasas[index]/36500)
           })
    
           montoAhorro = meses.map( mes => mes*monto)
    
           montoTotal = meses.map( (mes, index) => mes*monto + intereses[index])
    
           ahorroGlobal = montoTotal
    
        }else if (tipoSimulacion === "total"){// sera cuando elijan el monto total que desean tener a los 60 meses
    
        }
    
        renderCharts();  
        montoAhorro = [];
        montoTotal = [];
        console.log(montoAhorro, montoTotal)
        form.reset();// resetea los campos del formulario luego de cargar el renderChart()
    }
})


function totalCaseChart(ctx){
        const chart =  new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["12 meses", '18 meses','24 meses', '36 meses ', '48 meses','60 meses'],
            datasets: [
                {
                    label: 'Ahorros',
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgb(75, 192, 192)",
                    borderWidth: 1,
                    data: ahorroGlobal
                },
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales:{
             xAxes: [{
                 gridLines:{
                     display: false
                 }
             }]
            },
            title: {
                display: true,
                text: `Si ahorrás Gs. ${montoGlobal} por mes, obtendrás:`,
                fontSize: 20,
                padding: 30,
                fontColor: '#000'
            },
            layout:{
                 padding:{
                    right: 10,
                    left: 10,
                    bottom: 50
                 }
             }
        }
        
    });

 }

 function renderCharts(){
         
    document.getElementById('chart').remove();
    let canvas = document.createElement("canvas")
        canvas.setAttribute("id", 'chart')
    document.getElementById('chartContent').appendChild(canvas)
    
     const ctx = document.querySelector('#chart').getContext('2d')
     totalCaseChart(ctx);
 }
