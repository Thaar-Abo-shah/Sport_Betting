const express = require('express')
const { status } = require('express/lib/response');
const axios = require('axios')
const app = express();

const server = require('http').createServer(app)
const io = require('socket.io')(server)


const api = require("./api/api");
const req = require('express/lib/request');
const res = require('express/lib/response');


app.use(express.static('public'));


app.set('views', './views')
app.use(express.static('views'))


app.get('/', (req, res) => {
    return res.render('index.html')
});

app.get('/live-betting.html', (req, res) => {
    return res.render('live-betting.html')
});

app.get('/prematch.html', (req, res) => {
    return res.render('prematch.html')
});

app.get('/1008015.html', (req, res) => {
    return res.render('1008015.html')
})


global.Odds = [];


api.getFixture();



<<
<< << < HEAD
io.on('connection', socket => { ===
            === =

            io.on('connection', socket => { >>>
                >>> > c55a3c46339286eebc01289930c075e7c343bc41
                //    socket.on('message',data=>{
                //        console.log(data)
                //    })
                //    socket.emit('test',{name:'test'})
                    <<
                    << << < HEAD

                socket.emit('msg2', global.Odds)

                // console.log(resp.data)
                //   socket.on('client-message',(msg)=>{

                //       msg2= a;

                //       socket.emit('server-message',(msg2))

                //   })

                ===
                === =

                socket.emit('TopChamp', global.Odds)

                // console.log(resp.data)
                //   socket.on('client-message',(msg)=>{

                //       msg2= a;

                //       socket.emit('server-message',(msg2))

                //   })

                >>>
                >>> > c55a3c46339286eebc01289930c075e7c343bc41
                // v1.get('/',api.getData)


            })



            server.listen(8080)