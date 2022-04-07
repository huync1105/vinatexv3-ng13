import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ScrollPanel } from 'primeng/scrollpanel';
import {FileUpload} from 'primeng/fileupload';

interface Comment {
  id: number,
  userId: number,
  userName: string,
  userImg: string,
  message: string,
  time: number,
  uploadFiles?: any[],
  fileName?: string,
  fileUrl?: string
}

@Component({
  selector: 'app-trao-doi',
  templateUrl: './trao-doi.component.html',
  styleUrls: ['./trao-doi.component.css']
})
export class TraoDoiComponent implements OnInit {

  @ViewChild('panel') panel:ScrollPanel;
  @ViewChild('fileUpload') fileUpload: FileUpload;

  listComment: Comment[] = [];
  newListComment?: Comment;
  currentUserId?: number;
  currentUserName?: string;
  currentUserImg?: string;
  message?: string

  uploadedFiles?: any[];

  constructor() { 
    this.listComment = [
      {
        id: 1,
        userId: 1,
        userName: 'Nguyen Cong Huy',
        userImg: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione blanditiis eos at voluptatem vel repudiandae excepturi exercitationem, maxime quos architecto.',
        time: 1646712925000,
      },
      {
        id: 2,
        userId: 2,
        userName: 'Bao Nam',
        userImg: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione blanditiis eos at voluptatem vel repudiandae excepturi exercitationem, maxime quos architecto.',
        time: 1646712925000,
      },
      {
        id: 3,
        userId: 3,
        userName: 'Nguyen Van A',
        userImg: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione blanditiis eos at voluptatem vel repudiandae excepturi exercitationem, maxime quos architecto.',
        time: 1646712925000,
      },
      {
        id: 4,
        userId: 4,
        userName: 'Nguyen Van B',
        userImg: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione blanditiis eos at voluptatem vel repudiandae excepturi exercitationem, maxime quos architecto.',
        time: 1646712925000,
      },
    ]
    this.currentUserId = 2;
    this.currentUserName = 'Bao An'
    this.currentUserImg = 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg'
  }

  ngOnInit(): void {
    
  }

  addNewMessage() {
    if (this.message) {
      if(this.message.trim()!=='') {
        this.newListComment = {
          id: this.listComment.length,
          userId: this.currentUserId,
          userName: this.currentUserName,
          userImg: this.currentUserImg,
          message: this.message,
          time: new Date().valueOf(),
          uploadFiles: this.uploadedFiles
        }
        this.listComment.push(this.newListComment);
      }
    } else if (this.uploadedFiles) {
      this.newListComment = {
        id: this.listComment.length,
        userId: this.currentUserId,
        userName: this.currentUserName,
        userImg: this.currentUserImg,
        message: '',
        time: new Date().valueOf(),
        uploadFiles: this.uploadedFiles
      }
      this.listComment.push(this.newListComment);
    }
    setTimeout(() => {
      this.panel.scrollTop(10000)
      this.uploadedFiles = undefined;
    },200)
    this.message = ''
  }

  myuploader(event) {
    this.uploadedFiles = event.files;
    this.fileUpload.clear()
    console.log(this.uploadedFiles);
  }

  deleteUploadedFile(name: string) {
    let index = this.uploadedFiles.findIndex(file => file.name === name);
    this.uploadedFiles.splice(index, 1);
    if (this.uploadedFiles.length === 0) {
      this.uploadedFiles = undefined;
    }
  }



}
