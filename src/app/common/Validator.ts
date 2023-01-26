import { Subject } from "rxjs";

export class Validator{
   static  error=new Subject<string>();

  
 
static ValidateEmail(mail:string) 
{
    {
        let EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(mail.length<=0){
            this.error.next("Email Id is required");
            return (false)
        }
     if (!EMAIL_REGEXP.test(mail))
      {
        this.error.next("Email Id is not valid");
        return (false)
      }
      this.error.next("")
        return (true)
    }
}

static ValidatePassword(p:string) 
{
   
    if (p.length < 8) {
        this.error.next("Your password must be at least 8 characters");
        return (false)
    }
    if (p.length > 20) {
        this.error.next("Your password must be at max 32 characters");
        return (false)
    }
    if (p.search(/[a-z]/) < 0) {
        this.error.next("Your password must contain at least one lower case letter."); 
        return (false)
    }
    if (p.search(/[A-Z]/) < 0) {
        this.error.next("Your password must contain at least one upper case letter."); 
        return (false)
    }

    if (p.search(/[0-9]/) < 0) {
        this.error.next("Your password must contain at least one digit.");
        return (false)
    }
   if (p.search(/[!@#\$%\^&\*_]/) < 0) {
    this.error.next("Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]"); 
    return (false)
    }
    this.error.next("")
    return true;
}

static ValidateName(name:string) 
{
    {
        var NAME_REGEXP = /^[a-zA-Z ,.'-]+$/;
        if(name.length<=0){
            this.error.next("First/Last name is required");
            return (false)
        }
     if (!NAME_REGEXP.test(name))
      {
        this.error.next("First/Last name is not valid");
        return (false)
      }
      this.error.next("")
        return (true)
    }
}

static ValidatePrice(key:string,val:string)
{
    {
        var PRICE = /[1-9]\d*(?:\.\d{0,2})?/;
        if(val != null && val.length < 1){
            this.error.next(key+" is required");
            return (false)
        }
     if (!PRICE.test(val))
      {
        this.error.next(key+" is not valid");
        return (false)
      }
      this.error.next("")
        return (true)
    }
}

}