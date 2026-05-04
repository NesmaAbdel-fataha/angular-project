import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../../service/user-auth';

export const authGuard: CanActivateFn = (route, state) => {
  
let userAuth=inject(UserAuth);
let router = inject(Router)
if(userAuth.isUserLoggedIn){
  return true;
}else{
  alert("please logIn")
  router.navigate(['login'])
  return false;
}
  
};
