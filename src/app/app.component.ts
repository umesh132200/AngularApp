import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    
     //Auto collapse navbar when click sub link
     $(() => {
       $('.nav a').on('click', () => { 
          if($('.navbar-toggle').css('display') !='none') {
              $('.navbar-toggle').trigger( "click" );
          }
       });
     });

     //collapse navbar when click header link
     $(() => {
          $('.navbar-header a').on('click', () => { 
             if($('.navbar-collapse').css('display') !='none') {
               $('.navbar-toggle').trigger( "click" );
             }
          });
     }); 

     //Page scroll show / hide goto top button
     $(window).scroll(function() {
      if ($(this).scrollTop() > 80 ) {
          $('.scrolltop:hidden').stop(true, true).fadeIn();
      }  else {
          $('.scrolltop').stop(true, true).fadeOut();
         }
     });

     //Click button goto top
     $(() => {
         $(".scroll").click(() => {
             $("html,body").animate({ scrollTop: 0 }, 600 );
             return false;
            });
     });
   }
}
