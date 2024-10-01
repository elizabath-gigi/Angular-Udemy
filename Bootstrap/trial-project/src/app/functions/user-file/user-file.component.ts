import { APP_CONSTANTS } from './../../shared/constants';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FunctionsService } from '../functions.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent {
  message!: string;
  form: FormGroup;
  file: File | null = null;
  uploadProgress: number | null = null;
  @Output() close =new EventEmitter<void>()
  constructor(private functionsService: FunctionsService,private toastr:ToastrService) {
    this.form = new FormGroup({
      file: new FormControl(null, Validators.required)
    });
  }
  closeDialog() {
    this.close.emit();
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
        next: () => {
          this.toastr.success(APP_CONSTANTS.upload_success);
          console.log(APP_CONSTANTS.upload_success)
          this.closeDialog();
        },
        error: (error) => {
          console.error(`Error from server: `, error);
          console.log(APP_CONSTANTS.upload_error)
          const errorMessage = error.error;
          this.toastr.error(APP_CONSTANTS.upload_error);
        }
      });
    }
  }
  
}