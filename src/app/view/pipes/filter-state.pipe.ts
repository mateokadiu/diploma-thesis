import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Pipe({
  name: 'filterState',
})
export class FilterStatePipe implements PipeTransform {
  transform(value: any, state: any) {
    return value.filter((task: Task) => task.to === state);
  }
}
