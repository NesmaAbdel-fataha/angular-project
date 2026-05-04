import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from '../../models/icategory';
import { Iproduct } from '../../models/iproduct';
import { Category } from '../../service/category';
import { Message } from '../../service/message';
import { ProductDynamic } from '../../service/product-dynamic';

@Component({
  selector: 'app-insert-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert-product.html',
  styleUrl: './insert-product.css',
})
export class InsertProduct implements OnInit {
  categories: Icategory[] = [];
  insertProductForm: FormGroup;
  productId: string | null = null;
  isEditMode = false;

  constructor(
    private categoryService: Category,
    private productService: ProductDynamic,
    private router: Router,
    private route: ActivatedRoute,
    private message: Message
  ) {
    this.categories = this.categoryService.getAllCategories();

    this.insertProductForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
      productQuantity: new FormControl(0, [Validators.required, Validators.min(0)]),
      productDetails: new FormControl('', Validators.required),
      productimgUrl: new FormControl(''),
      catId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.insertProductForm.patchValue({
          productName: product.productName,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
          productDetails: product.productDetails,
          productimgUrl: product.productimgUrl,
          catId: product.catId,
        });
      });
    }
  }

  get f() {
    return this.insertProductForm.controls;
  }

  onSubmit() {
    if (this.insertProductForm.invalid) {
      this.insertProductForm.markAllAsTouched();
      return;
    }

    const formValue = this.insertProductForm.value;
    const productData: Iproduct = {
      id: this.productId ?? Date.now(),
      productName: formValue.productName,
      productPrice: Number(formValue.productPrice),
      productQuantity: Number(formValue.productQuantity),
      productDetails: formValue.productDetails,
      productimgUrl: formValue.productimgUrl,
      catId: Number(formValue.catId),
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.message.show('Product updated successfully');
          this.router.navigate(['/product-parent']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.productService.addNewProduct(productData).subscribe({
        next: () => {
          this.message.show('Product added successfully');
          this.router.navigate(['/product-parent']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
//edit,delete routes ==>service.ts ==> insertpro.ts 