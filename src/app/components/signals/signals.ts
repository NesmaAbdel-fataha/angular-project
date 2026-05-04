import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
counter=signal<number>(0)
doubleCounter = computed(()=>this.counter()*2)
increase(){
// this.counter.set(4)
this.counter.update((x)=>x+1)
}
decrease(){
  // this.counter.set(-2)
  this.counter.update((x)=>x-1)
}
}
