/*
import { Component, EventEmitter, Output, Inject, PLATFORM_ID, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { isPlatformBrowser } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File = null;
  imageUrl: string | ArrayBuffer = null;
  uploadAttempted: boolean = false;
  uploadAttemptSuccess:boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() resetInputFile: boolean = false; 
  @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>;


  constructor(
    private fileUploadService: FileUploadService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnChanges() {
    // Este método se ejecuta cuando cambia una entrada, como resetInput
    if (this.resetInputFile) {
      this.resetFileInput();
    }
  }

  private resetFileInput() {
    this.selectedFile = null;
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.uploadAttempted = false;
    this.uploadAttemptSuccess = false;
    this.resetInputFile = false; 
  }

  public async isMobile(): Promise<boolean>{

    const infoDevice= Device.getInfo();
    console.log((await infoDevice).platform);

    if((await infoDevice).platform !== 'web') {
      return true;
    }else {
      return false;
    }
    //console.log(App.getInfo());
  }


  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    // Mostrar la imagen localmente
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async upload() {
    this.uploadAttempted = true;
    if (!this.selectedFile) {
      console.error('No se ha seleccionado un archivo.');
      return;
    }

    const fileData = await this.readFile(this.selectedFile);
    const formData = new FormData();
    formData.append('image', fileData);
    
    this.fileUploadService.uploadFile(formData).subscribe(
      (response) => {
        this.uploadAttemptSuccess = true;
        console.log('Archivo subido exitosamente:', response);
        this.fileUploaded.emit(response.filename.originalname);
       
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        // Manejar errores
      }
    );
  }
  
  private async readFile(file: File): Promise<Blob> {
    if (isPlatformBrowser(this.platformId)) {
      // Estamos en un entorno de navegador
      return file;
    } else if (Capacitor.isNative) {
      // Estamos en un entorno nativo, lee el archivo usando el complemento Filesystem de Capacitor
      const fileData = await Filesystem['readFile']({
        path: file.name,
      });
      return new Blob([fileData.data], { type: file.type });
    } else {
      // Otro caso (por ejemplo, entorno de servidor), devuelve el archivo sin procesar
      return file;
    }
}
}
*/
import { Component, EventEmitter, Output, Inject, PLATFORM_ID, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { isPlatformBrowser } from '@angular/common';
import { Capacitor, Plugins} from '@capacitor/core';
import { CameraResultType, CameraSource,Camera } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File = null;
  imageUrl: string | ArrayBuffer = null;
  uploadAttempted: boolean = false;
  uploadAttemptSuccess: boolean = false;
  isMobileVariable:boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() resetInputFile: boolean = false;
  @Input() showError:boolean;
  @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>;

  constructor(
    private fileUploadService: FileUploadService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

 async ngOnInit():Promise<void> {
this.isMobileVariable = await this.isMobile();
  }


  ngOnChanges() {
    // Este método se ejecuta cuando cambia una entrada, como resetInput
    if (this.resetInputFile) {
      this.resetFileInput();
    }
  }

  private resetFileInput() {
    this.selectedFile = null;
    this.imageUrl = null;
    this.fileInput.nativeElement.value = '';
    this.uploadAttempted = false;
    this.uploadAttemptSuccess = false;
    this.resetInputFile = false;
  }

  public async isMobile(): Promise<boolean> {
    const infoDevice = await Device.getInfo();
    return infoDevice.platform !== 'web';
  }

  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Mostrar la imagen localmente
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    this.selectedFile = await this.convertUriToFile(image.webPath);
    this.imageUrl = image.webPath;
  }

  async convertUriToFile(uri: string): Promise<File> {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new File([blob], 'captured-image.jpeg', { type: 'image/jpeg' });
  }

  async upload() {

    this.uploadAttempted = true;
    if (!this.selectedFile) {
      console.error('No se ha seleccionado un archivo.');
      return;
    }

    const fileData = await this.readFile(this.selectedFile);
    const formData = new FormData();
    formData.append('image', fileData);

    this.fileUploadService.uploadFile(formData).subscribe(
      (response) => {
        this.uploadAttemptSuccess = true;
        this.fileUploaded.emit(response.filename.originalname);
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        // Manejar errores
      }
    );
  }

  private async readFile(file: File): Promise<Blob> {
    if (isPlatformBrowser(this.platformId)) {
      return file;
    } else if (Capacitor.isNative) {
      const fileData = await Filesystem.readFile({
        path: file.name,
      });
      return new Blob([fileData.data], { type: file.type });
    } else {
      return file;
    }
  }
}
