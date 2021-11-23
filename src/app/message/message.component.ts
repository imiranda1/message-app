import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../Message';
import { WebService } from '../web.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messagesList: Message[];
  userName: string = sessionStorage.getItem("userName");
  texto: string = "";
  constructor(private web : WebService,
    private rota: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    if(this.web.isLogged() == true){
      this.loadMessages();
    }else{
      this.router.navigate(['/']);
    }

  }


  loadMessages(): void {
    console.log("teste");
    this.web.getMessages().subscribe(res => {
      this.messagesList = res;
      console.log(res);
    });
     console.log("teste");
  }

  logout(): void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiry");
    sessionStorage.removeItem("userName");
    this.router.navigate(['/']);

  }

  cadastrarMessage(){
    console.log("cadastrando mensagem");
    console.log(this.texto);
    this.web.cadastrarMessage(this.texto).subscribe(res =>{
      console.log(res);
      if(res.status == "200"){
        alert("Cadastro realizado com Sucesso");
        this.router.navigate(["/messages"])
        this.loadMessages();
        this.texto = "";
      }
      else{
        alert("Erro ao cadastrar");

      }
    });
  }



}
