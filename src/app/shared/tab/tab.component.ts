import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @Input()
  assigned$!: Task[] | null;

  @Input()
  completed$!: Task[] | null;

  @Input()
  failed$!: Task[] | null;

  constructor() {}

  ngOnInit(): void {}
}
