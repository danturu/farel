import * as Firebase from 'firebase'

export const toFirebase = (url: string | Firebase): Firebase => {
  if (typeof url === 'string') {
    return new Firebase(url);
  } else {
    return url;
  }
}
