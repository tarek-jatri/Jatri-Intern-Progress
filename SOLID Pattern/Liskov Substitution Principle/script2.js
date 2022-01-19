// Liskov Substitution Principle Implemented

class FlyingBird {
    fly() {
        console.log("I can Fly");
    }
}

class SwimingBird {
    swim() {
        console.log("I can Swim");
    }
}

class Duck extends FlyingBird {
    quack() {
        console.log("I can Quack");
    }
}

class Penguin extends SwimingBird {

}

function makeFlyingBirdFly(bird) {
    bird.fly();
}

function makeSwimingBirdFly(bird) {
    bird.swim();
}


const duck = new Duck();
const penguin = new Penguin();

makeFlyingBirdFly(duck);
makeSwimingBirdFly(penguin);