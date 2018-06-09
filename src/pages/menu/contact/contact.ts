import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  error: Boolean = false;
  contactForm = {
    message: "",
    lastName: "",
    firstName: "",
    email: "",
    subject: ""
  };
  
  constructor(public navCtrl: NavController, private http: HttpClient) {  }

  onSubmit(form) {
      if (form && form.message && form.lastName && form.firstName && form.email && form.subject) {
        if(this.error) this.error = false;
        this.http.post('https://sportihome.com/api/contact', form)
                .subscribe(res => {
                  this.contactForm.message = "";
                  this.contactForm.lastName = "";
                  this.contactForm.firstName = "";
                  this.contactForm.email = "";
                  this.contactForm.subject = "";
                },
                err => console.error(err))
      }
      else this.error = true;
  }

}
