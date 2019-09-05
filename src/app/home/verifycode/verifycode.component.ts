import { Component, OnInit } from '@angular/core';
import { LoginService } from '~/shared/login.service';
import { DataService } from '~/shared/Data.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css'],
  moduleId: module.id,
})
export class VerifycodeComponent implements OnInit {
code:any;
showSpinner : Boolean
  constructor(private LoginService:LoginService,private DataService:DataService,private routerExtensions:RouterExtensions) { 

  }

  ngOnInit() {
  }

  onButtonTap()
  {

    var p={
      phoneNo: this.DataService.verifyphone,
      code : this.code
    }
this.LoginService.verifyaccount(p).subscribe(res=>
  {
    

        this.showSpinner=true;
var result=res.json();
if(result.val=="-2"|| result.val=="-1")
{
  alert(JSON.stringify(result.data));
}
else if (result.val=="1")
{
  alert(JSON.stringify(result.data));
  this.routerExtensions.backToPreviousPage();

}

/*
if(result.data==this.user.phoneNumber)
{
alert("Account Created\nLogin to Cintinue");
this.routerExtensions.backToPreviousPage();
}
else if(result.data=="-1")
{
alert("Phone/Email Already Exist");

}
else{

alert("Incomplete Information Provided");
}
*/
        
      },err=>
      {
        this.showSpinner=true;
        alert("Unable to Connect to Server");
      })
   
  }


  resend()
  {

    var p={
      phone: this.DataService.verifyphone,
     
    }
this.LoginService.resetcode(p).subscribe(res=>
  {
    

        this.showSpinner=true;
var result=res.json();
if(result.val=="-2"|| result.val=="-1")
{
  alert(JSON.stringify(result.data));
}
else if (result.val=="1")
{
  alert(JSON.stringify(result.data));
//  this.routerExtensions.backToPreviousPage();

}

        
      },err=>
      {
        this.showSpinner=true;
        alert("Unable to Connect to Server");
      })
   

  }


  goBack()
  {

    this.routerExtensions.backToPreviousPage();
  }
}



