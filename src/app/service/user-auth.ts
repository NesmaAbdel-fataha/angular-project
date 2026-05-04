import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuth {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedInValue());
  public isUserLoggedIn$ = this.loggedInSubject.asObservable();
  private userLoggedInSignal = signal<boolean>(this.isUserLoggedInValue());
  userPropSignal = this.userLoggedInSignal.asReadonly();

  // call api /login
  // res=>token
  login(username: string, password: string) {
    let token = '1233333333';
    localStorage.setItem('token', token);
    this.setLoggedInState(true);
    //detectChange //observable
  }

  logout() {
    localStorage.removeItem('token');
    this.setLoggedInState(false);
  }

  private isUserLoggedInValue(): boolean {
    return !!localStorage.getItem('token');
  }

  get isUserLoggedIn(): boolean {
    return this.isUserLoggedInValue();
  }
  methodSubject(){
    return this.userPropSignal
  }

  private setLoggedInState(isLoggedIn: boolean) {
    this.loggedInSubject.next(isLoggedIn);
    this.userLoggedInSignal.set(isLoggedIn);
  }
}
