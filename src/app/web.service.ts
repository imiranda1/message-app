import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from './Message';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})

export class WebService {
  userURL = "https://tiagoifsp.ddns.net/mensagens/jwt/user.php";
  userMsg = "https://tiagoifsp.ddns.net/mensagens/jwt/msg.php";
  constructor(private http : HttpClient) { }

  fazerLogin(user: User): Observable<any> {
      let body = new HttpParams();
      body = body.set("login",user.login);
      body = body.set("senha", user.senha);

      return this.http.post<any>(this.userURL,body)
        .pipe(
              tap(res => {
                // console.log(res["token"]);
                // console.log(res["expiry"]);
            if(res["token"] && res["expiry"]){
              // console.log("entrou no IF");
              // // console.log(res);
              // console.log(res["token"]);
              // console.log(res["expiry"]);
              sessionStorage.setItem("token", res["token"]);
              sessionStorage.setItem("expiry", res["expiry"]);
              sessionStorage.setItem("userName", res["userName"]);
            }
          })
      );
    }

    cadastrar(user: User): Observable<any>{
      let body = new HttpParams();
      console.log("calling web service");
      console.log(user.nome);
      console.log(user.login);
      console.log(user.senha);
      body = body.set("nome", user.nome)
      body = body.set("login", user.login);
      body = body.set("senha", user.senha);

      return this.http.put<any>(this.userURL,body)
        .pipe(
              tap(res => {
                // console.log(res["token"]);
                // console.log(res["expiry"]);
            if(res["token"] && res["expiry"]){
              // console.log("entrou no IF");
              // // console.log(res);
              // console.log(res["token"]);
              // console.log(res["expiry"]);
              sessionStorage.setItem("token", res["token"]);
              sessionStorage.setItem("expiry", res["expiry"]);
              sessionStorage.setItem("userName", res["userName"]);
            }
            console.log("retornou true")

          })

      );

    }

    cadastrarMessage(message: string): Observable<any>{
      let body = new HttpParams();
      console.log("calling web service");
      body = body.set("texto", message)
      return this.http.put<any>(this.userMsg,body,{observe: "response"});
    }

    getMessages() : Observable<Message[]>{
      console.log("web-servbice messages")
      return this.http.get<Message[]>(this.userMsg);
    }


  isLogged(): boolean {
    if(sessionStorage.getItem("token") != null && sessionStorage.getItem("expiry") != null){
      if(parseInt(sessionStorage.getItem("expiry")) > Date.now()){
        return true;
      }
    }
    return false;
  }



}
