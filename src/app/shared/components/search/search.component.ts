import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular'
import { Router } from '@angular/router';

// import { HomeAddressModalComponent } from 'src/app/shared/components/home-address-modal/home-address-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() keyword: any;
  @Input() address: any;
  @Input() action:any;
  @Input() userInfo:any;
  @Input() notification_count:any;
  user_info:any = undefined;
  current_page: any;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.user_info = this.userInfo;
    this.current_page = this.router.url;
  }
  
  onSearchClick() {
    // this.onSearch.emit()
  }

  openNotification() {
    this.navCtrl.navigateForward('/notification')
  }
}
