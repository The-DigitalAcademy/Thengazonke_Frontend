import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-mylivestock22',
  templateUrl: './mylivestock22.component.html',
  styleUrls: ['./mylivestock22.component.scss']
})
export class Mylivestock22Component implements OnInit {

  post_id:any
  livestocks!:any;
  categories!:any;
  filterTerm!: string;
  lid!:any;
  usid!:any;
  trans!:any;
  results!:any;
  users!:any;
  userId!:any;

  livestok!:any;

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

  constructor(private livestoc:LivestockService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {

    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
    })

    this.livestoc.GetAllPostedLivestock().subscribe((messages:any) => {
      let results = messages;
      this.livestocks = results.filter((res:any) => String(res.UserID) === String(8))
    }) 
  }
  
  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }
  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }

  delete(ind: any) {
    this.post_id = this.trans[ind].livestockID
    this.addNewItem(this.post_id)
    this.userId = this.livestocks[ind].UserID
    
    console.log('delete id',this.post_id)
  }

}