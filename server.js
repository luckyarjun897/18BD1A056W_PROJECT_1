const express=require('express');
const bodyParser=require('body-parser');
let jwt=require('jsonwebtoken');
let config=require('./config.js');
let middleware=require('./middleware.js');

class HandlerGenerator{
    login(req,res){
        let username=req.body.username;
        let password=req.body.password;

        let mockusername='admin';
        let mockpassword='password';

        if(username && password){
            if(username===mockusername && password===mockpassword){
                let token=jwt.sign({username:username},config.secret,{expiresIn:'24h'});
				//jwt.signature craetes a token by encrypting the username by default
                res.json({ 
                    success:true,
                    message:'Authentication Successful',
                    token: token
                });
            }else{
                res.json({
                    success:false,
                    message:'Incorrect Username or Password'
                });
            }
        }else{
            res.json({
                success:false,
                message:'Authentication Failed! Plese Check the Request'
            });
        }
    }
    index(req,res){
        res.json({
            success:true,
            message:'Authentication is succesfull'
        });
    }
}
function main(){
    let app=express();
    let handlers=new HandlerGenerator();
    const port=8000;
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());
    app.post('/login',handlers.login);
    app.get('/',middleware.checkToken,handlers.index);
    app.listen(port,()=>console.log(`Server is listening on port:${port}`));

}

main();