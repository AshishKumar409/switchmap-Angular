import 'zone.js/dist/zone';
import { Component, importProvidersFrom, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  fromEvent,
  interval,
  debounceTime,
  of,
  startWith,
  scan,
  Subject,
  take,
  from,
} from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>{{value}}</h1>
    

  `,
})
export class App {
  name = 'Angular';
  value = 'this will be updated';
  http = inject(HttpClient);
  search: FormControl = new FormControl();

  ngOnInit() {
    from([1, 2, 3, 4, 5])
      .pipe(
        switchMap((v: any) =>
          this.http
            .get(`https://jsonplaceholder.typicode.com/todos/${v}`)
            .pipe(map((todo: any) => todo.title + ' id: ' + v))
        )
      )
      .subscribe((value: any) => {
        console.log('switch map', value);
        this.value = value;
      });
  }
}

bootstrapApplication(App, {
  providers: [importProvidersFrom(HttpClientModule)],
});
