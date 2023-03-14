import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs.operators';
import { UploadFileService } from '../upload-file.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {
  private readonly API = 'http://localhost:4200/';
 files?: Set<File>;
 progress = 0;
 constructor(private service: UploadFileService) { }

 onChange(event: any) {
  // console.log(event);

  const selectedFiles = <FileList>event.srcElement.files;

  const fileNames = [];
  this.files = new Set();

  for (let i = 0; i < selectedFiles.length; i++) {
    fileNames.push(selectedFiles[i].name);
    this.files.add(selectedFiles[i]);


  }
  this.progress = 0;

}

onDownloadExcel() {
  this.service.download( this.API + 'api/downloadExcel')
  .subscribe((res: any) => {
    this.service.handleFile(res, 'report.xlsx');
  });
}

onDownloadPDF() {
  this.service.download( this.API + 'api/downloadPDF')
  .subscribe((res: any) => {
    this.service.handleFile(res, 'report.pdf');
  });
}

  onUpload(){
    if (this.files && this.files.size > 0) {
      console.log(" this.files 1 ", this.files);

      this.service.upload(this.files, this.API + 'api/upload')
        .pipe(
          uploadProgress(progress => {
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => {

          console.log('Upload ConcluídoS ', response)
        });
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload Concluído');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     // console.log('Progresso', percentDone);
        //     this.progress = percentDone;
        //   }
        // } );
    }
  }

}
