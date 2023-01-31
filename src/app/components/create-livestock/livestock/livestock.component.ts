import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit {

  constructor(private livestockService:LivestockService, private authService: AuthService) { }

  livestock!:any;
  users!:any;

  ngOnInit(): void {

    this.livestockService.GetLivestockByUser().subscribe((res:any) => {
      this.livestock = res;
    });

  }

}
