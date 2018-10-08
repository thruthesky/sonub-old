import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { AlertData } from './dialog-interfaces';


@Injectable()
export class DialogService {

    constructor(
        public dialog: MatDialog
    ) {

    }
    alert(data: AlertData): void {
        if ( ! data.ok ) {
            data.ok = 'OK';
        }
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed with: ', result);
        });
    }

}
