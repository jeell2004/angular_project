import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formcomponent',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './formcomponent.html',
  styleUrl: './formcomponent.css',
})
export class Formcomponent {
userForm!: FormGroup;
  users: any[] = [];
  // -1 means no user exist 
  // 0 means user exist
  getdata = -1;  
private formbuilder = inject(FormBuilder)

  ngOnInit() {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: this.formbuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    })
    });
    console.log("first console",this.users);
    
    this.loadUsers();
    console.log("second console",this.users);
  }

loadUsers() {
  const data = localStorage.getItem('users');
  this.users = data ? JSON.parse(data) : [];
}

saveUsers() {
  localStorage.setItem('users', JSON.stringify(this.users));
}
 submit() {
  if (this.userForm.invalid) return;

  const userData = {
    name: this.userForm.value.name,
    email: this.userForm.value.email,
    address: {
      state: this.userForm.value.address.state,
      city: this.userForm.value.address.city,
      pincode: this.userForm.value.address.pincode
    }
  };

  if (this.getdata >= 0) {
    this.users[this.getdata] = userData;
    this.getdata = -1;
  } else {
    this.users.push(userData); 
  }

  this.saveUsers();
  this.userForm.reset();
}


  editUser(index: number) {
    this.getdata = index;
    this.userForm.setValue({
      name: this.users[index].name,
      email: this.users[index].email,
       address: {
      state: this.users[index].address.state,
      city: this.users[index].address.city,
      pincode: this.users[index].address.pincode
    }
    });
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
  }
}
