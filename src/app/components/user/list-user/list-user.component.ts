import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users!:any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.authService.GetAllUsers().subscribe(async(res:any) => {
      this.users = res;
    });

  }
  // open_student_modal(usersID='') {

  //   const modalRef = this.modalService.open(StudentModalComponent, { size: "xl" });
  //   modalRef.componentInstance.usersID=usersID;
    
  // }

}
