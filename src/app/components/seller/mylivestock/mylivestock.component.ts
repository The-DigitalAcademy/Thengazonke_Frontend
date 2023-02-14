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
  lid!:any;
  usid!:any;
  results!:any;

  livestok!:any;

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

  addItem(newItem: string) {
    
    this.lid = newItem;
    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      //console.log('Got this One livestock',this.livestok)
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event
  }


  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }

  deleteMyLivestock()
  {
    let st= {
      status: "archived"
    }

    this.livestoc.deleteLivestockl(this.lid, st).subscribe(async res => {
     //console.log('status archived')
    })

    this.closeModal();
  }

  constructor(private livestoc:LivestockService, private router: Router) { }

  ngOnInit(): void {
    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.livestocks = messages
    }) 
  }
  
  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

}

