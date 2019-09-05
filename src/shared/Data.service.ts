import { Injectable } from '@angular/core';
    
import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import {  Mode } from 'nativescript-loading-indicator';
import { OnInit } from "@angular/core";


@Injectable() 
export class DataService implements OnInit {
  ngOnInit(): void {
  
  }

  halt: boolean;
  credentials={};
   verifyphone:any;
  activeUser: any;
  activeDriver:any;
  activeJob: any;
  token:any;
  

constructor() 
{
}


};


