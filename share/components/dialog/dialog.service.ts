import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { AlertData, ConfirmData } from './dialog-interfaces';


@Injectable()
export class DialogService {

    constructor(
        public dialog: MatDialog
    ) {


    }
    /**
     * Alerts a dialog
     * @param data alert data
     * @example
        const data: AlertData = <any>{};
        data.content = 'Oo.. this is content';
        this.a.alert(data);
     */
    async alert(data: AlertData): Promise<void> {
        if (!data.ok) {
            data.ok = 'OK';
        }
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: data
        });

        return dialogRef.afterClosed().toPromise();
    }

    /**
     * Return true if yes clicked. or false on 'No' clicked.
     * @param data data to confirm
     * @example
        const data: ConfirmData = <any>{};
        data.title = 'Push Message',
        data.content = 'You got a push message. Move to the url?';
        this.a.confirm(data).then( re => console.log('then: ', re));
     */
    async confirm(data: ConfirmData): Promise<boolean> {
        if (!data.yes) {
            data.yes = 'YES';
        }if (!data.no) {
            data.no = 'NO';
        }
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: data
        });

        return dialogRef.afterClosed().toPromise();
    }
}
