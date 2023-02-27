import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRouteService } from 'src/app/services/current-route.service';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.scss']
})
export class AvailableComponent implements OnInit {

  post_id:any
  userId:any
  livestocks!:any;
  categories!:any;
  filterTerm: string='';
  filterSearch!:string;
  livestok!:any;
  trans!:any;
  live!:any;
  transaction!:any;
  users:any[] = [];
  result!:any;
  result2!:any;
  p: number = 1;
  total: number = 0;

  
  name = '!!!';
  viewMode = 'mylivestock';

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() useridd = new EventEmitter<string>();

  myCurrentRoute: any;

  constructor(private livestoc:LivestockService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
    })

    this.livestoc.GetAllPostedLivestock().subscribe((messages:any) => {
      let livestocks1 = messages;
      this.livestocks = livestocks1.filter((res:any) => String(res.status) != String("archieved"));
    }) 
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
    this.userId = this.livestocks[ind].UserID

    this.addNewItem(this.post_id,this.userId)
    
    //this.openModal.emit(true)
    // this.openModal()
  }
  delete(ind: any) {
    this.post_id = this.trans[ind].livestockID
    this.addNewItem(this.post_id,this.userId)
    this.userId = this.livestocks[ind].UserID
    
    console.log('delete id',this.post_id)
  }


  addNewItem(post_id: any,userId: any) {
    this.newItemEvent.emit(post_id);
    this.useridd.emit(userId)
  }

  GetCategories(){

    this.livestoc.GetLivestockCategories().subscribe((res) => { 
      this.categories = res;
    })
  }
  GetProducts(){
    this.livestoc.GetAllPostedLivestock().subscribe((res) => {
      let livestocks1 =res;
      this.livestocks = livestocks1.filter((res:any) => String(res.status) != String("archieved"));
    })
  }

  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.GetProducts();
  }

}
