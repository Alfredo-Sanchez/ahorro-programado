
const form = document.getElementById('form')

let montoGlobal = []
let ahorroGlobal = []


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    sessionStorage.setItem('montoAhorro', form.monto.value)
    sessionStorage.setItem('tipoSimulacion', form.tipoSimulacion.value)

    const monto = parseInt(sessionStorage.getItem('montoAhorro'))
    const tipoSimulacion = sessionStorage.getItem('tipoSimulacion')

    const meses = [12, 18, 24, 36, 48, 60]
    const dias = [365, 540,  730, 1095, 1460, 1825 ]
    const tasas = [4, 5, 6, 6.5, 7, 7.5]

    let montoAhorro = [];
    let montoTotal = [];

    if (tipoSimulacion !== '1' && monto >= 50000){
        montoGlobal = monto
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
                fontSize: 30,
                padding: 30,
                fontColor: '#000'
            },
            layout:{
                 padding:{
                    //  right: 100,
                    //  left: 100
                    bottom: 50
                 }
             }
        }
        
    });
    // setTimeout(() => {
    //     chart.destroy();
    // }, 3000);
 }

 function renderCharts(){
     const ctx = document.querySelector('#chart').getContext('2d')
     totalCaseChart(ctx);
 }
