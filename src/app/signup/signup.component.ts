import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { WebService } from '../web.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formUser: FormGroup;
  constructor(private web : WebService,
    private rota: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.inicializarForm();
  }
  private inicializarForm(){
    this.formUser = new FormGroup({
      nome: new FormControl(""),
      login: new FormControl(""),
      senha: new FormControl(""),
    })
  }

  cadastrar(){
    this.web.cadastrar(this.formUser.value).subscribe(res =>{
      console.log(res);
      if(res.status == "OK"){
        alert("Cadastro realizado com Sucesso");
        this.router.navigate(['/messages']);
      }
      else{
        alert("Erro ao cadastrar");
        this.router.navigate(['/messages']);
      }
    });
  }
}
