const Singleton = (function () {
    let instance;

    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
console.dir(Singleton);
console.log(Singleton);

function run() {

    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    console.dir(instance1);
    console.log(instance1);

    console.log("Same instance? " + (instance1 === instance2));
}


run();