import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UuidServiceService {

  getuuid() : string{
      return crypto.randomUUID()
  }


  
  snackbar(msg: string) {
    return this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }
  constructor(private _snackBar: MatSnackBar) { }
}