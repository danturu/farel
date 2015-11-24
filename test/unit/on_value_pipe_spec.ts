import * as Firebase from 'firebase'

import { OnValuePipe } from '../../src/on_value_pipe'

class SpyChangeDetectorRef {
  constructor() {
    spyOn(this, 'markForCheck');
  }

  markForCheck() {
  }
}

export function main(FIREBASE_URL: string) {
  describe('OnValuePipe', () => {
    var firebase: Firebase;
    var spyChangeDetectorRef: any;
    var pipe: OnValuePipe;

    beforeEach(() => {
      firebase = new Firebase(FIREBASE_URL);
      spyChangeDetectorRef = new SpyChangeDetectorRef;
      pipe = new OnValuePipe(spyChangeDetectorRef);
    });

    afterEach(() => {
      pipe.onDestroy();
    });

    it('should return null when given null', () => {
      expect(pipe.transform(null, [])).toBe(null);
    });

    it("should subscribe to Firebase ref and return the latest snapshot", done => {
      let pterodactylOrderRef = firebase.child('dinosaurs/pterodactyl/order');
      pipe.transform(pterodactylOrderRef);

      setTimeout(() => {
        expect(pipe.transform(pterodactylOrderRef).val()).toBe('pterosauria');
        done();
      });
    });

    it("should subscribe to Firebase url and return the latest snapshot", done => {
      let triceratopsOrderUrl = `${FIREBASE_URL}/dinosaurs/triceratops/order`;
      pipe.transform(triceratopsOrderUrl);

      setTimeout(() => {
        expect(pipe.transform(triceratopsOrderUrl).val()).toBe('ornithischia');
        done();
      });
    });

    it("should track data and return the latest snapshot", done => {
      pipe.transform(FIREBASE_URL);

      setTimeout(() => {
        expect(pipe.transform(FIREBASE_URL).val()).not.toBe('new facts...');
        firebase.set('new facts...');

        setTimeout(() => {
          expect(pipe.transform(FIREBASE_URL).val()).toEqual('new facts...');
          done();
        });
      });
    });

    it("should return same snapshot when nothing has changed since the last call", done => {
      pipe.transform(FIREBASE_URL);

      setTimeout(() => {
        expect(pipe.transform(FIREBASE_URL)).toBe(pipe.transform(FIREBASE_URL));
        done();
      });
    });

    it("should request a change detection check upon receiving a new value", done => {
      pipe.transform(FIREBASE_URL);

      setTimeout(() => {
        expect(spyChangeDetectorRef.markForCheck).toHaveBeenCalled();
        done();
      });
    });

    describe("onDestroy", () => {
      it("should do nothing when no subscription", () => {
        expect(() => pipe.onDestroy()).not.toThrow();
      });

      it("should dispose of the existing subscription", done => {
        pipe.transform(firebase);
        pipe.onDestroy();

        firebase.set("some new dinosaur fact...");

        setTimeout(() => {
          expect(spyChangeDetectorRef.markForCheck.calls.count()).toEqual(1);
          done();
        }, 0);
      });
    });
  });
}
