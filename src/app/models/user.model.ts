export class User {
    address: string;
    email: string;
    owner: string;
   password: string;
   confirmPassword:string;
    id: any;
    phoneNumber: string;
    drivercount: string;
    jobcount: string;
    earning: string
    image:string;
    status:string;
    license:string

    

  
   constructor()
   {
this.address="";
this.owner="";
this.password="";
this.id=0;
this.phoneNumber="";
this.license="";
this.image="";
this.status="";
   
  
   }
}

export class Job {
    origin: string;
    destination: string;
    passengers: any;
    userID:any;
      todayDate:string;
   exp: string;
   



  
   constructor()
   {
   this.origin= "";
   this.destination="";
    this.passengers=0;
    this.userID=0;
      this.todayDate="";
   this.exp= "";
  


   }
}

export class jobItem
{

   jobID: string;
      jobOrigin: string;
      jobDestination: string;
      noOfPassengers: string;
      customerID: string;
      startDate: string;
      endDate: string;
      totalBids: string;
      minBid: string;
      status: string;


      constructor()
      {
       
     
   
   
      }

   }

   export class driverItem
   {
   
     driverID:any;
     name:any;
     address :any;
     badgeNo:any;
     license :any;
     image : any;
     status:any;
     phoneNo:any;
     totalMoney:any;
     totalJobs:any;
   
   
         constructor()
         {
          
        
      
      
         }
   
      }
   