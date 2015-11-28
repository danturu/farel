export function unwrapToObjectWithMeta(snapshot: FirebaseDataSnapshot): any {
  if (!snapshot || !snapshot.exists()) {
    return null;
  }

  let key = snapshot.key();
  let val = snapshot.val();
  let ref = snapshot.ref();

  if (typeof val === 'object' && !Array.isArray(val)) {
    return Object.assign(val, { $key: key, $ref: ref });
  } else {
    return { $value: val, $key: key, $ref: ref };
  }
}
