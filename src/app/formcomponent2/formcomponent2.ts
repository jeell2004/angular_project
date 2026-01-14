import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formcomponent2',
  imports: [ReactiveFormsModule],
  templateUrl: './formcomponent2.html',
  styleUrl: './formcomponent2.css',
})
export class Formcomponent2 {
   userForm!: FormGroup;
private formbuilder = inject(FormBuilder)
users: any[] = [];

  ngOnInit() {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  submit() {
    localStorage.setItem('user', JSON.stringify(this.userForm.value));
    console.log(this.userForm.value);
    this.users.push(this.userForm.value);
  }
editUser(index: number) {}
deleteUser(index: number) {}
}
