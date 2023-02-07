import { Component, ViewChild } from "@angular/core";
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
import { UserDashboard } from "src/app/model/userDashboard";
import { analyzeAndValidateNgModules } from "@angular/compiler";


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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
   

  chatData : UserDashboard[] =[];
  dateData: any[] = [];
  numberData: any[] = [];

  title:any;
  chart1:ApexChart;
  series1!:ApexAxisChartSeries;
  xaxis!:ApexXAxis;

  // @ViewChild("chart") chart!: ChartComponent;
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

  constructor(private statsService: StatsService) {

    this.title = {
      text: "Users Registered by Month",
      align: "left"
    };

    this.chart1 =  {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    }

    this.statsService.GetRegUsersPerMon().subscribe(async(res:any) =>{
      this.chatData = res;
      // console.log(this.chatData);

        this.chatData.forEach(element => {
          //console.log('value ', ) 
          let temp = parseInt(element.count)
          let temp2 = String(element.registered_month)
          this.dateData.push(temp2 = new Date(temp2).toDateString())
          this.numberData.push(temp)

          // console.log(this.dateData)
        }); 
        await this.initData();
        
    })


  }

  initData(): void {

    this.series1 = [
      {
        name: "Users",
        data: this.numberData,
      }
    ]
    this.xaxis = {
      categories: this.dateData 
      // categories: this.dateData 
    }

  }

  users!:any;

  ngOnInit(): void {
 
    this.statsService.GetNumUsers().subscribe((res:any) =>{
      this.users = res;
      console.log(this.users);
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


// export class people: UsersComponent;

// constructor(){
//  this.people = [
//    new Person ('Carla','Smith', 20 ),
//     new Person ('Carlos','Smith', 25 ),
//     new Person ('Andrea','Johnson', 23 ),
   
//    ];
// }
