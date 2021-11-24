const host = "http://172.20.0.3:10021/api/v1";
const axios = require('axios');

module.exports = {
    swaggerSecurityHandlers: {
        AdminApiKey: function (req, authOrSecDef, scopesOrApiKey, callback) {
            if (scopesOrApiKey) {
                if (scopesOrApiKey === '12345') callback();
                else callback(new Error('Api key missing or not registered'));
            }
            else callback(new Error('Api key missing or not registered'));
        },

        SessionID: async function(req,authOrSecDef,scopesOrApiKey,callback){
            let user;
            try {
                let getUserRes =  await axios({
                  method: 'get',
                  url: `${host}/User/`
                });
                user = getUserRes.data.find(user => user.sessionId == scopesOrApiKey);
              } catch (error) {
                console.log("security error")
              }
            
            if (user) callback();
            else callback(new Error('SessionID missing or the user not logged in'))
        }
    }
};