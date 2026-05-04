import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
//class decorator ==> meta data
@Directive({
    selector : '[appImgStyle]',
})
//style on all imgs border red and hover
//- select ele from dom
export class ImgStyle implements OnInit,OnChanges{
    //life cycle component 1= comstruvuoe . on init project unut . on change - input/output
    // the color is not static
//*property decarator
 @Input() color:string = 'red'
    constructor(public ele:ElementRef){
        //==document.getElementByid
    }
    //بتاخد اي حاجة جاي قبلها انلت اوتبت ديكريتور
    ngOnChanges(): void {
       this.ele.nativeElement.style.border = `2px solid ${this.color}`
    }
    //الحاجة الي عايز انفذها بعد ما يلود الكومبوننت
    ngOnInit(): void {
    // this.ele.nativeElement.style.border = `2px solid ${this.color}`

    }
    //method_decrator
@HostListener('mouseover') mouseOver(){
    this.ele.nativeElement.style.border = "2px solid blue"
}
@HostListener('mouseout') mouseOut(){
this.ele.nativeElement.style.border = `2px solid ${this.color}`
}
}