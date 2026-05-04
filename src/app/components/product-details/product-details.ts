import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { Location } from '@angular/common';
import { ProductDynamic } from '../../service/product-dynamic';

@Component({
  selector: 'app-product-details',
  imports: [RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  //get id from url
  currentId:number = 0
  //next / prev index
  currentIndex:number = -1
  arrOfIds:number[] = []
  allProducts:Iproduct[] = []
  //step 5.data binding
  productData:Iproduct|undefined = {} as Iproduct

  constructor(private activate:ActivatedRoute ,
    private locate:Location , 
    private router:Router , private proWithApi:ProductDynamic ,
    private cd:ChangeDetectorRef
  ){
    this.proWithApi.getAllproduct().subscribe((data)=>{
      this.allProducts = data
      this.arrOfIds = data.map((prd:Iproduct)=>Number(prd.id)).sort((a, b) => a - b)
      this.updateCurrentIndex()
      this.cd.detectChanges()
    })

    this.activate.params.subscribe((x)=>{
      this.currentId = +x['id']
      this.updateCurrentIndex()
      this.loadProductData()
    })
  }

  private loadProductData(){
    this.proWithApi.getProductById(this.currentId).subscribe((data)=>{

      this.productData = data;
      // this.updateCurrentIndex()
      this.cd.detectChanges()
    })
  }

  private updateCurrentIndex(){
    this.currentIndex = this.arrOfIds.indexOf(this.currentId)
  }

  goPrev(){
    if (this.currentIndex > 0) {
      this.router.navigate(['/product-parent', this.arrOfIds[this.currentIndex - 1]])
    }
  }

  goNext(){
    if (this.currentIndex >= 0 && this.currentIndex < this.arrOfIds.length - 1) {
      this.router.navigate(['/product-parent', this.arrOfIds[this.currentIndex + 1]])
    }
  }
// goPrev() {
//   if (this.currentIndex > 0) {
//     const prevId = this.arrOfIds[this.currentIndex - 1];
//     this.router.navigate(['/product-parent', prevId]);
//   }
// }

// goNext() {
//   if (this.currentIndex < this.arrOfIds.length - 1) {
//     const nextId = this.arrOfIds[this.currentIndex + 1];
//     this.router.navigate(['/product-parent', nextId]);
//   }
// }
  goBack(){
    this.locate.back()
  }
}
