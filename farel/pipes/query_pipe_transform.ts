export interface QueryPipeTransform {
  transform(firebaseQuery: string, args: any[]): FirebaseQuery;
  transform(firebaseQuery: FirebaseQuery, args: any[]): FirebaseQuery;
}
