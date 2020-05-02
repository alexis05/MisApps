var jwtDecode = require('jwt-decode');
class SecurityTools{
   
     constructor(token){
         this._token = "";
         if(token === undefined || token.lenght == 0)   throw "Cant be empty";
         this._token= token
     }

    decodeToken(){
        var currentToken = "";
        if(this.hasBearerString()){
            currentToken = this._token.split("Bearer")[1];
        }
        var decoded = jwtDecode(currentToken);
        const {usuarioId} = decoded
        return usuarioId;
    }

   hasBearerString(){
       return this._token.includes("Bearer");
    }
};

module.exports = SecurityTools;

