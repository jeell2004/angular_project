import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formcomponent',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './formcomponent.html',
  styleUrl: './formcomponent.css',
})
export class Formcomponent {userForm!: FormGroup;
  users: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadUsers();
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

    if (this.editIndex !== null) {
      this.users[this.editIndex] = {
        ...this.users[this.editIndex],
        ...this.userForm.value,
      };
      this.editIndex = null;
    } else {
      this.users.push({
        id: Date.now(),
        ...this.userForm.value,
      });
    }

    this.saveUsers();
    this.userForm.reset();
  }

  editUser(index: number) {
    this.editIndex = index;
    this.userForm.patchValue(this.users[index]);
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
  }

}
