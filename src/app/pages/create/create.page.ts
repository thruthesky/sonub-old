import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgSimpleEditorComponent } from 'ng-simple-editor';
import { PhilGoApiService, ApiPost } from '../../modules/philgo-api/philgo-api.service';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { AppService } from '../../services/app.service';


@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    @ViewChild('editor') editor: NgSimpleEditorComponent;
    form: ApiPost = <ApiPost>{
        post_id: 'blog',
        gid: _.randomString(19, this.philgo.myIdx())
    };

    forums = {
        blog: 'My Blog',
        qna: 'QnA',
        buyandsell: 'Buy & Sell',
        wanted: 'Jobs',
        party: 'Gatherings',
        rentcar: 'Car Rent',
        hotel: 'Hotel/House',
        real_estate: 'Sell House'
    };



    percentage = 0;
    isWeb = _.isWeb();
    isCordova = _.isCordova();

    /**
     * Subject will be updated from content only if it is not touched by user.
     */
    subjectChanged = false;
    constructor(
        private alertController: AlertController,
        private camera: Camera,
        public a: AppService,
        public philgo: PhilGoApiService
    ) { }

    ngOnInit() {

    }

    onChangeForum(event: Event) {
        this.form.post_id = (<Select><any>event.target).value;
    }


    onSubmit() {

        /**
         * Create
         */
        if (!this.form.post_id) {
            // this.a.toast({code: -1, message: `Please choose where to 'post on'`});
            // this.form.post_id = this.defaultPostId;
        }
        this.form.content = this.editor.content;
        this.philgo.postCreate(this.form).subscribe(res => {
            console.log('create res: ', res);
            this.a.updateFrontPage();
            this.a.openHome();
        }, e => {
            this.a.toast(e);
        });
    }


    onChangeContent(event: Event) {
        if (!this.subjectChanged) {
            let str = this.a._.stripTags(this.editor.content);
            str = this.a._.htmlDecode(str).trim();
            this.form.subject = str.substr(0, 30);
        }
    }

    onSubjectKeyUp() {
        this.subjectChanged = true;
        console.log('working?');
    }



    onChangeFile(event: Event) {
        this.uploadFile(<any>event.target['files']);
    }

    async onClickCordovaFileUploadButton() {

        /**
         * Ask first
         */
        const alert = await this.alertController.create({
            header: this.philgo.t({ ko: '사진', en: 'Photo' }),
            subHeader: this.philgo.t({ ko: '사진 전송을 업로드합니다.', en: 'Uploading a photo.' }),
            message: this.philgo.t({
                ko: '카메라로 사진을 찍거나 갤러리에서 사진을 선택하세요.',
                en: 'Please take a photo from Camera or choose one from Gallery.'
            }),
            buttons: [
                { role: 'camera', text: this.philgo.t({ ko: '카메라로 사진 찍기', en: 'Take a photo using Camera' }) },
                { role: 'gallery', text: this.philgo.t({ ko: '갤러리에서 선택하기', en: 'Select a photo from Gallery' }) },
                { role: 'cancel', text: this.philgo.t({ ko: '취소', en: 'Cancel' }) }
            ]
        });


        await alert.present();
        const re = await alert.onDidDismiss();
        if (re.role === 'cancel') {
            return;
        }


        /**
         * This is camera settings.
         */
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        if (re.role === 'gallery') {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        }


        /**
         * Take photo
         * Get base64 data of photo.
         *
         * 문제의 핵심은 Cordova Camera 로 받은 base64 데이터를 어떻게 <input type='file'> 과 같은 FileList 형의 데이터를 가져오는 것인가이다.
         * FileList 로 값을 가져오면 그냥 HTML 의 <input type='file'> 과 똑 같은 코드로 Angular 로 업로드하면 되기 때문이다.
         */
        const base64 = await this.camera.getPicture(options).then((imageData) => {
            return imageData;
        }, (e) => {
            // console.log('Camera/Gallery cancelled');
            return '';
        });

        if (!base64) {
            // console.log('No data path or base64. just return');
            return;
        }


        /**
         * Convert and upload
         *
         * File 와 FileList 타입의 변수를 만든다.
         * 그리고 그냥 일반 HTML FORM <input type='file'> 에서 파일 정보를 받아 업로드하는 것과 똑 같이 하면 된다.
         */
        const blob = _.base64toBlob(base64);
        const name = _.dateString() + '-' + _.randomString(8) + '.jpg';
        const file = new File([blob], name, { type: 'image/jpeg' });
        const files: FileList = <any>[file];

        this.uploadFile(files);
    }

    uploadFile(files: FileList) {

        console.log('files: ', files);
        if (files === void 0 || !files.length || files[0] === void 0) {
            const e = { code: -1, message: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
            // this.componentService.alert(e);
            return;
        }

        this.philgo.fileUpload(files, { gid: this.form.gid, user_password: this.form.user_password }).subscribe(res => {
            if (typeof res === 'number') {
                console.log('percentage: ', res);
                this.percentage = res;
            } else {
                console.log('file upload success: ', res);
                if (!this.form.files || !this.form.files.length) {
                    this.form.files = [];
                }
                this.form.files.push(res);
                this.editor.insertImage( res.src, res.name, res.idx );
                this.percentage = 0;
            }
        }, e => {
            console.error(e);
            this.percentage = 0;
            this.a.toast(e);
        });
    }
}

