const axios = require('axios')


const apiKey='b0806ec4d2d6f0902ab99a747e9a8b90';
oldDate=new Date()
day1=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate());
day2=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+1);

const date = d => d.toISOString().slice(0, 10);

const getStatus=async()=>{
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/status',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      };
        const response =await axios(config)
        .then(function (response) {
            console.log((response.data['response']['subscription']))
            global.status=(response.data)
         return JSON.stringify(response.data);
        })
        .catch(function (error) {
          return error;
        });
            
    
    }  
 



const getLive=async()=>{
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/fixtures',
    params: {live: 'all'},
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  };
  
  axios.request(options).then(function (response) {
    console.log((response.data))
    global.Live=(response.data)
    return response.data;
   })
   .catch(function (error) {
     return error;
   });
}  

/// 1 per day
const getOdds1=async()=>{


  
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/odds',
    params: {date:date(day2),page:1},
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': apiKey
    }
  };
  
  axios.request(options).then(function (response) {
  console.log((response.data['paging']['current']))
  
    global.Odds1=getTopChamp(response.data)
    //console.log(Odds)
    return global.Odds1;
   })
   .catch(function (error) {
     console.log(error)
     return error;
   });
 

   
    

}  


const getOdds2=async()=>{
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/odds',
    params: {date:date(day2),page:2},
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': apiKey
    }
  };
  
  axios.request(options).then(function (response) {
  console.log((response.data['paging']['current']))
  
    global.Odds2=getTopChamp(response.data)
    //console.log(Odds)
    return global.Odds2;
   })
   .catch(function (error) {
     console.log(error)
     return error;
   });
}  

const getFixtures=async()=>{
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/fixtures',
    params: {date:date(day2)},
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': apiKey
    }
  };
  
  axios.request(options).then(function (response) {
  // console.log((response.data['paging']['current']))
  
    global.fextures=getTopChamp(response.data)
    //console.log(Odds)
    response.data['response'].forEach(r=>{
      if(r['fixture']['id']==751964)
      {
        console.log(JSON.stringify(r['teams']))
      }
    })
    return global.fextures;
   })
   .catch(function (error) {
     console.log(error)
     return error;
   });
}  

const removeDuplicates = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter(i => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

const getTopChamp=(data)=>{
  var top=[];
  data['response'].forEach(d => {
   console.log(d['league']['id'])
    // if(d['league']['id']==747){
    //   console.log(JSON.stringify(d))
    // }
    //if(d['fixture']['status']['long']=='Not Started'){
       
        if(d['league']['flag']=='null'){
          top.push({id:d['league']['id'],flag:d['league']['logo'],name:d['league']['name']})
        } else {
          top.push({id:d['league']['id'],flag:d['league']['flag'],name:d['league']['name']})
        }
     
   // }
    
  });

  const unique =removeDuplicates(top, 'id')
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
const getMap=async()=>{
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/odds/mapping', 
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(JSON.stringify(response.data))
    global.Mapp=(response.data['response'])   


    
   })
   .catch(function (error) {
    console.log(error)
     return error;
   });
}  

  
  
 module.exports={
    getStatus, 
    getLive,
    getOdds1,
    getOdds2,

    getFixtures,
    getMap
    // getLeagues
} 



//  const apiKey= 'e52568ac45ac1c95f5dc65f91bfb3232'
 

// const sportKey = 'basketball_nba' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

// const regions = 'eu,us,uk,au' // uk | us | eu | au. Multiple can be specified if comma delimited

// const markets = 'spreads,h2h,totals' // h2h | spreads | totals. Multiple can be specified if comma delimited

// const oddsFormat = 'decimal' // decimal | american

// const dateFormat = 'iso' // iso | unix
 
 
 
 


 
  
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
        
//     }).then(response => {
//       console.log('Remaining requests',response.headers['x-requests-remaining'])
//     console.log('Used requests',response.headers['x-requests-used'])
//     console.log(JSON.stringify(response.data))
//               return response.data
//           })
//           .catch(error => {
//               console.log('Error status', error.response.status)
//               console.log(error.response.data)
//               return error.response.status
//           })
 

// }  



//  module.exports={
//   getData
// } 