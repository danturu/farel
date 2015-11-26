export class SpyChangeDetectorRef {
  constructor() {
    spyOn(this, 'markForCheck');
  }

  markForCheck() {
  }
}


