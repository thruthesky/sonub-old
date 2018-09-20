import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PhilGoApiService, ApiPost } from '../../philgo-api/philgo-api.service';
import { DialogComponent } from './dialog/dialog.component';
import { PromptComponent } from './prompt/prompt.component';

@Injectable()
export class ComponentService {

  constructor(
    private readonly philgo: PhilGoApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }


  async alert(options: AlertOptions) {
    if (!options) {
      return;
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      header: 'Delete Post #' . post.idx,
      message: 'Are you sure you want to delete this post?',
      yes: this.philgo.t({ en: 'Yes', ko: '확인' }),
      no: this.philgo.t({ en: 'Cancel', ko: '취소' }),
      type: 'alert'
    });
    const re = await dialogRef.afterClosed().toPromise().then( result => result );
  }


  alertBar(options: { message: string , action: string }) {
    if (!options) {
      return;
    }

    if (!options.action) {
      options.action = this.philgo.t({ en: 'OK', ko: '확인' });
    }

    this.snackBar.open( options.message, options.action, {
      duration: 3000
    });

  }

  async checkPostUserPassword(post: ApiPost): Promise<string> {

    const dialogRef = this.dialog.open(PromptComponent, {
        header: this.philgo.t({ en: 'Password', ko: '비밀번호' }),
        message: this.philgo.t({ en: 'Please input password!', ko: '비밀번호를 입력하세요.' }),
        ok: this.philgo.t({ en: 'Ok', ko: '확인' }),
        no: this.philgo.t({ en: 'Cancel', ko: '취소' })
    });

    const re = await dialogRef.afterClosed().toPromise().then( result => result );
    console.log('result: ', re, re.data, re.role);
    if (re.role && re.role === 'ok') {
      if ( re.role && re.input ) {
        return await this.philgo.postCheckPassword({ idx: post.idx, user_password: re.data.values.user_password }).toPromise()
          .then(res => res['user_password'])
          .catch(() => {
            this.alert({ message: this.philgo.t({ en: 'You have input wrong password.', ko: '비밀번호가 틀립니다.' }) });
            return '';
          });
      } else {
        this.alert({ message: this.philgo.t({ en: 'Please input password', ko: '비밀번호를 입력하세요.' }) });
      }
    }
    return '';
  }

  async deletePostWithMemberLogin(post: ApiPost) {

    const dialogRef = this.dialog.open(DialogComponent, {
        header: 'Delete Post #' . post.idx,
        message: 'Are you sure you want to delete this post?',
        yes: this.philgo.t({ en: 'Yes', ko: '확인' }),
        no: this.philgo.t({ en: 'Cancel', ko: '취소' }),
        type: 'confirm'
    });

    const re = await dialogRef.afterClosed().toPromise().then( result => result );

    if (re.role === 'yes') {
      return await this.philgo.postDelete({ idx: post.idx }).toPromise().then(res => {
        console.log('delete success: ', res);
        post.subject = this.philgo.textDeleted();
        post.content = this.philgo.textDeleted();
        return 'success';
      }).catch(async e => {
        this.alert(e);
        return 'failed';
      });
    } else {
      return 'failed';
    }
  }

  async deletePostWithPassword(post: ApiPost) {

    const dialogRef = this.dialog.open(PromptComponent, {
      header: this.philgo.t({ en: 'Password', ko: '비밀번호' }),
      message: this.philgo.t({ en: 'Please input password!', ko: '비밀번호를 입력하세요.' }),
      ok: this.philgo.t({ en: 'Ok', ko: '확인' }),
      no: this.philgo.t({ en: 'Cancel', ko: '취소' }),
    });

    const re = await dialogRef.afterClosed().toPromise().then( result => result );

    if (re.role === 'ok') {
      return await this.philgo.postDelete({ idx: post.idx, user_password: re.data.values['user_password'] }).toPromise()
        .then(res => {
          console.log('delete success: ', res);
          post.subject = this.philgo.textDeleted();
          post.content = this.philgo.textDeleted();
          return 'success';
        }).catch(async e => {
          this.alert({
            message: this.philgo.t({ en: `Failed to delete: #reason`, ko: '글 삭제 실패: #reason' }, { reason: e.message })
          });
          return 'failed';
        });
    } else {
      return 'failed';
    }
  }

}
