import * as Firebase from 'firebase'

import { ToArrayPipe } from '../../src/to_array_pipe'

export function main(FIREBASE_URL: string) {
  describe('ToArrayPipe', () => {
    var firebase: Firebase;
    var pipe: ToArrayPipe;

    beforeEach(() => {
      firebase = new Firebase(FIREBASE_URL);
      pipe = new ToArrayPipe();
    });

    it('should return null when given null', () => {
      expect(pipe.transform(null)).toBe(null);
    });

    it("should return null when snapshot hasn't any children", done => {
      firebase.child('dinosaurs/tyrannosaurus').once('value', snapshot => {
        expect(pipe.transform(snapshot)).toBe(null);
        done();
      });
    });

    it("should return null when snapshot's key doesn't exist", done => {
      firebase.child('birds').once('value', snapshot => {
        expect(pipe.transform(snapshot)).toBe(null);
        done();
      });
    });

    it("should return an ordered array with assigned meta", () => {
      firebase.child('scores').orderByValue().once('value', snapshot => {
        let dinosaursByScore = [
          { $value: 5, $key: 'stegosaurus' },
          { $value: 21, $key: 'lambeosaurus' },
          { $value: 22, $key: 'triceratops' },
          { $value: 55, $key: 'bruhathkayosaurus' },
          { $value: 80, $key: 'linhenykus' },
          { $value: 93, $key: 'pterodactyl' }
        ];

        expect(pipe.transform(snapshot).map(child => Object.assign({}, child))).toEqual(dinosaursByScore);
      });
    });
  });
}
