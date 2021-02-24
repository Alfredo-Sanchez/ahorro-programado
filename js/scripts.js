
import { calculoIntereses } from './calculo-intereses.js'
import { formatearNumeros } from './formatear-numeros.js'

$(function(){
    $('#monto').validCampoFranz('0123456789');
});


const form = document.getElementById('form')
let montoNumber = document.getElementById('monto')

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



if (screen.width > 500){
    monto.setAttribute('type', 'text') // 
    monto.setAttribute('min', '50000') // para poder formatear el input cuando exista el evento keypress
    monto.setAttribute('max', '5000000') // 
    monto.setAttribute('title', 'El ahorro minimo es de 50.000 y el maximo de 5.000.000') // para poder formatear el input cuando exista el evento keypress
    montoNumber.addEventListener('keyup', (e) =>{
        formatearNumeros(e)
    })
}

let montoGlobal = []
let ahorroGlobal = []


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    sessionStorage.setItem('montoAhorro', form.monto.value.replaceAll('.',''))
    sessionStorage.setItem('tipoSimulacion', form.tipoSimulacion.value)

    const monto = parseInt(sessionStorage.getItem('montoAhorro'))
    const tipoSimulacion = sessionStorage.getItem('tipoSimulacion')

    if (monto >= 50000){
        montoGlobal = form.monto.value
         const resultado =   calculoIntereses(monto);
         ahorroGlobal = resultado;
    
        renderCharts();  
        form.reset();
    }
})


function totalCaseChart(ctx){
        const chart =  new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["12 meses",'24 meses', '36 meses ', '48 meses','60 meses'],
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
