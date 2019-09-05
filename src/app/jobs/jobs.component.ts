import { ItemEventData } from "tns-core-modules/ui/list-view"
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
//import * as connectivity from 'connectivity';
import * as connectivity from "tns-core-modules/connectivity";

import { convertString } from "tns-core-modules/utils/utils";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DataService } from "~/shared/Data.service";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "~/shared/login.service";
import {Job} from "./job.model"
import { callLifecycleHooksChildrenFirst } from "@angular/core/src/view/provider";
import { action } from "tns-core-modules/ui/dialogs/dialogs";
import { load } from "@angular/core/src/render3";
@Component({
  selector: 'ns-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  moduleId: module.id,
})
export class JobsComponent implements OnInit {

  allotedjobs:Array<Job>
  alljobcount;
  activejobcount;
  ongjobcount;
  activejobs:Array<Job>
  ongoingJobs:Array<Job>
  showSpinner:Boolean;
  countries: { name: string, imageSrc: string }[] = [
    { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
    { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
    { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
  
];

onItemTap(args: ItemEventData): void {
    console.log('Item with index: ' + args.index + ' tapped');

    var item=this.activejobs[args.index];
    this.ds.activeJob=item;
    if(item.status=="alloted")
    alert("Job Already alloted");
    else
        this.re.navigate(['/jobs', "2"]);

    console.log(JSON.stringify(item));
    this
}


constructor(private ls:LoginService,private ds:DataService,private re:RouterExtensions) {

  this.allotedjobs=[];
  this.activejobs=[];
  this.ongoingJobs=[];
  // Use the component constructor to inject providers.
}


ngOnInit(): void {

  this.loaddata();
  this.showSpinner=true;

  console.log("here");

    this.ls.getActiveJobList().subscribe(result=>
     {
console.log("Hello");
      console.log(result.json())
     var res=result.json();

      if(res.data&& res.data=="-1")
      {
        this.activejobs=[];
      }
      else
      {
        this.activejobs=res;
        this.activejobcount=this.activejobs.length;
        
      }
     },err=>
     {
      console.log("Error");

     });
   
  
//------------------------------------------------------------------------------------------------

     this.ls.getAllotedJobs().subscribe(res=>
      {
 console.log("Hello");
       console.log(res.json())
       
      if(res.data&& res.data=="-1")
      {
        this.activejobs=[];
      }
      else
      {
        this.allotedjobs=res.json();
        this.alljobcount=this.allotedjobs.length;
        
      }
      
      },err=>
      {
       console.log("Error");
 
      });
    
            
    

     
//--------------------------------------------------------------------------------------------------------------

this.ls.geJobBids().subscribe(result=>
        {
   console.log("Hello");
         console.log(result.json());
var res=result.json();
         if(res.data&& res.data=="-1")
               {
                 this.ongoingJobs=[];
               }
               else
               {

                var bids=res;
                for(var i=0;i<bids.length;i++)
                {
                  var id=bids[i]["jobID"];
                  for(var j=0;j<this.activejobs.length;j++)
                  {
                    if(this.activejobs[i]["jobID"]==id)
                    {
                      this.ongoingJobs.push(this.activejobs[i]);
                    }
                  }


                }
                 this.ongjobcount=this.ongoingJobs.length;
                 
               }


        },err=>
        {
         console.log("Error");
   
        });
    
}


loaddata()
{

  setInterval(() => {
    var conn= connectivity.getConnectionType();
  
    
            if(conn)
            {
            
         

  this.ls.getActiveJobList().subscribe(result=>
     {
console.log("Hello");
      console.log(result.json())
     var res=result.json();

      if(res.data&& res.data=="-1")
      {
        this.activejobs=[];
      }
      else
      {
        this.activejobs=res;
        this.activejobcount=this.activejobs.length;
        
      }
     },err=>
     {
      console.log("Error");

     });
    }

  else
  {
    alert("No connection");
  }
          
          
          
}, 60000);
//------------------------------------------------------------------------------------------------

setInterval(() => {
  var conn= connectivity.getConnectionType();

  
          if(conn)
          {
     this.ls.getAllotedJobs().subscribe(res=>
      {
 console.log("Hello");
       console.log(res.json())
       
      if(res.data&& res.data=="-1")
      {
        this.activejobs=[];
      }
      else
      {
        this.allotedjobs=res.json();
        this.alljobcount=this.allotedjobs.length;
        
      }
      
      },err=>
      {
       console.log("Error");
 
      });
    }

    else
    {
      alert("No connection");
    }
            
            
            
  }, 70000);


     
//--------------------------------------------------------------------------------------------------------------

setInterval(() => {
  var conn= connectivity.getConnectionType();

  
          if(conn)
          {    
this.ls.geJobBids().subscribe(result=>
        {
   console.log("Hello");
         console.log(result.json());
var res=result.json();
         if(res.data&& res.data=="-1")
               {
                 this.ongoingJobs=[];
               }
               else
               {

                var bids=res;
                for(var i=0;i<bids.length;i++)
                {
                  var id=bids[i]["jobID"];
                  for(var j=0;j<this.activejobs.length;j++)
                  {
                    if(this.activejobs[i]["jobID"]==id)
                    {
                      this.ongoingJobs.push(this.activejobs[i]);
                    }
                  }


                }
                 this.ongjobcount=this.ongoingJobs.length;
                 
               }


        },err=>
        {
         console.log("Error");
   
        });
      }

      else
      {
        //alert("No connection");
      }
              
              
              
    }, 70000);

}
onDrawerButtonTap(): void {
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.showDrawer();
}


click()
{

 this.re.navigate(['/jobs', "2"]);

}

}
