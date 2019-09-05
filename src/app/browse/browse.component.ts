import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as toast from "nativescript-toast"
import { DataService } from "~/shared/Data.service";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "~/shared/login.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { jobItem } from "../models/user.model";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar/segmented-bar";
import { confirm } from "tns-core-modules/ui/dialogs";
import { SearchBar } from "tns-core-modules/ui/search-bar";
@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html",
    styleUrls:["./browse.css"]
})
export class BrowseComponent implements OnInit {
  
    private driverList;
    private alldrivers=[];
    private nodrivers:Boolean;
    private showSpinner:Boolean;
    countries: { name: string, imageSrc: string }[] = [
        { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
        { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
        { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" }
      
    ];

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');

      var item=  this.driverList[args.index];

      console.log(JSON.stringify(item));

      let options = {
        title: "Add Driver",
        message: "Add This Driver to Firm?",
        okButtonText: "Yes",
        cancelButtonText: "No",
        neutralButtonText: "Cancel"
    };
    
    confirm(options).then((result: boolean) => {
        console.log(result);

        if(result)
        {
toast.makeText("Processing your request\n Please Wait").show();
this.LoginService.AddDrivertofirm(item.driverID,this.DataService.activeUser.id).subscribe(result=>
    {
var res=result.json();
        console.log(result.json())

        if(res.val=="1")
        {
            alert(res.data);
        }
else  if(res.val=="-1")
{
    alert(res.data);
}
        else
        {
            alert("Something went wrong");
        }
    },err=>
    {


    });
{}
            
        }
    });

    }
    private getSegmentedBarItems = () => {
        let segmentedBarItem1 = new SegmentedBarItem();
        segmentedBarItem1.title = "Ongoing Jobs";
        let segmentedBarItem2 = new SegmentedBarItem();
        segmentedBarItem2.title = "Alloted Jobs";
        let segmentedBarItem3 = new SegmentedBarItem();
        segmentedBarItem3.title = "Active Jobs";
        return [segmentedBarItem1, segmentedBarItem2, segmentedBarItem3];
    }
    segmentedBarItems: Array<SegmentedBarItem> = this.getSegmentedBarItems();
    selectedBarIndex: number = 0;


   // items: Array<Item>;
    constructor(private DataService:DataService,
        private LoginService:LoginService
        ,private routerExtensions:RouterExtensions) {
            this.driverList=[];
            this.showSpinner=false;
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

        this.LoginService.geAllDrivers().subscribe(result=>{
            console.log("__________________________________________");
            console.log(result.json());


            if(result.data)
            {
                this.showSpinner=true;
            }

            else

            {
this.driverList=result.json();
this.alldrivers=this.driverList;

this.showSpinner=true;
            }
        },err=>
        {
this.showSpinner=true;
alert("Unable to connect to Server")
        });
        
    }


    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }


    
  onTextChanged(args)
  {
  //  alert(this.searchPhrase)
//alert(this.searchPhrase);

this.driverList=[];
var  searchValue;
let searchBar = <SearchBar>args.object;
if(searchBar.text)
 searchValue=searchBar.text.toLowerCase();
if (searchValue !== "") {
    for (let i = 0; i < this.alldrivers.length; i++) {
        if (this.alldrivers[i].name.toLowerCase().indexOf(searchValue) !== -1) {
            this.driverList.push(this.alldrivers[i]);
        }
    }
 

  }
}

  onClear(args)
  {
    
    this.driverList=this.alldrivers;


  }

   
}

export interface Item {
    id: number;
    name: string;
    role: string;
}

export class ItemService {
  

   
}
