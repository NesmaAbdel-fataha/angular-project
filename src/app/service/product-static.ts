import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductStatic {
  propProduct:Iproduct[] = []
constructor(){
  
  this.propProduct =[
       {
      id:1,
      productName:"PIXPRO FZ55-RD 16MP CMOS Sensor Digital Camera 5X Optical Zoom 28mm Wide Angl",
      productQuantity:6,
      productDetails:"loremmmCamera...",
      productPrice:12000,
      catId:2,
      productimgUrl:"https://f.nooncdn.com/p/pnsku/N70169880V/45/_/1764242398/285a54f6-256c-442e-a2e8-e766bfdfd767.jpg?width=800"
    },
   {
      id:2,
      productName:"Z 5 Mirrorless Digital Camera With 24-50mm Lens",
      productQuantity:2,
      productDetails:"loremmmCamera...",
      productPrice:12000,
      catId:2,
      productimgUrl:"https://f.nooncdn.com/p/v1669388522/N48466580A_1.jpg?width=800"
    },
        {
      id:3,
      productName:"PIXPRO FZ55-RD 16MP CMOS Sensor Digital Camera 5X Optical Zoom 28mm Wide Angl",
      productQuantity:6,
      productDetails:"loremmmCamera...",
      productPrice:12000,
      catId:2,
      productimgUrl:"https://f.nooncdn.com/p/pnsku/N53402368A/45/_/1764242116/250adbee-69f6-46ec-811f-7d9548fd8c82.jpg?width=800"
    },
   {
      id:4,
      productName:"Z 5 Mirrorless Digital Camera With 24-50mm Lens",
      productQuantity:2,
      productDetails:"loremmmCamera...",
      productPrice:12000,
      catId:2,
      productimgUrl:"https://f.nooncdn.com/p/pnsku/N70095830V/45/_/1722051074/44b945da-d625-4629-82a2-b1606d8141c5.jpg?width=800"
    }
  ]


}

//get all products
getAllProducts():Iproduct[]{
  return this.propProduct //[{}]
}


//get product by id
getProductById(id:number):Iproduct | undefined{
  return this.propProduct.find((prd:Iproduct)=>{return prd.id==id })
}
//search
doSearch(value:string):Iproduct[]{
  value = value.toLowerCase()
return this.propProduct.filter((prd:Iproduct)=>prd.productName.toLowerCase().includes(value))
}
getAllids():number[]{
return this.propProduct.map((prd:Iproduct)=>Number(prd.id))
}
}
