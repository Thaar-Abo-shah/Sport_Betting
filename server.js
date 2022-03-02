const express = require('express')
const axios = require('axios')
const app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server)


const apiKey = 'b7dd7acdb8bbc5fd3d7d2eb854eb3886'

const sportKey = 'basketball_nba'

const regions = 'us'

const markets = 'h2h'

const oddsFormat = 'decimal' // decimal | american

const dateFormat = 'iso' // iso | unix




app.use(express.static('public'));


app.set('views', './views')
app.use(express.static('views'))


app.get('/', (req, res) => {
    return res.render('index.html')
});

app.get('/live-betting.html', (req, res) => {
    return res.render('live-betting.html')
});


// io.on('connection', socket => {
//     //    socket.on('message',data=>{
//     //        console.log(data)
//     //    })
//     //    socket.emit('test',{name:'test'})

//     socket.on('client-message', ({ msg }) => {

//         msg2 = "hello " + msg;


//         axios.get('https://api.the-odds-api.com/v4/sports', {
//                 params: {
//                     apiKey
//                 }
//             })
//             .then(response => {
//                 socket.emit('server-message', (response.data))

//             })
//             .catch(error => {
//                 console.log('Error status', error.response.status)
//                 console.log(error.response.data)
//             })




//     })

// })


server.listen(8080)