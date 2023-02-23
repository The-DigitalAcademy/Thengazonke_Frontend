import { Component, OnInit, ViewChild } from "@angular/core";
import { StatsService } from "src/app/services/stats.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { LivestockDashboard } from "src/app/model/livestockDashboard";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-livestocks',
  templateUrl: './livestocks.component.html',
  styleUrls: ['./livestocks.component.scss']
})
export class LivestocksComponent implements OnInit {

  chatData : LivestockDashboard[] =[];
  dateData: any[] = [];
  numberData: any[] = [];
  livestocks!:any;

  title:any;
  chart1:ApexChart;
  series1!:ApexAxisChartSeries;
  xaxis!:ApexXAxis;
  @ViewChild("chart", { static: false }) chart!: ChartComponent;

  constructor(private statsService: StatsService) {

    this.title = {
      text: "Livestock Posted per Month",
      align: "left"
    };

    this.chart1 =  {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    }

    this.statsService.GetRegLivestockPerMon().subscribe(async(res:any) =>{
      this.chatData = res;

      console.log(this.chatData);
      
        this.chatData.forEach(element => {
          let temp = parseInt(element.count)
          let temp2 = String(element.registered_month)
          this.dateData.push(temp2 = new Date(temp2).toDateString())
          this.numberData.push(temp)

        }); 
        await this.initData();
        
    })


  }

  initData(): void {

    this.series1 = [
      {
        name: "Livestock",
        data: this.numberData,
      }
    ]
    this.xaxis = {
      categories: this.dateData 
    }

  }

  

  ngOnInit(): void {
 
    this.statsService.GetNumLivestock().subscribe((res:any) =>{
      this.livestocks = res;
      console.log(this.livestocks);
    });
    
  }


  getData(): void {

    this.statsService.GetRegUsersPerMon().subscribe((res:any) =>{
      this.chatData = res;
      console.log(this.chatData);

        this.chatData.forEach(element => {
          //console.log('value ', ) 
          let temp = parseInt(element.count)
          let temp2 = String(element.registered_month)
          this.dateData.push(temp)
          this.numberData.push(temp2)

          return this.dateData;
        });
        
    })
  }

}