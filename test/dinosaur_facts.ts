import * as Firebase from 'firebase'

export function main(FIREBASE_URL: string) {
  var firebase = new Firebase(FIREBASE_URL);

  beforeEach(() => {
    firebase.set(DINOSAUR_FACTS);
  });
}

export const DINOSAUR_FACTS = JSON.parse `
  {
    "dinosaurs": {
      "bruhathkayosaurus": {
        "appeared": -70000000,
        "height": 25,
        "length": 44,
        "order": "saurischia",
        "vanished": -70000000,
        "weight": 135000
      },
      "lambeosaurus": {
        "appeared": -76000000,
        "height": 25,
        "height": 2.1,
        "length": 12.5,
        "order": "ornithischia",
        "vanished": -75000000,
        "weight": 5000
      },
      "linhenykus": {
        "appeared": -85000000,
        "height": 0.6,
        "length": 1,
        "order": "theropoda",
        "vanished": -75000000,
        "weight": 3
      },
      "pterodactyl": {
        "appeared": -150000000,
        "height": 0.6,
        "height": 0.6,
        "length": 0.8,
        "order": "pterosauria",
        "vanished": -148500000,
        "weight": 2
      },
      "stegosaurus": {
        "appeared": -155000000,
        "height": 0.6,
        "height": 4,
        "length": 9,
        "order": "ornithischia",
        "vanished": -150000000,
        "weight": 2500
      },
      "triceratops": {
        "appeared": -68000000,
        "height": 3,
        "length": 8,
        "order": "ornithischia",
        "vanished": -66000000,
        "weight": 11000
      },
      "tyrannosaurus": {
      }
    },
    "scores": {
      "bruhathkayosaurus": 55,
      "lambeosaurus": 21,
      "linhenykus": 80,
      "pterodactyl": 93,
      "stegosaurus": 5,
      "triceratops": 22
    }
  }
`
