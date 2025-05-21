import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DragDropDirective } from '../../shared/directives/drag-drop.directive';
import { RegisterService } from './services/register.service';
import { FadeInOut } from '../../shared/animations/animations';

@Component({
  selector: 'ecom-register',
  imports: [CommonModule, ReactiveFormsModule, DragDropDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [FadeInOut(200, 300, true)]
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder)
  showPassword = false
  showConfirmPassword = false
  errorMessage = ""
  imagePreview: string | ArrayBuffer | null = null
  formRegister = this.formBuilder.group(
    {
      'username': ['zakaria', [Validators.required, Validators.minLength(4)]],
      'password': ['zakaria', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['zakaria', [Validators.required]],
      'firstName': [''],
      'lastName': ['']
    },
    {
      validators: this.passwordMatchValidator
    }
  )
  registerService = inject(RegisterService)
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

  handleFiles(files: FileList | File[]): void{
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if(input.files && input.files.length > 0) {
      this.handleFiles(Array.from (input.files));
    }
  }

  onSave() {
    if(this.formRegister.valid) {
      const {confirmPassword, ...user} = this.formRegister.value
      this.registerService.saveUser(user).subscribe(data => {
        if(data.status ===200) {

        }
        else {
          this.errorMessage = data.message
        }
        console.log(data)
      })

    }
  }

}
