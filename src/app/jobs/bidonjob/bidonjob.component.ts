import { Component, OnInit } from '@angular/core';
import { DataService } from '~/shared/Data.service';
import { LoginService } from '~/shared/login.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { min } from 'rxjs/operators';
import { Job } from '../job.model';

@Component({
  selector: 'ns-bidonjob',
  templateUrl: './bidonjob.component.html',
  styleUrls: ['./bidonjob.component.css'],
  moduleId: module.id,
})
export class BidonjobComponent implements OnInit {


  private job:Job
  private timerId: number;
  private timeVal: number = 0;
  private exp:Boolean;
  public showSpinner:Boolean;
  timerActivated = false;
  private meterInterval: any;
  private durationTime: string = "00:00"
	currentHour: number = new Date().getHours();
  currentMinute: number = new Date().getMinutes();
  protected bidamount:any;
  constructor(private ds:DataService,private ls:LoginService,private re:RouterExtensions) { 
    this.showSpinner=true;
  }

  ngOnInit() {
    this.showSpinner=true;
    this.exp=false;

    this.bidamount;
    this.job=this.ds.activeJob;

  
console.log("______________________________________________");
var secdiff,mindiff,hourdiff;
var minnow;
     var startdate=new Date();
       var enddate=new Date(this.job.endDate);
        hourdiff= enddate.getHours()-startdate.getHours();
console.log("hourdiff  :"+hourdiff)
       if(hourdiff==1||hourdiff==-11)
       {
 minnow=startdate.getMinutes()+60;
 mindiff=minnow-enddate.getMinutes();
       }
       else
       {
         mindiff=enddate.getMinutes()-startdate.getMinutes();
       }
 
console.log("mindiff  :"+mindiff);
 secdiff=enddate.getSeconds()-startdate.getSeconds()

if(secdiff<0)
{
  mindiff--;
  var  secnow=enddate.getSeconds()+60;
  secdiff=secnow-startdate.getSeconds();
}

console.log(mindiff+" :"+secdiff);

     




   this.timeVal=mindiff*60+secdiff;
  this.startTimer();


  }
  private initMeter() {
    this.resetMeter();
    this.meterInterval = setInterval(() => {
    
    }, 1000);
    }

    
  private resetMeter() {
    if (this.meterInterval) {
    clearInterval(this.meterInterval);
    this.meterInterval = undefined;
    }
    }

    
  public setTime () {
    var minutes = Math.floor(this.timeVal / 60);
    var seconds = this.timeVal % 60;
    
    function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
    var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    this.durationTime = finalTime;
    console.log(this.durationTime);
    
    }

    
  private startTimer () {
    
  //this.timeVal = 0;
  this.timerActivated = true;
  countTime();
 
  
  var that = this;
  
  function countTime () {
    setTimeout (() => {
      if (that.timerActivated) {
        if(that.timeVal>0)
        {
        that.timeVal--;
        that.setTime();
       
        countTime();
        }
        else
        {
          that.stopTimer();
          that.exp=true;
        }
      }
    }, 1000);
  }
  
  }
  
  private stopTimer () {
  this.timerActivated = false;
  }
    

  onButtonTap()
  {
  //  alert(this.bidamount);
    var val=parseInt(this.bidamount);

    if(this.exp)
    {
      alert("Job Expired");
    }
    else if(val&& val>0)
    {
      this.timerActivated=false;
      this.showSpinner=false;
     this.ls.AddBid(this.job.jobID,this.ds.activeUser.id,val).subscribe(res=>
      {
        this.showSpinner=true;
        var r=res.json();

        if(r.val=="1")
        {
          alert(r.data);
          this.re.navigate(['jobs']);
        }
      else if(r.val=="-1")
     

      {
        this.re.backToPreviousPage();
        alert(r.data);
      }
else
{
  this.showSpinner=true;
  alert("Something Went Wrong");

}

      },err=>
      {
alert("Unable to Connect to Server");
      })


    }
else
{

  alert("Please Enter A Valid Bid Amount");
}

  }
  goBackPage()
    {
    this.re.navigate(["jobs"])
    }
}
