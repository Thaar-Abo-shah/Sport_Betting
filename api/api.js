const axios = require('axios')


const apiKey = 'b0806ec4d2d6f0902ab99a747e9a8b90';
oldDate = new Date()
day1 = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + 2);

const date = d => d.toISOString().slice(0, 10);

const getStatus = async() => {
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/status',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    };
    const response = await axios(config)
        .then(function(response) {
            console.log((response.data['response']['subscription']))
            global.status = (response.data)
            return JSON.stringify(response.data);
        })
        .catch(function(error) {
            return error;
        });


}




const getLive = async() => {
    var options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        params: { live: 'all' },
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    };

    axios.request(options).then(function(response) {
            console.log((response.data))
            global.Live = (response.data)
            return response.data;
        })
        .catch(function(error) {
            return error;
        });
}

/// 1 per day
const getFixture = async() => {



    var options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        params: { date: date(day1) },
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey
        }
    };

    axios.request(options).then(function(response) {
            //console.log(JSON.stringify(response.data))
            global.Odds = getTopChamp(response.data)
            console.log(Odds)
            return global.Odds;
        })
        .catch(function(error) {
            return error;
        });

}

const removeDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
    }, []);
};
const getTopChamp = (data) => {
    var top = [];
    data['response'].forEach(d => {


        if (d['fixture']['status']['long'] == 'Not Started') {

            if (d['league']['flag'] == 'null') {
                top.push({ id: d['league']['id'], flag: d['league']['logo'], name: d['league']['name'] })
            } else {
                top.push({ id: d['league']['id'], flag: d['league']['flag'], name: d['league']['name'] })
            }

        }

    });

    const unique = removeDuplicates(top, 'id')
    return unique;
}

// /// 1 per day
// const getSeasons=async()=>{
//   var options = {
//     method: 'GET',
//     url: 'https://v3.football.api-sports.io/leagues/seasons', 
//     headers: {
//       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
//       'x-rapidapi-key': apiKey
//     }
//   };

//   axios.request(options).then(function (response) {
//     console.log((response.data))
//     global.Seasons=(response.data)
//     return response.data;
//    })
//    .catch(function (error) {
//      return error;
//    });
// }  




// /// 1 call per hour.
// const getLeagues=async()=>{
//   var options = {
//     method: 'GET',
//     url: 'https://v3.football.api-sports.io/leagues',
//     params:{season:2022} ,
//     headers: {
//       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
//       'x-rapidapi-key': apiKey
//     }
//   };

//   axios.request(options).then(function (response) {
//     console.log(JSON.stringify(response.data))
//     global.Seasons=(response.data)
//     return response.data;
//    })
//    .catch(function (error) {
//      return error;
//    });
// }  







/// 1 per day
const getMap = async() => {
    var options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/odds/mapping',
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    };

    axios.request(options).then(function(response) {
            console.log(JSON.stringify(response.data))
            global.Mapp = (response.data['response'])



        })
        .catch(function(error) {
            console.log(error)
            return error;
        });
}



module.exports = {
    getStatus,
    getLive,
    getFixture,
    // getSeasons,
    getMap
    // getLeagues
}





// const axios = require('axios')
// const { json } = require('body-parser')



// // An api key is emailed to you when you sign up to a plan
// // Get a free API key at https://api.the-odds-api.com/
// // const apiKey= 'a036736e3602c563c94f577f4d5feb5b'


// // const sportKey = 'upcoming' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

// // const regions = 'eu,us,uk,au' // uk | us | eu | au. Multiple can be specified if comma delimited

// // const markets = 'spreads,h2h,totals' // h2h | spreads | totals. Multiple can be specified if comma delimited

// // const oddsFormat = 'american' // decimal | american

// // const dateFormat = 'iso' // iso | unix








// const getData=async()=>{
//     //  let data={test:'test'}
//     //  console.log(data)
//     const response =await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
//         params: {
//             apiKey,
//             regions,
//             markets,
//             oddsFormat,
//             dateFormat,
//         },

//     })

//     console.log('Remaining requests',response.headers['x-requests-remaining'])
//     console.log('Used requests',response.headers['x-requests-used'])
//     // console.log(response.data[0]['id'])
//      return response.data


// }  






// const getSports=async()=>{
//     //  let data={test:'test'}
//     //  console.log(data)
//     const response =await axios.get('https://api.the-odds-api.com/v4/sports', {
//         params: {
//             apiKey
//         }
//     })
//     .then(response => {
//         return response.data
//     })
//     .catch(error => {
//         console.log('Error status', error.response.status)
//         console.log(error.response.data)
//         return error.response.status
//     })



// }