
import { calculoIntereses } from './calculo-intereses.js'
import { formatearNumeros } from './formatear-numeros.js'

$(function(){
    $('#monto').validCampoFranz('0123456789');
});


const form = document.getElementById('form')
let montoNumber = document.getElementById('monto')
const notification = document.getElementById('notification')
const modaCloseButton = document.getElementById('modal-close-button')
const notificationText = document.getElementById('notification-text')

montoNumber.addEventListener('keyup', (e) =>{
    formatearNumeros(e)
})

if(screen.width < 500){
    montoNumber.setAttribute('type', 'number')
}

let montoGlobal = []
let ahorroGlobal = []


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    sessionStorage.setItem('montoAhorro', form.monto.value.replaceAll('.',''))
    sessionStorage.setItem('tipoSimulacion', form.tipoSimulacion.value)

    const monto = parseInt(sessionStorage.getItem('montoAhorro'))
    const tipoSimulacion = sessionStorage.getItem('tipoSimulacion')

    if (monto >= 50000 && monto <= 5000000){
        montoGlobal = form.monto.value
         const resultado =   calculoIntereses(monto);
         ahorroGlobal = resultado;
    
        renderCharts();  
        form.reset();
    }else{
        if(monto < 50000){
            notificationText.innerHTML = `<strong>Monto mínimo aceptado:</strong> <br> es de 50.000 Gs.`
            notification.classList.add('notification--show')
            modalClose()
        }else if(monto > 5000000){
           notificationText.innerHTML = `<strong>Monto máximo aceptado:</strong> <br> es de 5.000.000 Gs.`
            notification.classList.add('notification--show')
            modalClose()
        }
    }
})

modaCloseButton.addEventListener('click', (e)=>{
    notification.classList.remove('notification--show')
}) 

function modalClose (){
    if(notification.classList.contains('notification--show')){
        setTimeout(() => {
            notification.classList.remove('notification--show')
        }, 5000);
    }
}


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
                }
            
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales:{
             xAxes: [{
                 gridLines:{
                     display: false
                 }
             }],
             yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: (ahorroGlobal * 60)/10,
            
                    // Return an empty string to draw the tick line but hide the tick label
                    // Return `null` or `undefined` to hide the tick line entirely
                    userCallback: function(value, index, values) {
                        // Convert the number to a string and splite the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
            
                        // Convert the array to a string and format the output
                        value = value.join('.');
                        return 'Gs ' + value;
                    }
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
            tooltips: {
                callbacks: {
                  // this callback is used to create the tooltip label
                  label: function(tooltipItem, data) {
                    // get the data label and data value to display
                    // convert the data value to local string so it uses a comma seperated number
                    var dataLabel = data.labels[tooltipItem.index];
                    var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();
          
                    // make this isn't a multi-line label (e.g. [["label 1 - line 1, "line 2, ], [etc...]])
                    if (Chart.helpers.isArray(dataLabel)) {
                      // show value on first line of multiline label
                      // need to clone because we are changing the value
                      dataLabel = dataLabel.slice();
                      dataLabel[0] += value;
                    } else {
                      dataLabel += value;
                    }
          
                    // return the text to display on the tooltip
                    return dataLabel;
                  }
                }
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
