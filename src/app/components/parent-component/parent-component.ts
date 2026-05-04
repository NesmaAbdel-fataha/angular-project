import { Component } from '@angular/core';
import { Product } from '../product/product';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-parent-component',
  imports: [Product , FormsModule],
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.css',
})
export class ParentComponent {
searchInPerant:string =''
prdListInPerant:Iproduct[]=[]
//step 6
addIncartInPerant(product:Iproduct){
  console.log(product)
  let obj = this.prdListInPerant.find(item=>item.id == product.id)
  if(obj){
    obj.productQuantity++
    obj.productPrice += product.productPrice
  }
  else{
 this.prdListInPerant.push({...product,productQuantity:1})
  }
 
  console.log(this.prdListInPerant)
}
dincrementQuntaty(product:Iproduct){
  let obj = this.prdListInPerant.find(item=>item.id == product.id)
  if(obj && obj.productQuantity > 0){
    obj.productQuantity--
  } else if(obj && obj.productQuantity == 0){
    this.prdListInPerant = this.prdListInPerant.filter(item => item.id != product.id)
  }
  console.log(this.prdListInPerant)
}
}
