import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrentRouteService } from '../services/current-route.service';
import { LivestockService } from '../services/livestock.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filterSearch!:string;
  filterSearch1!:string;
  filterTerm:string[] = [];
  categories:any;
  status = ['pending', 'complete', 'in-progress', 'cancelled']
  statuses!:any;
  myCurrentRoute!:any;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private livestockService: LivestockService, private currentRoute: CurrentRouteService) { }

  ngOnInit(): void {
    this.myCurrentRoute  = this.currentRoute.currentRoute();
    this.getCategory();
  }

  getCategory()
  {
    this.livestockService.GetLivestockCategories().subscribe((res:any) => { 
      this.categories = res;

    })
  }
  onCategoryChange(e:any){
    
    this.filterTerm.push(e.target.value)

    if(e.target.value=='All'){
      this.filterTerm.push('');
      // this.GetProducts();
    }
    this.addNewItem(this.filterTerm)

  }
  onSearchChange(e:any){
    this.filterTerm.push(e.target.value)
    this.addNewItem(this.filterTerm)
  }

  addNewItem(filterTerm: any) {
    this.newItemEvent.emit(filterTerm);
    // this.useridd.emit(userId)
  }

  onCategoryChange2(catItem:any){
    
    this.filterSearch = catItem
    console.log('Categgorrrryyy',this.filterTerm)

  }
  onCategoryChange3(){
    this.filterSearch=''
  }
}
