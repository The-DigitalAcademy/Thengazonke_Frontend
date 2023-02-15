import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users!:any;
  deleteID!:any;
  isAllUsers:boolean = false;
  isArchievedUsers:boolean = true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.authService.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result
      this.users = result.filter((res:any) => String(res.status) != String("archieved"));
      // this.users = result.filter((res:any) => String(res.status) === String("archieved"));
    });
  }

  DeleteUser()
  {
    console.log('deleted') 
    console.log(this.deleteID)
    let st= {
      status: "archieved"
    }
    this.authService.DeleteUser(this.deleteID, st).subscribe(async res => {
      await this.getUsers();
    })

    this.closeModal();

  }

  achievedUsers()
  {
    this.authService.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result
      this.users = result.filter((res:any) => String(res.status) === String("archieved"));
    });
    this.isAllUsers = true;
    this.isArchievedUsers = false;
  }

  AllUsers()
  {
    this.getUsers();
    this.isAllUsers = false;
    this.isArchievedUsers = true;
  }


  deleteUsr(userid:any)
  {
    this.deleteID = userid;
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }


}
