import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { LivestockService } from 'src/app/services/livestock.service';


@Component({
  selector: 'app-mylivestock',
  templateUrl: './mylivestock.component.html',
  styleUrls: ['./mylivestock.component.scss']
})
export class MylivestockComponent implements OnInit {
  post_id:any
  livestocks!:any;
  categories!:any;
  filterTerm!: string;
  lid!:any;;
  usid!:any;
  results!:any;

  livestok!:any;

  @Output() newItemEvent = new EventEmitter<string>();
  @Output('openModal') openModal = new EventEmitter()

  reserve(ind: any) {
    this.post_id = this.livestocks[ind].livestockID
    this.addNewItem(this.post_id)
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = event
  }

  addUserId(userID: string){
    this.usid = userID;
    console.log('i am user id',this.usid)
  }


  addItem(newItem: string) {
    
 
    this.lid = newItem;
    //this.usid = userID;

    console.log('i am lisc if',this.lid)
    

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      // console.log('i am livestock',this.livestocks)

      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log('One livestokokoko',this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event

    
    
  }


  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }

  GetCategories(){

    this.livestoc.GetLivestockCategories().subscribe((res) => { 
      this.categories = res;
      // console.log('this are categories',this.categories)
    })
  }
  GetProducts(){
    this.livestoc.GetAllPostedLivestock().subscribe((res) => {
      this.livestocks =res;
      // console.log('from funtion',this.livestocks)
    })
  }

  deleteUser(){

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      // console.log('i am livestock',this.livestocks)

      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log('One livestokokoko',this.livestok)
    })
    
  }

 
  deleteMyLivestock()
  {
    console.log('deleted') 
    console.log(this.lid)
    let st= {
      status: "archieved"
    }
    this.livestoc.deleteLivestockl(this.lid, st).subscribe(async res => {
     console.log('status archived')
    })

    this.closeModal();

  }

  constructor(private livestoc:LivestockService, private router: Router) { }

  ngOnInit(): void {

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.livestocks = messages
      // console.log('i am livestock',this.livestocks)
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

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

}

