// Without using Dependency Inversion Principle
// first we had stripe only then added paypal


class Store {
    constructor(user) {
        this.user = user;
        this.paypal = new Paypal();
        // this.stripe = new Stripe(user);
    }

    purchaseBike(quantity) {
        // this.stripe.makePayment(45 * quantity * 70);
        this.paypal.makePayment(this.user, 45 * quantity * 70);
    }

    purchaseHelmet(quantity) {
        // this.stripe.makePayment(15 * quantity * 60);
        this.paypal.makePayment(this.user, 15 * quantity * 60);
    }
}

class Stripe {
    constructor(user) {
        this.user = user;
    }

    makePayment(amount) {
        console.log(`${this.user} made payment of $${amount} with Stripe`);
    }
}


class Paypal {
    makePayment(user, amount) {
        console.log(`${user} made payment of $${amount} with Paypal`);
    }
}




const buyer = new Store("Jhon");
buyer.purchaseBike(2);
buyer.purchaseHelmet(2);