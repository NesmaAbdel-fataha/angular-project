import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { UserAuth } from '../../service/user-auth';
// import { ImgStyle } from '../../directives/imgStyle';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(UserAuth);
  isUserLoggedIn = this.auth.methodSubject();

  logout() {
    this.auth.logout();
  }

  // ngOnInit() {
  //   this.subscription = this.auth.isUserLoggedIn$.subscribe(isLoggedIn => {
  //     this.isUserLoggedIn = isLoggedIn;
  //   });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  // logout() {
  //   this.auth.logout();
  // }
}
