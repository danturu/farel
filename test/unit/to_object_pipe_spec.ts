import * as Firebase from 'firebase'

import { ToObjectPipe } from '../../src/to_object_pipe'

export function main(FIREBASE_URL: string) {
  describe('ToObjectPipe', () => {
    var firebase: Firebase;
    var pipe: ToObjectPipe;

    beforeEach(() => {
      firebase = new Firebase(FIREBASE_URL);
      pipe = new ToObjectPipe();
    });

    it("should return null when given null", () => {
      expect(pipe.transform(null)).toBe(null);
    });

    it("should return null when snapshot doesn't contain any data", done => {
      firebase.child('dinosaurs/tyrannosaurus').once('value', snapshot => {
        expect(pipe.transform(snapshot)).toBe(null);
        done();
      });
    });

    it("should return null when snapshot's key doesn't exist", done => {
      firebase.child('romans').once('value', snapshot => {
        expect(pipe.transform(snapshot)).toBe(null);
        done();
      });
    });

    describe("when data is an object", () => {
      it("should assign meta $key", done => {
        firebase.child('dinosaurs/lambeosaurus').once('value', snapshot => {
          expect(pipe.transform(snapshot).$key).toBe('lambeosaurus');
          done();
        });
      });

      it("should return it", done => {
        let lambeosaurusFacts = JSON.parse(`{
          "appeared": -76000000,
          "height": 25,
          "height": 2.1,
          "length": 12.5,
          "order": "ornithischia",
          "vanished": -75000000,
          "weight": 5000
        }`);

        firebase.child('dinosaurs/lambeosaurus').once('value', snapshot => {
          expect(pipe.transform(snapshot)).toEqual(jasmine.objectContaining(lambeosaurusFacts));
          done();
        });
      });
    });

    describe("when data is a primitive", () => {
      it("should assign meta $key", done => {
        firebase.child('dinosaurs/lambeosaurus/order').once('value', snapshot => {
          expect(pipe.transform(snapshot).$key).toBe('order');
          done();
        });
      });

      it("should wrap it to meta $value", done => {
        firebase.child('dinosaurs/lambeosaurus/order').once('value', snapshot => {
          expect(pipe.transform(snapshot).$value).toBe('ornithischia');
          done();
        });
      });
    });
  });
}
