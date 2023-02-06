import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentRouteService } from 'src/app/services/current-route.service';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-availablelivestock',
  templateUrl: './availablelivestock.component.html',
  styleUrls: ['./availablelivestock.component.scss']
})
export class AvailablelivestockComponent implements OnInit {
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

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() useridd = new EventEmitter<string>();
  myCurrentRoute: any;
  
  // @Output('openModal') openModal = new EventEmitter()

  
  constructor(private livestoc:LivestockService, private router: Router , private currentRoute: CurrentRouteService,private authservice:AuthService) { }

  ngOnInit(): void {

    this.myCurrentRoute  = this.currentRoute.currentRoute();

    console.log(this.myCurrentRoute);

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.livestocks = messages
      console.log('i am livestock',this.livestocks)
    })
    
    this.GetCategories();
    this.GetProducts();
    this.getUser();
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
    console.log('delete id',this.post_id)
  }


  addNewItem(post_id: any,userId: any) {
    this.newItemEvent.emit(post_id);
    this.useridd.emit(userId)
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

  

  //GET SELLERS LIVESTOCK
  getUser()
  {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
       console.log('i ran',this.users)

       this.getMyLivestock();
    })
  }

  getMyLivestock()
  {
    this.livestoc.GetAllPostedLivestock().subscribe((res:any) => {
      this.result2 = res;
      
      let transTemp = this.result2.filter((res:any) => Number(res.UserID) === Number(this.users[0].Userid));
      this.trans = transTemp.filter((ress:any) => String(ress.status) != String('archieved'));
      console.log('What i am looking for',this.trans);
    }); 
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
