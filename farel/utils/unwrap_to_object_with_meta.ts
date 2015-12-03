export function unwrapToObjectWithMeta(snapshot: FirebaseDataSnapshot): any {
  if (!snapshot || !snapshot.exists()) {
    return null;
  }

  let key = snapshot.key();
  let val = snapshot.val();
  let ref = snapshot.ref();

  if (typeof val === 'object' && !Array.isArray(val)) {
    val.$key = key;
    val.$ref = ref;

    return val;
  } else {
    return { $value: val, $key: key, $ref: ref };
  }
}
