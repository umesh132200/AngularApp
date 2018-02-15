import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() { }
  ngOnInit(){
    
     //collapse navbar
     $(function() {
      $('.nav a').on('click', function(){ 
          if($('.navbar-toggle').css('display') !='none'){
              $('.navbar-toggle').trigger( "click" );
          }
      });
  });

  $(function() {
      $('.navbar-header a').on('click', function(){ 
          if($('.navbar-collapse').css('display') !='none'){
              $('.navbar-toggle').trigger( "click" );
          }
      });
  });

    //Go to top
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
