import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  constructor(private rateservice : RateService) { }

  ngOnInit(): void {
    this.rateservice.getRates().subscribe((data:any)=>{
      
      console.log(data)
    })

  }

}
