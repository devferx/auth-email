import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const emailLocal = localStorage.getItem('email');
    if (emailLocal) {
      this.usuario.email = emailLocal;
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'espere por favor'
    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(
      resp => {
        console.log(resp);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      }
    );
  }
}
