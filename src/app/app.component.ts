import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() { }
  ngOnInit(){
    $(window).scroll(function() {
      if ($(this).scrollTop() > 80 ) {
          $('.scrolltop:hidden').stop(true, true).fadeIn();
      } else {
          $('.scrolltop').stop(true, true).fadeOut();
      }
  });
  $(function(){$(".scroll").click(function(){$("html,body").animate({ scrollTop: 0 }, 600 );return false})})
  }
}
