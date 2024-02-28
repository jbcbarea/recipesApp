// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public mensaje: string;

  constructor() { }
}
