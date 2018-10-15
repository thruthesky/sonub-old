import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { AlertData, ConfirmData } from './dialog-interfaces';


@Injectable()
export class DialogService {

    constructor(
        public dialog: MatDialog
    ) {


    }

    sanitizeData( data: any ) {
      const sanitize: MatDialogConfig = {};

      if ( data['width'] ) {
        sanitize.width = data.width;
      }
      if ( data['height'] ) {
        sanitize.height = data.height;
      }

      if ( data['minHeight'] ) {
        sanitize.minHeight = data.minHeight;
      }

      if ( ! data.maxWidth ) {
        sanitize.maxWidth = '800px';
      } else {
        sanitize.maxWidth = data.maxWidth;
      }
      sanitize.data = data;

      return sanitize;
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
        const sanitize = this.sanitizeData(data);
        const dialogRef = await this.dialog.open(DialogComponent, sanitize);
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
          data.yes = 'Yes';
        }
        if (!data.no) {
          data.no = 'No';
        }
        const sanitize = this.sanitizeData(data);
        const dialogRef = await this.dialog.open(DialogComponent, sanitize);
        return dialogRef.afterClosed().toPromise();
    }


    // async preview(): Promise<boolean> {
    //   const dialogRef = await this.dialog.open(DialogComponent, sanitize);
    //   return dialogRef.afterClosed().toPromise();
    // }
}
