export interface FarelRecordConstructor<T extends FarelRecord> {
  new (snapshot: FirebaseDataSnapshot): T;
}

export class FarelRecord {
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
