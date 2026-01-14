import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.loadUsers();
  }

  loadUsers() {
    var data = localStorage.getItem('users');
    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = [];
    }
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    var userData = {
      name: this.userForm.value.name,
      email: this.userForm.value.email
    };

    if (this.getdata >= 0) {
      this.users[this.getdata].name = userData.name;
      this.users[this.getdata].email = userData.email;
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
      email: this.users[index].email
    });
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
  }
}
