import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs'
import {map} from 'rxjs/operators'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription

  constructor() { }

  ngOnInit() {
  //  this.subscription = interval(1000).subscribe((count) => {
  //     console.log(`count`, count)
  //   })

  const customIntervalObservable = Observable.create((observer) => {
    let count = 0;
    setInterval(() => {
      observer.next(count)
      if(count === 2){
        observer.complete()
      }
      if(count > 3) {
        observer.error(new Error('Count is greater than 3!'))
      }
      count++
    }, 1000)
  })

  this.subscription  = customIntervalObservable.pipe(map((data: number) => {
    return 'Round: ' + data
  })).subscribe((data) => {
    console.log(`data`, data)
  }, error => {
    alert(error.message)
  }, () => {
    console.log('completed')
  })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
