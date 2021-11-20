import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { ProfileModel } from 'src/app/models/profile.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  visibleIndex: Boolean = true;
  data!:ProfileModel;
  constructor(private groceyService: GroceryService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.groceyService.getProfile()
      .subscribe((response) => {
        if (response.ok) {
          this.visibleIndex= false;
          this.data = response.body.data.userData;
        }
      });
  }

}
