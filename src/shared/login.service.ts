import { Injectable } from "@angular/core";
import { getBoolean, getString, setBoolean, setString } from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { Http, Headers, Response, RequestOptionsArgs } from "@angular/http";
import { Observable } from "tns-core-modules/ui/page/page";
import { User ,Job,jobItem} from "~/app/models/user.model";
import { DataService } from "./Data.service";
var Sqlite= require("nativescript-sqlite")
var server="http://taxiexchange.com/WebServices/mobileapp/WebServices/";
@Injectable()
export class LoginService 
{
    private headers: Headers = new Headers();
    private  options: RequestOptionsArgs
    constructor(private httpmodule: Http,
    private  DataService:DataService) {
    this.headers.append("Content-Type", "application/json");
    this.options = { headers: this.headers, withCredentials: false };

     }


    login(credentials:any) {
  
        var  ServerSettings=
        {
 
            serverpath:server+"LoginFirm.php"
     }
         //this.setHeaders();
         console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(credentials));
         let url= ServerSettings.serverpath;
 
                   return this.httpmodule.post(url,JSON.stringify(credentials),this.options);
        
    }

    signup(c:User) {


      var upload={
        address:c.address,
    
password:c.password,
phoneNo:c.phoneNumber,
email:c.email,
image:c.image,
      }
  
      var  ServerSettings=
      {

          serverpath:server+"RegisterCustomer.php"
   }
       //this.setHeaders();
       console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(upload));
       let url= ServerSettings.serverpath;

                 return this.httpmodule.post(url,JSON.stringify(upload),this.options);
      
  }

    
    getJobBids(id:any) {
  
      var  ServerSettings=
      {

          serverpath:server+"getJobBids.php"
   }
       //this.setHeaders();
       console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(id));
       let url= ServerSettings.serverpath;

                 return this.httpmodule.post(url,JSON.stringify(id),this.options);
      
  }

  verifyaccount(data  )
    {
      
      var  ServerSettings=
      {

          serverpath:server+"VerifyCodeCustomer.php"
   }
       //this.setHeaders();
       console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
       let url= ServerSettings.serverpath;

                 return this.httpmodule.post(url,JSON.stringify(data),this.options);
    }


    resetcode(phone)
    {

      var  ServerSettings=
      {

          serverpath:server+"customerPhoneVerificationCode.php"
   }
       //this.setHeaders();
       console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(phone));
       let url= ServerSettings.serverpath;

                 return this.httpmodule.post(url,JSON.stringify(phone),this.options);

    }

    setDeviceToken(id,token)
    {

      var data=
      {
        token :token,
          firmID : id
      }

      var  ServerSettings=
      {

          serverpath:server+"SetFirebaseToken.php"
   }
       //this.setHeaders();
       console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
       let url= ServerSettings.serverpath;

                 return this.httpmodule.post(url,JSON.stringify(data),this.options);

    }

    
resetPassword(datatosend)
{
 

  
  var  ServerSettings=
  {

      serverpath:server+"resetCustomerPassword.php"
}
  

   console.log("\n\nSending to Server :\n\n" + JSON.stringify(datatosend));
   let url= ServerSettings.serverpath;

             return this.httpmodule.post(url,JSON.stringify(datatosend),this.options);

}

    logout(id)
    {

      return   new Sqlite("cdb.db").then(db => 
        {
            db.execSQL("DELETE from user  WHERE id = ?", 
            [id]
        ).then(
            id => {
                console.log("Delete RESULT", JSON.stringify(id));
          
                  
                
            }, error =>
            {
                console.log("Delete Error", JSON.stringify(error));
            }
        );
    });

      
    }
    
insertData(user:User):any

{ 

 //  alert(JSON.stringify(user));
  return  new Sqlite("cdb.db").then(db => 
      {
          //id ,owner,license,email,phone,address,image,password,drivercount,jobcount
          db.execSQL("INSERT INTO user (id,owner, license,phone,address,image,password,drivercount,jobcount,earning) VALUES (?, ?, ?,?,?,?,?,?,?,?)",
          [user.id,user.owner, user.license,user.phoneNumber,user.address,user.image,user.password,user.drivercount,user.jobcount,user.earning]).then(id => {
             console.log("INSERT USER RESULT", JSON.stringify(id));
           return id;
         }, error => {
             console.log("Insertion  ERROR", error);
         });
               
            });
}


