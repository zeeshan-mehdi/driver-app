import { Component, OnInit } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LoginService } from '~/shared/login.service';
import { ListViewEventData } from 'nativescript-ui-listview';
import { confirm } from "tns-core-modules/ui/dialogs";
import * as toast from "nativescript-toast";
import { jsonpFactory } from '@angular/http/src/http_module';
import { RouterExtensions } from 'nativescript-angular/router';
@Component({
  selector: 'ns-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css'],
  moduleId: module.id,
})
export class BidsComponent implements OnInit {


  public id;
  bidsList=[];
  private nobids:Boolean;
  private showSpinner:Boolean
  constructor( route:ActivatedRoute,private LoginService:LoginService,
    private r:RouterExtensions) {
    

let x=route.snapshot.params['id'];
this.id=parseInt(x);
      this.showSpinner=true;
       // console.log("id :" +this.id)
     }

  ngOnInit() {
var x=
{
  jobID:this.id
}
    console.log("dsds")
    this.showSpinner=false;
this.LoginService.getJobBids(x).subscribe(res=>
  {

    console.log(":::"+JSON.stringify(res));

    try{
var x=res.json();
//alert(x);
if(x.data!="-1")
{
if(x.length)
console.log("t");
   this.bidsList=res.json();
    console.log("response" +res.json());
    this.showSpinner=true;
}
else
{


  this.showSpinner=true;
  toast.makeText("No Bids Yet.. ").show();

}

    }catch(ex)
    {
      alert("Unable to Fetch Data");
    }
  },err=>
  {
    alert("Unable to Fetch Data");
    this.showSpinner=true;
  })

  }
  public bidSelected(args: ListViewEventData) {

var x=args.index
  
    console.log("--__________________________________--");
    console.log(JSON.stringify(x));
    console.log(JSON.stringify(this.bidsList[x]));
    var item=this.bidsList[x];
    console.log("--__________________________________--");

    let options = {
      title: "Bid Allocation",
      message: "Do you want to allot job to this firm?",
      okButtonText: "Yes",
      cancelButtonText: "No",
      neutralButtonText: "Cancel"
  };
  
  confirm(options).then((result: boolean) => {
      console.log(result);

      if(result)
      {

        var x=
        {


bidID:parseInt(item.BidID),

"jobID":parseInt(item.JobID),
"firmID" : parseInt(item.FirmID)
        }

        console.log("sdajsd");

        this.LoginService.allotjobtofirm(x).subscribe(res=>{
console.log(JSON.stringify(res));

try
{
            var result=res.json();
           
            if (result.data=="Job alloted to firm")
						{
							// send msg to the firm here
					toast.makeText("Job Alloted to firm").show();
						
          }
          else if(result.data=="Job already alloted to a firm")
          {
            alert("Job already alloted to a firm");
          }
					else
					{
					alert("Cannot Allot Job to Firm");
          }
          
        }
        catch(ex)
        {
          alert("Error Processing Request");

        }
          },err=>
          {
            alert("Unable to connect to server");
          })
       
      }
  });
   
}

goBack()
{
  this.r.backToPreviousPage();
}



}
