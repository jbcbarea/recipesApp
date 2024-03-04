import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent  implements OnInit {

  query:string;
  @Input() recipes:any[];
  @ViewChild('searchInput') sInput;
//Tiparlo al model de recetas!
  @Output() recipesFoundEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public onSearchChange(event): void {
    this.query = event.detail.value.toLowerCase();
    this.recipesFoundEvent.emit(this.query);
  }
}
