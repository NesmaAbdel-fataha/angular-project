import { Component } from '@angular/core';
import { Iuser } from '../../models/iuser';
import { User } from '../../service/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-driven-form',
   standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
 confirmPassword: string = '';

  constructor(private userService:User,private router: Router) {}
propUser:Iuser = {} as Iuser
  AddnewUser() {

    // let u: Iuser = {
    //   fname: "mona",
    //   lname: "ahmed",
    //   email: "mona@gmil.com",
    //   password: "12345678"
    // }

    this.userService.AddnewUser(this.propUser).subscribe((data) => {
      console.log(data);
        this.router.navigate(['/product-parent']);
    });

  }
}