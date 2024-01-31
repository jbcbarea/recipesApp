import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL = 'http://localhost:3000';
 //private API_URL = 'http://192.168.1.135:3000';
  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.API_URL}/upload`, formData);
  }

/*   ----------- CON CAPACITOR PARA EL MÓVIL CON ANDROID VALE?? --------------------

Para permitir que un usuario cargue una foto desde su dispositivo móvil (ya sea desde la galería o tomando una foto con la cámara), puedes utilizar Capacitor, una librería que se integra con Ionic y permite acceder a las funcionalidades nativas de los dispositivos.

A continuación te muestro cómo implementar la funcionalidad para subir una foto con Ionic y Capacitor.

Instalar Capacitor:
Asegúrate de haber instalado Capacitor en tu proyecto de Ionic si no lo has hecho aún. Puedes instalarlo con el siguiente comando:

bash
Copy code
npm install @capacitor/core @capacitor/camera @capacitor/filesystem
Agregar los permisos:
Asegúrate de haber agregado los permisos necesarios en el archivo AndroidManifest.xml para acceder a la cámara y almacenamiento. Para la cámara, necesitarás el permiso CAMERA y para el almacenamiento, READ_EXTERNAL_STORAGE y WRITE_EXTERNAL_STORAGE.


  async takePictureFromCamera() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<any>('http://tu-servidor/upload', formData);
  }

  async takePictureFromGallery() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<any>('http://tu-servidor/upload', formData);
  }

  **********************  MULTER PARA SUBIR LAS IMÁGENES *********************************

  Claro, a continuación se muestra cómo puedes integrar la carga de archivos utilizando Multer con Express y cómo podrías relacionar esta funcionalidad con el servicio de recetas.

Paso 1: Configuración de Multer en el servidor con Express
El código que proporcionaste configura Multer para manejar la carga de archivos en una ruta específica (/images/img). Asegúrate de crear una carpeta uploads en el directorio del servidor para almacenar las imágenes subidas.

javascript
Copy code
const express = require('express');
const multer = require('multer');
const app = express();

// Configuración de multer para almacenar las imágenes subidas
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio de almacenamiento
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre del archivo en el directorio
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  // Manejar la lógica de subida de archivos aquí
  res.send('Archivo subido exitosamente');
});

app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});
Paso 2: Integración con el servicio de recetas en tu servidor
Para vincular la lógica de carga de archivos con el servicio de recetas, podrías tener una ruta específica para subir imágenes relacionadas con las recetas.

javascript
Copy code
const express = require('express');
const multer = require('multer');
const app = express();

// Configuración de multer para almacenar las imágenes subidas
// (código de configuración de multer...)

const upload = multer({ storage: storage });

// Ruta para subir archivos relacionados con recetas
app.post('/recipes/uploadImage', upload.single('file'), (req, res) => {
  // Lógica para asociar la imagen a una receta y guardar su referencia en la base de datos
  const imageUrl = `http://tu-servidor/uploads/${req.file.originalname}`;
  // Guardar la 'imageUrl' en la base de datos o en el modelo de recetas
  res.send('Imagen de receta subida exitosamente');
});

// Otras rutas de recetas (código de tus rutas de recetas...)

app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});
En la ruta /recipes/uploadImage, puedes definir la lógica específica para guardar la URL de la imagen asociada a una receta en tu base de datos o modelo de recetas.

Estos pasos te permitirán configurar Multer para manejar la carga de imágenes y luego asociar esa funcionalidad con la lógica de tu servicio de recetas en Express.
  */
}
