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

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.authService.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result
      console.log(this.users)
      this.users = result.filter((res:any) => String(res.status) != String("archieved"));
      // this.users = result.filter((res:any) => String(res.status) === String("archieved"));
    });

  }

  DeleteUser()
  {
    console.log('deleted') 
    console.log(this.deleteID)
    let status = "archieved"
    this.authService.DeleteUser(this.deleteID, status).subscribe(async res => {
      // this.decoded = jwt_decode(res.token);
    })

  }


  deleteUsr(userid:any)
  {
    this.deleteID = userid;
  }


}
