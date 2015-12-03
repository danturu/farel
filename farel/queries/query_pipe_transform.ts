export interface QueryPipeTransform {
  transform(firebaseRef: string, args: any[]): FirebaseQuery;
  transform(firebaseRef: FirebaseQuery, args: any[]): FirebaseQuery;
}
