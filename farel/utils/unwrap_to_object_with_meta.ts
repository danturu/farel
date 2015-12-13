export function unwrapToObjectWithMeta(snapshot: FirebaseDataSnapshot): any {
  let key = snapshot.key();
  let ref = snapshot.ref();
  let val = snapshot.val();

  if (val === null || typeof val !== 'object' || Array.isArray(val)) {
    val = { $value: val };
  }

  val.$key = key;
  val.$ref = ref;

  return val;
}
