const myCar = {
    make: "Ford",
    model: "Fiesta",
    plate: "123456",
    horn: function(){
        console.log('beep beep beep');
    },
    revEngine: function(){
        console.log('vroom vroom');
    }
}

const newCar = Object.create(myCar);
newCar.horn();
newCar.revEngine();
console.log(newCar.make, newCar.model, newCar.plate);

// Make Car
const Car = function(make, model, plate, canHonk){
    this.make = make;
    this.model = model;
    this.plate = plate;
    this.canHonk = canHonk;
}

Car.prototype.honk = function(){
    if (this.canHonk) {
        console.log("beep beep beep")
    } else {
        console.log("I can't honk");
    }
}

Car.prototype.revEngine = function(){
    console.log('VROOM, VROOM!!!')
}

// Make Suv
const Suv = function(make, model, plate, canHonk, feature){
    Car.call(this, make, model, plate, canHonk);
    this.feature = feature;
}

Suv.prototype = Object.create(Car.prototype);
// Suv.prototype.constructor = Suv.prototype;

Suv.prototype.canTow = function(){
    console.log("Cars can't tow but I can!");
}

// Make Truck
const Truck = function(make, model, plate, canHonk, feature, cargo, wheels) {
    Suv.call(this, make, model, plate, canHonk, feature);
    this.cargo = cargo;
    this.wheels = wheels;
}

Truck.prototype = Object.create(Suv.prototype);
Truck.prototype.constructor = Truck.prototype;

Truck.prototype.newCargo = function(){
    console.log("I'm haulin new cargo");
}

// Make all vehicles
const benz = new Car('Mercedes-Benz', 'S500', 'BALLERZ', true);
const kia = new Car('Kia', 'Spectra', '123456', false);
const explorer = new Suv('Ford', 'Explorer', '567890', true, '4x4');
const escalade = new Suv('Cadillac', 'Escalade', '135791', true, 'Luxury')
const mack = new Truck('Mack', 'Tractor Trailor', 'HAULIN', true, 'Semi', ['apples', 'oranges', 'lemons', 'limes', 'pineapples'], '18')

// Cars
console.log(benz);
benz.honk();
benz.revEngine();

console.log(kia);
kia.honk();
kia.revEngine();

// Suv
console.log(explorer);
explorer.honk();
explorer.revEngine();
explorer.canTow();

console.log(escalade);
escalade.honk();
escalade.revEngine();
escalade.canTow();

// TRUCK
console.log(mack);
mack.honk();
mack.revEngine();
mack.canTow();
// last thing in first thing out
mack.cargo.pop();
// I messed up the name, it's now Semi Truck
mack.model = "Semi Truck";
console.log(mack);
mack.newCargo();
