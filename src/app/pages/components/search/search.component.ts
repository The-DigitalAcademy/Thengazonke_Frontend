import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  categories:string[] | null = null ;
  livestocks:string[] | null = null;

  GetCategories(){
    // fetch('http://fakestoreapi.com/products/categories')
    // .then(res => res.json())
    // .then(data => {
    //   data.unshift('All')
    //   this.categories =data;
    // })
    this.categories = ["All",'Goat','Cattle',"Pig"];
  }

  GetProducts(){
    fetch('http://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      this.livestocks =data;
    })
  }

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
  

  constructor() { }

  ngOnInit(): void {
    this.GetCategories();
    this.GetProducts();
  }

  onCategoryChange(e:any){
    alert(e.target.value)
    // if(e.target.value=='All'){
    //   // this.GetProducts('http://fakestoreapi.com/products');
    // }
  }

}