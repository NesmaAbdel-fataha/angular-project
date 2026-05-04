import { Component } from '@angular/core';
import { Store } from '../../models/store';
import { UserAuth } from '../../service/user-auth';
import { Signals } from "../signals/signals";

@Component({
  selector: 'app-home',
  imports: [Signals],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

propStore:Store
isuserloggedin:boolean = false;
constructor(private Auth:UserAuth){
  this.propStore = new Store('zara' ,'https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/12/0/0/ZARA-LOGO.jpg?ve=1&tl=1',["cairo" ,"assuit" , "helwan" ,"maday"])
this.isuserloggedin = this.Auth.isUserLoggedIn; //without calling
//  the function because it is a getter
}
login(){
this.Auth.login('ahmed' , '123456');
this.isuserloggedin = this.Auth.isUserLoggedIn;
}
logout(){
this.Auth.logout();
this.isuserloggedin = this.Auth.isUserLoggedIn;
}

}
