class Bird {
    fly() {
        console.log("I can Fly");
    }
}

class Duck extends Bird {
    quack() {
        console.log("I can Quack");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Sorry Can't fly");
    }

    swim() {
        console.log("I can Swim");
    }
}

function makeBirdFly(bird) {
    bird.fly();
}


const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdFly(penguin);