export interface FarelRecordConstructor<T extends FarelRecordAttr> {
  new (snapshot: FirebaseDataSnapshot): T;
}

export interface FarelRecordAttr {
  $snapshot: FirebaseDataSnapshot; $ref: Firebase; $key: string; $val: any;
}

export class FarelRecord implements FarelRecordAttr {
  $ref: Firebase; $key: string; $val: any;

  constructor(public $snapshot: FirebaseDataSnapshot) {
    let val = this.$snapshot.val();

    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      this.$val = val;
    } else {
      Object.keys(val).forEach(key => this[key] = val[key]);
    }

    this.$key = this.$snapshot.key();
    this.$ref = this.$snapshot.ref();
  }
}

export function FarelRecordFactory<T extends FarelRecordAttr>(): FarelRecordConstructor<T> {
  return <FarelRecordConstructor<T>>FarelRecord;
}
