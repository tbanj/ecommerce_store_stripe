import { StoreService } from 'src/app/services/store.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
  
})
export class FiltersComponent implements OnInit, OnDestroy {
  /* to send data out of your component, to parent
   component make use of @Output()
   e.g <number> means it will return number data type
  */
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;

  categories: Array<string> | undefined;

  // categories: string[]= ['shoes', 'shirts'];


  constructor(private _storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this._storeService.getAllCategories()
    .subscribe((response) => {
      this.categories = response;
    });
  }

    onShowCategory(category: string): void {
      this.showCategory.emit(category);
    }


    ngOnDestroy(): void {
      if(this.categoriesSubscription) 
      this.categoriesSubscription.unsubscribe();
    }
}
