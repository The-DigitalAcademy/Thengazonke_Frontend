import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { BreedService } from 'src/app/shared/services/breed.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LivestockService } from 'src/app/shared/services/livestock.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  logEmail!:any;
  users!:any;
  userLenght!:any;
  livestock!:any;
  breed!:any;
  category!:any;

  constructor(private router: Router, private authService: AuthService, private livestockService: LivestockService,
    private breedService:BreedService, private categoryService : CategoryService) { 
  }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
      this.logEmail = sessionStorage.getItem('loggedEmail');

       forkJoin({
        requestUsers: this.authService.GetAllUsers(),
        requestCategory: this.categoryService.GetAllCategory(),
        requestBreed: this.breedService.GetAllBreed(),
        requestLivestock: this.livestockService.GetLivestockByUser(),
  
      }).subscribe(({requestUsers, requestCategory, requestBreed, requestLivestock}) => {
        let result  = requestUsers;
        this.userLenght = result.filter((res:any) => String(res.status) != String('archived'));
        this.users = result.filter((res:any) => String(res.email) === String(this.logEmail))
        this.category = requestCategory;
        this.breed = requestBreed;
        this.livestock = requestLivestock;
      });
    }
    else
    {
      this.router.navigate(['/auth/login']);
    }
  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.logEmail = sessionStorage.removeItem('loggedID'); 
    this.logEmail = sessionStorage.removeItem('loggedInToken'); 
    this.router.navigate(['/auth/login']);
  } 

}