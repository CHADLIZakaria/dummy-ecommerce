import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DragDropDirective } from '../../shared/directives/drag-drop.directive';

@Component({
  selector: 'ecom-register',
  imports: [CommonModule, ReactiveFormsModule, DragDropDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder)
  showPassword = false
  showConfirmPassword = false
  errorMessage = ""
  imagePreview: string | ArrayBuffer | null = null
  formRegister = this.formBuilder.group(
    {
      'username': ['', [Validators.required, Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', [Validators.required]],
      'firstName': [''],
      'lastName': ['']
    },
    {
      validators: this.passwordMatchValidator
    }
  )

  register() {
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value
    const confirmPassword = form.get('confirmPassword')?.value
    return password===confirmPassword ? null : {passwordMismatch: true}
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  handleFiles(files: FileList | File[]) {
    console.log(event)
    const file = Array.isArray(files) ? files[0] : files.item(0)
    if(file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(file)
    }
    else {
      this.imagePreview = null
    }
  }

}