verifyUser():any
{

  var email;
  var password;

 return   new Sqlite("cdb.db").then(db => 
  {
      
              var user =new  User;
            return   db.all("SELECT * FROM user").then(rows => {
              //  console.log(JSON.stringify(rows));
               if(rows[0])
               {
               //  id ,owner,license,email,phone,address,image,password,drivercount,jobcount
                  console.log(JSON.stringify(rows[0]));
                     user.id         = rows[0][0];
                     user.owner          = rows[0][1];
                      user.license   = rows[0][2];
                      user.email      = rows[0][3];
                      user.phoneNumber  = rows[0][4];
                       user.address      = rows[0][5];
                       user.image      = rows[0][6];
                       user.drivercount= rows[0][7];
                       user.drivercount= rows[0][8];
                   //    user.dob      = rows[0][7];

                     console.log(JSON.stringify(user));
                        return user;
               }
               else
               {
                   return null;
               }
                      
                    
                 });
              });
          

}
AddJob(jobcreation:Job):any
{
    let data= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
    let time= new Date().toTimeString();
    let hr=new Date().getHours()+ ":"
    hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
 // alert(hr);
   
   var  datetime=data+ " " +hr;
  
   var x=new Date();
   x.setMinutes(x.getMinutes()+20);
    data= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
    time= new Date().toTimeString();
    hr=x.getHours()+ ":";
   hr+=x.getMinutes()+ ":"+ x.getSeconds();

   var ex=data+ " " +hr;
   jobcreation.todayDate=datetime;
   jobcreation.exp=ex;
   jobcreation.userID=this.DataService.activeUser.id;
   
    console.log(JSON.stringify(datetime));
    console.log(ex);
   
   var  ServerSettings=
   {

       serverpath:server+"AddJob.php"
}
    //this.setHeaders();
    console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(jobcreation));
    let url= ServerSettings.serverpath;

              return this.httpmodule.post(url,JSON.stringify(jobcreation),this.options);
   

}

//________________________________________________________________________________________________________________



AddDrivertofirm(driverid,firmid):any
{


  var data={
    firmID:firmid,
    driverID:driverid
  }
  var  ServerSettings=
  {

      serverpath:server+"addDriverToFirm.php"
}
   //this.setHeaders();
   console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(data));
   let url= ServerSettings.serverpath;

             return this.httpmodule.post(url,JSON.stringify(data),this.options);
  

}


deleteDriverfromFirm(driverid,firmid):any
{


  var data={
    firmID:firmid,
    driverID:driverid
  }
  var  ServerSettings=
  {

      serverpath:server+"deleteDriverFromFirm.php"
}
   //this.setHeaders();
   console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(data));
   let url= ServerSettings.serverpath;

             return this.httpmodule.post(url,JSON.stringify(data),this.options);
  

}


getAllotedJobs():any
{
 
  let data= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
  let time= new Date().toTimeString();
  let hr=new Date().getHours()+ ":"
  hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
var  datetime=data+ " " +hr;

 var x=new Date();
 x.setDate(x.getDate()-1);
  data= x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate();
  time= new Date().toTimeString();
  hr=x.getHours()+ ":";
 hr+=x.getMinutes()+ ":"+ x.getSeconds();

 var ex=data+ " " +hr;
 var datatosend=
 {
  todayDate:datetime,
 previousDate:ex,

 firmID:this.DataService.activeUser.id

 }
 
  console.log(JSON.stringify(datetime));
  console.log(ex);
 
 var  ServerSettings=
 {

     serverpath:server+"getAllotedJobList.php"
}
  //this.setHeaders();
  console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(datatosend));
  let url= ServerSettings.serverpath;

            return this.httpmodule.post(url,JSON.stringify(datatosend),this.options);
 

}


