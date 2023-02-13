import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  results!:any;

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