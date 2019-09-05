import { Component, OnInit } from '@angular/core';
import { LoginService } from '~/shared/login.service';
import { DataService } from '~/shared/Data.service';
import { RouterExtensions } from 'nativescript-angular/router';
@Component({
  selector: 'ns-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css'],
  moduleId: module.id,
})
export class ResetpassComponent implements OnInit {
  pass:any;
  repass:any;
  showSpinner : Boolean
    constructor(private LoginService:LoginService,private DataService:DataService,private routerExtensions:RouterExtensions) { 
  
    }
  
    ngOnInit() {
      this.showSpinner=true;
    }
  
    onButtonTap()
    {

      
  this.showSpinner=false;
  if(this.pass==this.repass)
  {
      var p={
        phone: this.DataService.verifyphone,
      password:this.pass
      }


  this.LoginService.resetPassword(p).subscribe(res=>
    {
      this.showSpinner=true;
      
  
          this.showSpinner=true;
  var result=res.json();
  if(result.val=="-2"|| result.val=="-1")
  {
    alert(JSON.stringify(result.data));
  }
  else if (result.val=="1")
  {
    alert(JSON.stringify(result.data));
    this.routerExtensions.navigate(["/home"])
  
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
      else
      {
        alert("Password not matched");
      }
    }
  
  
    resend()
    {
  
      var p= this.DataService.verifyphone;
       
      
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

    onChange()
  {
    if (this.pass != this.repass) {
      console.log("Your passwords do not match.");
this.pass=false

  }
  else
  {
    this.pass=true;
    console.log("Your passwords match.");

  }
}
  
  
    goBack()
    {
  
      this.routerExtensions.backToPreviousPage();
    }
  }
  
  
  
  