import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRouteService } from 'src/app/services/current-route.service';
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
  filterTerm: string='';
  filterSearch!:string;
  livestok!:any;

  @Output() newItemEvent = new EventEmitter<string>();
  myCurrentRoute: any;
  
  // @Output('openModal') openModal = new EventEmitter()

  
  constructor(private livestoc:LivestockService, private router: Router , private currentRoute: CurrentRouteService) { }

  ngOnInit(): void {

    this.myCurrentRoute  = this.currentRoute.currentRoute();

    console.log(this.myCurrentRoute);

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
  
    this.filterTerm = catItem

  }
  onCategoryChange3(){
    this.filterTerm=''
  }

  reserve(ind: any) {
    this.post_id = this.livestocks[ind].livestockID
    this.addNewItem(this.post_id)
    //this.openModal.emit(true)
    // this.openModal()
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


  // openModal(){
   
  //   let modalCheckbox:any = document.getElementById('my-modal')
  //  modalCheckbox.checked = true
  // }

  // closeModal() {
  //   let modalCheckbox:any = document.getElementById('my-modal')
  //   modalCheckbox.checked = false
  // }

}
