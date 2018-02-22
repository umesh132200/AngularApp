import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DataRequestService } from './../services/data-request.service';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-five-day-weather',
  templateUrl: './five-day-weather.component.html',
  styleUrls: ['./five-day-weather.component.css']
})
export class FiveDayWeatherComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  cityname:string;
  fiveDayWeather:any;
    constructor(private requestData:DataRequestService, private router:Router, private route:ActivatedRoute) {  }
  
 
    takeData(data){
        if(data === undefined || data === null) {
         this.router.navigate(['/weather']);
        } else {
         this.cityname = data.city.name;
         this.fiveDayWeather = data.list; 
        }   
    }


  ngOnInit() {
    this.takeData(this.requestData.data);
    this.dtOptions = { responsive: true };   
  }

  ngAfterViewInit(): void { this.dtTrigger.next();}

  rerender(): void {
    this.dtElement.dtInstance.then(
      (dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      }
    );
  } 
}
