import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  lid!:any;
  usid!:any;
  results!:any;
  archievecdLivestock!:any
  livestok!:any;
  user!:any
  live!:any

  name = '!!!';
  viewMode = 'tab1';

  tab : any = 'tab1';
  tab1 : any
  tab2 : any
  tab3 : any
  Clicked!: boolean
  
  onClick(check:any){
    //    console.log(check);
        if(check==1){
          this.tab = 'tab1';
        }else if(check==2){
          this.tab = 'tab2';
        }  
      
    }

  @Output() newItemEvent = new EventEmitter<string>();
  @Output('openModal') openModal = new EventEmitter()


  constructor(private livestocService:LivestockService, private router: Router, private userserv :AuthService ) { }

  ngOnInit(): void {
    this.livestocService.GetAllPostedLivestock().subscribe((messages) => {
      let temp ;
      temp = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      this.livestocks = temp.filter((ress:any)=> String(ress.status) !== String('archived'))
      console.log(this.livestocks[0])
    }) 
    this.achievedLivestock();
  }
  
  addItem(newItem: string) {
    
    this.lid = newItem;
    this.livestocService.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      console.log(this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event
  }

  getUser(){
    this.userserv.GetAllUsers().subscribe((data:any)=>{
      this.user = data;
      this.user = this.results.filter((res:any) => Number(res.UserID) === Number(this.livestocks.UserID))
      console.log(this.user)
    })
  }

  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }

  deleteMyLivestock()
  {
    let st= {status:'archived'}

    this.livestocService.deleteLivestockl(this.livestocks.livestockID, st).subscribe(async res => {
      
  })
  this.closeModal()
  }

  achievedLivestock()
  {
    this.livestocService.GetAllPostedLivestock().subscribe((res:any) => {
      let result = res;
      this.achievedLivestock = result.filter((res:any) => String(res.status) === String("archived"));
      console.log(this.achievedLivestock)
    });
 }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

}

