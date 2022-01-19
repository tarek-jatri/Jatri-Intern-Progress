// Now we are implementing Dependency Injection Principle

class Store {
    constructor(paymentProcess) {
        this.paymentProcess = paymentProcess;
    }

    purchaseBike(quantity) {
        this.paymentProcess.pay(45 * quantity * 70);
    }

    purchaseHelmet(quantity) {
        this.paymentProcess.pay(15 * quantity * 60);
    }
}

// creating the payment class
class Stripe {
    constructor(user) {
        this.user = user;
    }

    makePayment(amount) {
        console.log(`${this.user} made payment of $${amount} with Stripe`);
    }
}
// creating an interface class of this payment class
class StripePaymentProcess {
    constructor(user) {
        this.stripe = new Stripe(user);
    }
    pay(amount) {
        this.stripe.makePayment(amount);
    }
}



class Paypal {
    makePayment(user, amount) {
        console.log(`${user} made payment of $${amount} with Paypal`);
    }
}

class PaypalPaymentProcess {
    constructor(user) {
        this.user = user;
        this.paypal = new Paypal();
    }
    pay(amount) {
        this.paypal.makePayment(this.user, amount);
    }
}


const buyer = new Store(new StripePaymentProcess("Jhon"));
buyer.purchaseBike(2);
buyer.purchaseHelmet(2);