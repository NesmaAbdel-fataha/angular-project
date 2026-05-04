import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import {ImgStyle} from '../../directives/imgStyle'
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ProductDynamic } from '../../service/product-dynamic';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Message } from '../../service/message';
// import { signal } from '@angular/core';
@Component({
  selector: 'app-product',
  imports: [CommonModule, ImgStyle, FormsModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit , OnDestroy{
toggleProp:boolean = true;
message = '';
private searchValue = '';

  // propProduct!:Iproduct[]
  propProduct=signal<Iproduct[]>([])
  // productAfterSearch: Iproduct[] | undefined 
 productAfterSearch=signal<Iproduct[]>([])
  // step 4 : create a property to hold the result of the search to be used in the template
  // productAfterSearch:Iproduct[] = []
  // username:string = "ahmed"
  //step 1 : create a property to hold the value of the input

@Input()   set filterProduct(valueSet:string){
this.searchValue = valueSet;
this.applyFilter();
}
//chiled to parent
//3.create event
@Output() prdEvent:EventEmitter<Iproduct> = new EventEmitter<Iproduct>()


//step 2 declare a method
addTocartInChild(product:Iproduct){
  //4.fire event
this.prdEvent.emit(product)
}
  constructor(private prdWithApi:ProductDynamic, private messageService: Message){
  //   this.propProduct =[
  //      {
  //     productId:1,
  //     productName:"PIXPRO FZ55-RD 16MP CMOS Sensor Digital Camera 5X Optical Zoom 28mm Wide Angl",
  //     productQuantity:6,
  //     productDetails:"loremmmCamera...",
  //     productPrice:12000,
  //     catId:2,
  //     productimgUrl:"https://f.nooncdn.com/p/pnsku/N70169880V/45/_/1764242398/285a54f6-256c-442e-a2e8-e766bfdfd767.jpg?width=800"
  //   },
  //  {
  //     productId:2,
  //     productName:"Z 5 Mirrorless Digital Camera With 24-50mm Lens",
  //     productQuantity:2,
  //     productDetails:"loremmmCamera...",
  //     productPrice:12000,
  //     catId:2,
  //     productimgUrl:"https://f.nooncdn.com/p/v1669388522/N48466580A_1.jpg?width=800"
  //   },
  //       {
  //     productId:1,
  //     productName:"PIXPRO FZ55-RD 16MP CMOS Sensor Digital Camera 5X Optical Zoom 28mm Wide Angl",
  //     productQuantity:6,
  //     productDetails:"loremmmCamera...",
  //     productPrice:12000,
  //     catId:2,
  //     productimgUrl:"https://f.nooncdn.com/p/pnsku/N70169880V/45/_/1764242398/285a54f6-256c-442e-a2e8-e766bfdfd767.jpg?width=800"
  //   },
  //  {
  //     productId:2,
  //     productName:"Z 5 Mirrorless Digital Camera With 24-50mm Lens",
  //     productQuantity:2,
  //     productDetails:"loremmmCamera...",
  //     productPrice:12000,
  //     catId:2,
  //     productimgUrl:"https://f.nooncdn.com/p/v1669388522/N48466580A_1.jpg?width=800"
  //   }
  // ]
  // step 6 : assign the original array to the property that will be used in the template to show all products before search
  
  }
  dataProduct!:Subscription
  messageSubscription!:Subscription
  ngOnDestroy(): void {
   this.dataProduct.unsubscribe()
   this.messageSubscription.unsubscribe()
  }
  ngOnInit(): void {
    // this.propProduct = this.prdStatic.getAllProducts()
// this.prdWithApi.getAllproduct().subscribe({
//   next:(next)=>{
//     console.log(next)
//   }
//   ,
//   error:err=>console.log(err),
//   complete:()=>{}
// })
//observer
 this.dataProduct=this.prdWithApi.getAllproduct().subscribe((data)=>{
  console.log(data)
  this.propProduct.set(data)
  //zone js
// this.propProduct = data
//  this.productAfterSearch = this.propProduct
this.applyFilter()
// this.cdr.detectChanges()
})
this.messageSubscription = this.messageService.message$.subscribe((message) => {
  this.message = message;
})
  // step 4 : create a property to hold the result of the search to be used in the template
 

  }
contrlQuntity(product:Iproduct){
product.productQuantity--

}
  toggle(){
this.toggleProp = !this.toggleProp
  }

deleteProduct(product:Iproduct){
  const isConfirmed = confirm(`Are you sure you want to delete ${product.productName}?`);

  if (!isConfirmed) {
    return;
  }

  this.prdWithApi.deleteProduct(product.id).subscribe({
    next: () => {
      this.propProduct.set(this.propProduct().filter((item) => item.id !== product.id));
      this.applyFilter();
      this.messageService.show('Product deleted successfully');
    },
    error: (err) => {
      console.log(err);
    },
  });
}

clearMessage(){
  this.messageService.clear();
}

private applyFilter(){
  const value = this.searchValue.toLowerCase();
  this.productAfterSearch.set(
    this.propProduct().filter((prd:Iproduct)=>prd.productName.toLowerCase().includes(value))
  );
}
//   go(){
// this.router.navigate()
//   }
  //step 2 : create a method to do the search logic
// doSearch(value:string):Iproduct[]{
//   value = value.toLowerCase()
// return this.propProduct.filter((prd:Iproduct)=>prd.productName.toLowerCase().includes(value))
// }
}
