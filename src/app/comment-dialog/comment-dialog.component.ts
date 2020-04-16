import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  form: FormGroup;
  content: string;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<CommentDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.content = data != null ? data.content : '';
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: this.content
    });
  }

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  onClose() {
    this.dialogRef.close();
  }

}
