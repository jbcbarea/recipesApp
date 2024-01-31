import { Component, OnInit } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent extends AbstractQuestionComponent implements OnInit {

    title!: string;
  content!: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.setContent();
  }

  setContent(): void {
        if (this.question.label) {
          this.title = (this.question.label);
        }
        if (this.question.info) {
          this.content = (this.question.info);
        }
      }
}
