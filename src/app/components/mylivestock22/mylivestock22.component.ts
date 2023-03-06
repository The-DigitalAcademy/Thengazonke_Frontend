import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
  DeleteLivestockID!:any;
  p: number = 1;
  total: number = 0;

  livestok!:any;

  @Output() newItemEvent = new EventEmitter<string>();
  @Output('openModal') openModal = new EventEmitter()

  addItem(newItem: string) {
    
    this.lid = newItem;
    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.results = messages
      this.livestok = this.results.filter((res:any) => Number(res.livestockID) === Number(this.lid))
    })

    let modalCheckbox:any = document.getElementById('my-modal')
      modalCheckbox.checked = event
  }


  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }

  constructor(private livestoc:LivestockService, private router: Router, private authservice: AuthService, private toast :HotToastService) { }

  ngOnInit(): void {

   this.getMyLivestocks();
  }

  getMyLivestocks()
  {
    this.authservice.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
    })

    this.livestoc.GetAllPostedLivestock().subscribe((messages:any) => {
      let results = messages;
      let livestocks1 = results.filter((res:any) => String(res.UserID) === String(sessionStorage.getItem('loggedID')))
      this.livestocks = livestocks1.filter((res:any) => String(res.status) != String("archieved"));
    }) 
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getMyLivestocks();
  }

  DeleteMyLivestock()
  {
    console.log('deleted') 
    console.log(this.DeleteLivestockID)
    let st= {
      status: "archieved"
    }
    this.livestoc.deleteLivestockl(this.DeleteLivestockID, st).subscribe(async res => {
      // await this.getUsers();
    }, (err) => {

      if(Number(err.status) === Number(0)){
        let msg = `There's been an error please try again`;
        this.errorToast(msg)
      }
      else if(err.status === 200){
        this.successfullToast();
        this.closeModal()
      }
      else if(err.status === 201){

        this.successfullToast();
        this.closeModal()
        }
      else{
        this.errorToast("Something went wrong, please try again")
      }
  });
    this.closeModal();

  }

  deleteMyLivestock(livestockID:any)
  {
    this.DeleteLivestockID = livestockID;
  }
  
  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }
  getPriceCurrency(price:any){
    return price.slice(1,price.length);
  }


  successfullToast(){
    this.toast.success('Livestock deleted!',{duration:4000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#4BB543',
      secondary: '#FFFAEE',
    },})
  }

  warningToast(){
    this.toast.warning('Boo!',{duration:4000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#FFCC00',
      secondary: '#FFFAEE',
    },})
  }

  errorToast(message:any){
    this.toast.error(message,{duration:2000 , style: {
      padding: '35px',
      width: '48%',
      height: '100px',
      margin: '12px auto',
      background: '#fff',
      border: '2px solid #fff',
    },
    iconTheme: {
      primary: '#DC3545',
      secondary: '#FFFAEE',
    },})
  }

}