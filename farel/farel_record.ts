export interface FarelRecordConstructor<T extends FarelRecordAttr> {
  new (snapshot: FirebaseDataSnapshot): T;
}

export interface FarelRecordAttr {
  $snapshot: FirebaseDataSnapshot;
  $ref: Firebase;
  $key: string;
  $val: any;
}

export class FarelRecord implements FarelRecordAttr {
  $val: any;

  constructor(public $snapshot: FirebaseDataSnapshot) {
    let val = this.$snapshot.val();

    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      this.$val = val;
    } else {
      Object.keys(val).forEach(key => this[key] = val[key]);
    }
  }

  get $ref(): Firebase {
    return this.$snapshot.ref();
  }

  get $key(): string {
    return this.$snapshot.key();
  }
}

export function FarelRecordFactory<T extends FarelRecordAttr>(): FarelRecordConstructor<T> {
  return <FarelRecordConstructor<T>>FarelRecord;
}