getActiveJobList():any
{
  
  let data= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
  let time= new Date().toTimeString();
  let hr=new Date().getHours()+ ":"
  hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
var  datetime=data+ " " +hr;

 var x=new Date();
 x.setDate(x.getDate()-1);
  data= x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate();
  time= new Date().toTimeString();
  hr=x.getHours()+ ":";
 hr+=x.getMinutes()+ ":"+ x.getSeconds();

 var ex=data+ " " +hr;
 var datatosend=
 {
  todayDate:datetime,
 previousDate:ex
 }
 
  console.log(JSON.stringify(datetime));
  console.log(ex);
 
 var  ServerSettings=
 {

     serverpath:server+"getJobList.php"
}
  //this.setHeaders();
  console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(datatosend));
  let url= ServerSettings.serverpath;

            return this.httpmodule.post(url,JSON.stringify(datatosend),this.options);
 
}
getSuggestions(search:any)
{
  var key = "AIzaSyDQ6qgdB12REUdZrz9MY6TZufAZe36vvCk";
  var uristr = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+search;
   uristr= uristr + "&key=" + key;

   console.log("uri sUGGESTION"+ uristr);

   return this.httpmodule.get(uristr);

}
allotjobtofirm(data)
{

  
  var  ServerSettings=
  {

      serverpath:server+"allotJobToFirm.php"
}
   //this.setHeaders();
   console.log("\n\nSending to Server for Update  :\n\n" + JSON.stringify(data));
   let url= ServerSettings.serverpath;

             return this.httpmodule.post(url,JSON.stringify(data),this.options);
  

}



 getJobList():any
    {

      console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));

      let date= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
    let time= new Date().toTimeString();
    let hr=new Date().getHours()+ ":"
    hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
 // alert(hr);
   
   var  datetime=date+ " " +hr;
  
   var x=new Date();
   x.setDate(new Date().getDate()-1);
    date= x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate();
    time= new Date().toTimeString();
    hr=x.getHours()+ ":";
   hr+=x.getMinutes()+ ":"+ x.getSeconds();

   var ex=date+ " " +hr;


        var data=
        {
            todayDate:datetime,
previousDate: ex,
customerID:this.DataService.activeUser.id
    }

   
  // alert("here");
   var  ServerSettings=
   {

       serverpath:server+"getCustomerJobList.php"
}
    //this.setHeaders();
    console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
    let url= ServerSettings.serverpath;

      return this.httpmodule.post(url,JSON.stringify(data),this.options);

    
    }

//__________________________________________________________________________________________________________________


    getFirmDriverList():any
    {

      console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));


        var data=
        {
          
firmID:this.DataService.activeUser.id
    }

   
  // alert("here");
   var  ServerSettings=
   {

       serverpath:server+"getFirmDrivers.php"
}
    //this.setHeaders();
    console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
    let url= ServerSettings.serverpath;

      return this.httpmodule.post(url,JSON.stringify(data),this.options);

    }

    
//__________________________________________________________________________________________________________________


geAllDrivers():any
{

  console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
    var data=    {}


var  ServerSettings=
{

   serverpath:server+"getAllDriverList.php"
}
//this.setHeaders();
console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
let url= ServerSettings.serverpath;

  return this.httpmodule.post(url,JSON.stringify(data),this.options);

}



//__________________________________________________________________________________________________________________


AddBid(jobid,firmid,amount):any
{

  let date= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
  let time= new Date().toTimeString();
  let hr=new Date().getHours()+ ":"
  hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
// alert(hr);
 
 var  datetime=date+ " " +hr;

  console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
    var data=    {
     jobID:jobid,
			firmID:firmid,
		amount:amount,
    todayDate:datetime
    


    }


var  ServerSettings=
{

      serverpath:server+"addBids.php"
}
//this.setHeaders();
console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
let url= ServerSettings.serverpath;

  return this.httpmodule.post(url,JSON.stringify(data),this.options);

}

//------------------------------------------------------------------------------------------------------------


geJobBids():any
{

  let data= new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
  let time= new Date().toTimeString();
  let hr=new Date().getHours()+ ":"
  hr+=new Date().getMinutes()+ ":"+ new Date().getSeconds();
var  datetime=data+ " " +hr;

 var x=new Date();
 x.setDate(x.getDate()-1);
  data= x.getFullYear()+"-"+x.getMonth()+"-"+x.getDate();
  time= new Date().toTimeString();
  hr=x.getHours()+ ":";
 hr+=x.getMinutes()+ ":"+ x.getSeconds();

 var ex=data+ " " +hr;
 var datatosend=
 {
  todayDate:datetime,
 previousDate:ex,

 firmID:this.DataService.activeUser.id

 }

var  ServerSettings=
{

   serverpath:server+"getMyBidsRecords.php"
}
//this.setHeaders();
console.log("\n\nSending to Server for Update :\n\n" + JSON.stringify(data));
let url= ServerSettings.serverpath;

  return this.httpmodule.post(url,JSON.stringify(datatosend),this.options);

}



}