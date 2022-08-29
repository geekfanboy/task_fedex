import { ConstantPool } from '@angular/compiler';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {

    //Validator for Name use in Password

    static checkBlank() {

    }

    static NameInPassword(passName: string, firstName: string, lastName: string) {
        return (formGroup: FormGroup) => {
            let passControl = formGroup.controls[passName];
            let fnameControl = formGroup.controls[firstName]
            let lnameControl = formGroup.controls[lastName]
           const fname = fnameControl.value.replace(/\s/g, '').toLowerCase();
            const lname = lnameControl.value.replace(/\s/g, '').toLowerCase();

            if (
                (passControl.value.toLowerCase().includes(fnameControl.value.toLowerCase()) && fname.length > 0) ||    //no restriction in use of whitespace in password. ensure check for spaced variant of 2+ word names in password
                (passControl.value.toLowerCase().includes(lnameControl.value.toLowerCase()) && lname.length > 0) ||
                (passControl.value.toLowerCase().includes(fname) && fname.length > 0) ||    // ensure check for spaceless variant of 2+ word names e.g. last name "Van Dijk" will still match "vandijk" in password  
                (passControl.value.toLowerCase().includes(lname) && lname.length > 0)) {
                passControl.setErrors({ ...passControl.errors, nameUseValidator:true } )
                return ;
            }
            return ;
        };
    }

}