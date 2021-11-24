import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;


  constructor(private web : WebService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService ){ }

  ngOnInit(): void {
    this.inicializarForm();
    console.log(this.web.isLogged());
    if(this.web.isLogged() == false){
      this.router.navigate(['/']);

    }else{}
  }

  private inicializarForm(){
    this.formUser = new FormGroup({
      login: new FormControl(""),
      senha: new FormControl(""),
    })
  }

  fazerLogin(){
    this.web.fazerLogin(this.formUser.value).subscribe(res => {

      if(res.status == "OK"){
        this.router.navigate(['/messages']);
        this.toast.success("Login realizado com sucesso!");

      }
      else{
        console.log(res.ok)
        this.toast.error("Erro ao realizar login");

      }
    });
  }

}
