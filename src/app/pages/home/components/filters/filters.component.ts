import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
  
})
export class FiltersComponent implements OnInit {
  /* to send data out of your component, to parent
   component make use of @Output()
   e.g <number> means it will return number data type
  */
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'sports'];
  constructor() { }

  ngOnInit(): void {
  }

    onShowCategory(category: string): void {
      this.showCategory.emit(category);
    }
}
