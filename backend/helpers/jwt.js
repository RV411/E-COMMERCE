const expressJwt=require('express-jwt');

function authJwt(){
    const secret=process.env.secret;
    const api=process.env.API_URL
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            // {url:/\/api\/v1\/uploads(.*)/,methods:['GET','OPTIONS']},
            // {url:/\/api\/v1\/product(.*)/,methods:['GET','OPTIONS']},
            // {url:/\/api\/v1\/category(.*)/,methods:['GET','OPTIONS']},
            // {url:/\/api\/v1\/order(.*)/,methods:['GET','POST','OPTIONS']},
            // `${api}/user/login`,
            // `${api}/user/register`,
            {url:/(.*)/},
        ]
    })
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done();
}

module.exports=authJwt;