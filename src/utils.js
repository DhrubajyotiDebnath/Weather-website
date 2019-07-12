const request = require('request')

const geolocation = (place,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiZGhydWJhMTIzMjAwMiIsImEiOiJjanhxY2ZuNjMwN3d3M2NyM3Q4N2pnanFiIn0.rMEUHML9QXZFeB2GRdl1Lw&limit=1'
    
    //console.log(url2)
    
    request({url,json:true},(error,response)=>{
        if (error){
            callback("Problem in getting response from api",undefined)
        } else if ((response.body.message == "Not Found") || (response.body.features.length === 0)){
            callback("Unable to trace location",undefined)
        }else {
                      
            const data = {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            place: response.body.features[0].place_name
            }
    
            //console.log(data)
            callback(undefined,data)
        }
    
        })
    
    }

const forecast = (latitide,longitude,callback) => {
        const url = 'https://api.darksky.net/forecast/a3ccc4e4c09945deaba6e042e5ed1b53/'+ latitide +','+ longitude +'?lang=en'
           
        //console.log(url1)
        request({url,json:true},(error,response) =>
           { if (error){
            callback("Problem getting the data from api",undefined)
            } else if (response.body.error) {
                callback("Could not find the location",undefined)
            } else    {

                const {temperatureHigh:MaxTemp,temperatureLow:MinTemp} = response.body.daily.data[0]
                const {summary,temperature,precipProbability} = response.body.currently

                const data = { MaxTemp,
                        MinTemp,
                        summary,
                        CurrentTemp: temperature+' Degree Celsius',
                        Rain: precipProbability+ '%' 
               }
               callback(undefined,data)
               //console.log(response.body.currently)
            }
        }
        )
        
}

    module.exports = {geoloc: geolocation,forecast:forecast}