import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Validate password
 * 1 uppercase char, 1 lowercase char, 1 number, 1 specific character, 6+ char
 * @returns Validator
 */
export function passwordValidator(): ValidatorFn {
    return(control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
    
        if (!value) {
          return null;
        }
    
        // Valide 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const valid = regex.test(value);

        return valid ? null : { invalidPassword: true };
      };
}