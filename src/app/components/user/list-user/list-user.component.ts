import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  users!:any;
  deleteID!:any;
  isAllUsers:boolean = false;
  isArchievedUsers:boolean = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private authService:AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUsers();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true,
      paging: false,
      searching: false,
      deferRender: true,
      destroy: true,
     };
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
    return true
  }

  async getUsers(){
     this.authService.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users = result
      this.users = result.filter((res:any) => String(res.status) != String("archieved"));

      this.dtTrigger.next(this.users)

    });
  }

  DeleteUser()
  {
    this.showSpinner();
    
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

      // this.dtTrigger.next(this.users)
    });

    this.isAllUsers = true;
    this.isArchievedUsers = false;
  }

  AllUsers()
  {
    window.location.reload();
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

  showSpinner()
  {
    this.spinner.show();

    setTimeout(()=>{
      this.spinner.hide();
    }, 2000)

  }

}
