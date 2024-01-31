import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  startDate: Date;
  endDate: Date;
  weeks: Date[][] = [];

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 20);
    this.generateCalendar();
  }

  generateCalendar() {
    const currentDate = new Date(this.startDate);
    while (currentDate <= this.endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 5; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }
}