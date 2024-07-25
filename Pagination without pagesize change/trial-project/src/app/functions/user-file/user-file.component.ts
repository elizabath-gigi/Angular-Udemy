import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent {
  message!:string;
  form: FormGroup;
  file: File | null = null;
  uploadProgress: number | null = null;

  constructor(private functionsService: FunctionsService) {
    this.form = new FormGroup({
      file: new FormControl(null, Validators.required)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
      this.form.patchValue({ file: this.file });
    }
  }

  onSubmit(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.functionsService.bulkUpload(formData).subscribe({
        next: response => console.log('Upload successful', response),
        error: error => console.error('Upload error', error)
        });
        this.message="Updated Successfully";
    }
  }
}