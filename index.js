const axios = require('axios');
var cors = require('cors')
const app = require('express')();
let port = process.env.PORT || 3000;

app.use(cors())

let results = [];
let resultsSoon = [];
/*
 Home Image = 01IMG
 Away Image = 02IMG
 Home Name = 01
 Away Name = 02
 Type = SN
 Category = L
 Timestamp = S
 Stream Id = VI

*/


app.get('/test',(req,res) => {
    console.log('test');
});

app.get('/',(req,res) => {
    results = [];
    resultsSoon = [];

        // https://intrabettv.com/ekkanal.json
    axios.get('https://intrabettv.com/ekkanal.json')
    .then((res)=>{
        if(res && res.data && res.data.length > 0)
        {
           
            res.data.map(item => {
                results.push({
                    homeName: item['homeName'] ? item['homeName'] : null,
                    homeLogo: item['homeLogo'] ?  item['homeLogo'] : null,
                    awayName: item['awayName'] ? item['awayName'] : null,
                    awayLogo: item['awayLogo'] ? item['awayLogo'] : null,
                    type: item['type'] ? item['type'] : null,
                    category: item['category'] ? item['category'] : null,
                    time: item['time'] ? item['time'] : null,
                    streamId: item['streamId'] ?  item['streamId'] : null
                });
            });
        }
    });

    axios.get("https://tbcof.com/url.json").then(function (getUrl) {
        axios.get(getUrl.data.url + '/LiveFeed/Get1x2_VZip?count=250&lng=tr&mode=4&country=190&partner=7')
          .then(function (response) {
            if(response && response.data && response.data.Value && response.data.Value.length > 0) {
                response.data.Value.map(item => {
                    if(item['VI']) {
                        results.push({
                            homeName: item['O1'] ? item['O1'] : null,
                            homeLogo: item['O1IMG'] ? 'https://v2l.cdnsfree.com/sfiles/logo_teams/' + item['O1IMG'][0] : null,
                            awayName: item['O2'] ? item['O2'] : null,
                            awayLogo: item['O2IMG'] ? 'https://v2l.cdnsfree.com/sfiles/logo_teams/' + item['O2IMG'][0] : null,
                            type: item['SN'] ? item['SN'] : null,
                            category: item['L'] ? item['L'] : null,
                            time: item['S'] ? item['S'] : null,
                            streamId: match['VI'] ? 'https://edge10.xmediaget.com/hls-live/xmlive/' + match['VI'] +'/1/mediaplaylist.m3u8'  : null
                        });
                    }
                });
            }
            axios.get(getUrl.data.url + '/LineFeed/Get1x2_VZip?count=100&lng=tr&mode=4&country=190&partner=7')
              .then(function (responseSoon) {
                if(responseSoon && responseSoon.data && responseSoon.data.Value && responseSoon.data.Value.length > 0) {
                    responseSoon.data.Value.map(match => {
                        resultsSoon.push({
                            homeName: match['O1'] ? match['O1'] : null,
                            homeLogo: match['O1IMG'] ? 'https://v2l.cdnsfree.com/sfiles/logo_teams/' + match['O1IMG'][0] : null,
                            awayName: match['O2'] ? match['O2'] : null,
                            awayLogo: match['O2IMG'] ? 'https://v2l.cdnsfree.com/sfiles/logo_teams/' + match['O2IMG'][0] : null,
                            type: match['SN'] ? match['SN'] : null,
                            category: match['L'] ? match['L'] : null,
                            time: match['S'] ? match['S'] : null,
                            streamId: match['VI'] ? 'https://edge10.xmediaget.com/hls-live/xmlive/' + match['VI'] +'/1/mediaplaylist.m3u8'  : null

                                              
                        });
                    });
                }

                const datas = {
                    live: results,
                    soon: resultsSoon
                }


                res.json(datas);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });        
    })
          
    
});


app.listen(port,() => {
    console.log('started');
})


 
