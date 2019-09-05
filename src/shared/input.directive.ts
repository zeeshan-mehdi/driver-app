import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[minlength]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinLengthDirective, multi: true}]
})
export class MinLengthDirective implements Validator {

    @Input() minlength: string;

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }

}

@Directive({
    selector: '[phone]',
    providers: [{provide: NG_VALIDATORS, useExisting: IsPhoneDirective, multi: true}]
})
export class IsPhoneDirective implements Validator {

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
       // let phone = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
       // let phone =  /^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/;
        let phone=  /^(?=^.{6,18}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        console.log(control.value);
        let valid = phone.test(control.value);
        console.log("Valid :"+valid);
        return control.value < 1 || valid ? null : {'phone': true};
    }

}



@Directive({
    selector: '[email]',
    providers: [{provide: NG_VALIDATORS, useExisting: IsEmailDirective, multi: true}]
})
export class IsEmailDirective implements Validator {

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
        let emailRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/;
        let valid = emailRegEx.test(control.value);
        return control.value < 1 || valid ? null : {'email': true};
    }

}