import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrl: './stock-dialog.component.css'
})
export class StockDialogComponent {
  productInStock: any;

  constructor(
    public dialogRef: MatDialogRef<StockDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.productInStock = { ...data.productInStock };
    }

  onSave(): void {
    console.log('this.productInStock ==> ' + this.productInStock)
    this.dialogRef.close(this.productInStock);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
