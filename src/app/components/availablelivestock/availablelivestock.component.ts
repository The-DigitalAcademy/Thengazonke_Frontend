import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-availablelivestock',
  templateUrl: './availablelivestock.component.html',
  styleUrls: ['./availablelivestock.component.scss']
})
export class AvailablelivestockComponent implements OnInit {
  post_id:any

  @Output() newItemEvent = new EventEmitter<string>();

  reserve(ind: any) {
    this.post_id = this.livestocks[ind].livestockID
    this.addNewItem(this.post_id)
  }

  addNewItem(post_id: any) {
    this.newItemEvent.emit(post_id);
  }
  // categories:string[] | null = null ;
  // livestocks:string[] | null = null;
  livestocks!:any;
  categories!:any;

  

  GetCategories(){

    this.livestoc.GetLivestockCategories().subscribe((res) => { 
      // res.unshift('All')
      this.categories = res;
      console.log('this are categories',this.categories)

    })
    // this.categories = ["All",'Goat','Cattle',"Pig"];
  }
  GetProducts(){
    this.livestoc.GetAllPostedLivestock().subscribe((res) => {
      this.livestocks =res;
      console.log('from funtion',this.livestocks)
    })
  }

  // GetProducts(){
  //   // fetch('http://fakestoreapi.com/products')
  //   // .then(res => res.json())
  //   // .then(data => {
  //   //   this.livestocks =data;
  //   // })
  // }

  filterTerm!: string;
  userRecords = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
  ];

  myClickFunction(category: any){
    // this.filteredList = data.filter(item => item.category === category );
    
    let projectNames = this.userRecords.map(item => {
        return item.username;
      });

    if(projectNames==category){
      console.log(projectNames)
      console.log(category)

    }
}
  

  constructor(private livestoc:LivestockService, private router: Router) { }

  ngOnInit(): void {

    this.livestoc.GetAllPostedLivestock().subscribe((messages) => {
      this.livestocks = messages
      console.log('i am livestock',this.livestocks)
    })
    
    this.GetCategories();
    this.GetProducts();
  }
  
  onCategoryChange(e:any){
    // alert(e.target.value)
    this.filterTerm=e.target.value
    // console.log(this.filterTerm)
    if(e.target.value=='All'){
      this.filterTerm='';
      this.GetProducts();
    }
  }

  onCategoryChange2(catItem:any){
    this.filterTerm=catItem
  }
  onCategoryChange3(){
    this.filterTerm=''
  }

}
