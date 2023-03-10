import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  @ViewChild('pdfReport', { static: false })
  pdfReport!: ElementRef;


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
      lengthMenu : [5, 10, 25, 50, 100, 200, 300],
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
      this.users = result.filter((res:any) => String(res.status) != String("archived"));

      this.dtTrigger.next(this.users)

    });
  }

  DeleteUser()
  {
    this.showSpinner();
    
    let st= {
      status: "archived"
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

  downloadAsPDF(){
    let DATA: any = document.getElementById('table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('users_report.pdf');
    });
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
