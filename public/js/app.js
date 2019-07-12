
//console.log("clinet side javascript loaded")


const weatherform = document.querySelector('form')

const msgone = document.querySelector('#msg-1')
const msgtwo = document.querySelector('#msg-2')

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()

    const search = document.querySelector('input')
    console.log(search.value)

    const url = '/weather?address='+search.value

    msgone.textContent =  "Loading..."
    msgtwo.textContent =  ''

fetch(url).then((response) =>
{
    response.json().then((data) => {
    if (data.error){
        msgone.textContent =  data.error
    } else
    {   if (weatherform.elements["tempunit"].value === 'F'){
        cTemp = data.forecast.CurrentTemp
        cUnit = ' Degree Fahrenheit'
    } else {
        cTemp = ((data.forecast.CurrentTemp - 32)*5)/9
        cTemp = cTemp.toPrecision(4)
        cUnit = ' Degree Celcius'
    }
        msgone.textContent = 'Forecast for    ' + data.location
        msgtwo.textContent = data.forecast.summary+ '. Current Temperature '+ cTemp + cUnit + '   with '+data.forecast.Rain+' chance of rain'
    }
    }
    )
})



//textvalue.textContent = 


})