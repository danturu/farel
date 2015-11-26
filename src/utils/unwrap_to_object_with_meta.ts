export function unwrapToObjectWithMeta(snapshot: FirebaseDataSnapshot): any {
  if (!snapshot || !snapshot.exists()) {
    return null;
  }

  let key = snapshot.key();
  let val = snapshot.val();

  if (typeof val === 'object' && !Array.isArray(val)) {
    return Object.assign(val, { $key: key });
  } else {
    return { $value: val, $key: key };
  }
}
