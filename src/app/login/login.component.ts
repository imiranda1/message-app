import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private web : WebService,
    private rota: ActivatedRoute,
    private router: Router ){ }

  ngOnInit(): void {
    console.log(this.web.isLogged());
    if(this.web.isLogged() == false){
      this.router.navigate(['/']);
    }
  }

  fazerLogin(){
    this.web.fazerLogin().subscribe(res => {

      if(res.status == "OK"){
        this.router.navigate(['/messages']);
        alert("login sucesso");

      }
      else{
        console.log(res.ok)
        // alert("erro login");

      }
    });
  }

}
