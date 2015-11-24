import { Pipe, PipeTransform } from 'angular2/angular2'

@Pipe({
  name: 'numChildren',
})

export class NumChildrenPipe implements PipeTransform {
  transform(snapshot: FirebaseDataSnapshot, args: string[] = []): number {
    if (!snapshot) {
      return 0;
    } else {
      return snapshot.numChildren();
    }
  }
}
