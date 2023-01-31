import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-availablelivestock',
  templateUrl: './availablelivestock.component.html',
  styleUrls: ['./availablelivestock.component.scss']
})
export class AvailablelivestockComponent implements OnInit {
  post_id:any
  livestocks!:any;
  categories!:any;
  filterTerm!: string;

  @Output() newItemEvent = new EventEmitter<string>();
  @Output('openModal') openModal = new EventEmitter()

  reserve(ind: any) {
    this.post_id = this.livestocks[ind].livestockID
    this.addNewItem(this.post_id)
    this.openModal.emit(true)
  }


  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }

  GetCategories(){

    this.livestoc.GetLivestockCategories().subscribe((res) => { 
      this.categories = res;
      console.log('this are categories',this.categories)
    })
  }
  GetProducts(){
    this.livestoc.GetAllPostedLivestock().subscribe((res) => {
      this.livestocks =res;
      console.log('from funtion',this.livestocks)
    })
  }

  constructor(private livestoc:LivestockService, private router: Router) { }

  ngOnInit(): void {

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.livestocks = messages
      console.log('i am livestock',this.livestocks)
    })
    
    this.GetCategories();
    this.GetProducts();
  }
  
  onCategoryChange(e:any){
    this.filterTerm=e.target.value
    if(e.target.value=='All'){
      this.filterTerm='';
      this.GetProducts();
    }
  }

  onCategoryChange2(catItem:any){
    this.filterTerm=catItem
  }
  onCategoryChange3(){
    this.filterTerm=''
  }

}