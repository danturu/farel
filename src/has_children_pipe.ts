import { Pipe, PipeTransform } from 'angular2/angular2'

@Pipe({
  name: 'hasChildren',
})

export class HasChildrenPipe implements PipeTransform {
  transform(snapshot: FirebaseDataSnapshot, args: string[] = []): boolean {
    if (!snapshot) {
      return false;
    } else {
      return snapshot.hasChildren();
    }
  }
}
