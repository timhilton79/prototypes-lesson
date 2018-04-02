## Javascript Prototypes and Inheritance
————————————————————————————————————————————
### Lesson Objective
————————————————————————————————————————————
<br/>
By the end of this lesson students will have gained a basic understanding of Javascript Prototypes, Constructors, and Prototype inheritance.

————————————————————————————————————————————

### What is a Javascript Prototype?
In Prototypal Inheritance "...we create objects which act as prototypes for other objects. The prototype object itself is effectively used as a blueprint for each object the constructor creates."<br/>
[Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript)

So basically a prototype object is a blueprint.  

### Why should I use Javascript Prototypes?
As you imagine, this is hugely helpful when you want to create a bunch of objects that have the same or similar key values/properties/functions.  If your goal is to make your code D.R.Y. then this is an excellent way to do it.

### How is this different than just creating a Javascript Object?
Good question.  Let's take a look at this a bit deeper.

Say you want to create a car.

`let myCar = {}`

Okay, so we have an object that's named "myCar".  Let's give it some key values.

`let myCar = {
    make: "Ford",
    model: "Fiesta",
    plate: "123456",
    horn: function(){
        console.log('beep beep beep')
    },
    engine: function(){
        console.log('vroom vroom');
    }
}`

Now we have an object myCar and it has a bunch of key values.  Say you want to create a new car that has the same key values.  Let's use the `Object.create()` function to create a new object.

`let newCar = Object.create(myCar)`

What this does is that it takes the Object, `myCar` and creates a new object called `newCar` that inherits all the same key values as `myCar`.

Okay, great.  But now we have two Ford Fiestas... Maybe we want different cars.  Do we want to just do something like `newCar.make = 'Dodge'`? No.  That can become messy really quickly and is NOT programmatic.  

No, we want a sweet garage with LOTS of different types of cars, without a lot of work, right? Right! So how do we do this?  This is where prototyping comes in. Remember when I said that a prototype object is basically a blueprint?  Lets start with our constructor function.

### Constructor Function!
The constructor function will build out what key values the car should have.

`const Car = function(make, model, plate) { this.make = make; this.model = model; this.plate = plate}`

We've created a constructor function that takes the argument make, model, plate...  Great.  So now we want to make a car right?

`const benz = new Car('Mercedes Benz', 'S500', 'BALLERZ')`

Sweet ride!  Now let's console log that benz to see what we've got.

But wait, our Fiesta could beep and go vroom.  Why can't our sweet benz do that?  Let's make it happen!

In our constructor function let's put in another line of code `this.canHonk = true`.  Well, wait, maybe not all cars can honk...  let's modify that and set it to `this.canHonk = canHonk` and pass in true or false in our constructor function.

Now we have given all Cars that will be created with `canHonk: true` the ability to honk.  But it can't honk yet because we haven't defined what it is to honk yet.

### Prototype Functions!

`Car.prototype.honk = function(){ if (this.canHonk) { console.log("beep beep beep")} else {console.log("I can't honk")}}`

So basically we've created a prototype function that says all cars with the key value `canHonk` set to true will honk otherwise they won't.  

Let's rebuild the benz with that in mind.  

`const benz = new Car('Mercedes Benz', 'S500', 'BALLERZ', true)`

But all cars can rev their engines right?  Sure.  So let's set that up too.

`Car.prototype.revEngine = function(){console.log('VROOM, VROOM!!!')}`

All Cars can now rev their engines.  Try it with your benz.  `benz.revEngine()` should log 'VROOM, VROOM!!!'.

Okay great.  Now we can build our garage...  

Go ahead an build a couple cars.  

But wait, I want more than just cars in my garage.  I'd like some SUVs.  

### Prototype Inheritance!
Well, Suvs are going to have to inherit the characteristics of Cars and have some of their own.  Let's build a new constructor function.

`const Suv = function(make, model, plate, canHonk, feature){
    Car.call(this, make, model, plate, canHonk);
    this.feature = feature;
}`

The Car contructor function will handle creating the key values for make, model, plate, and canHonk so we say `Car.call(this, make, model, plate, canHonk)`.  But we want to know what makes an SUV special, so we added a key value for feature.

Cool, let's just try making that Suv now.

`const explorer = new Suv('Ford', 'Explorer', '567890', true, '4x4');
`
If we `console.log(explorer)` we will see all the key values that we assigned it in creating a new instance of the SUV object.  However, let's see if it can honk.  It can't.  Our code is broken, because while SUV has inherited the constructor function of Car, it hasn't inherited any of the prototype functions.

`Suv.prototype = Object.create(Car.prototype);
Suv.prototype.constructor = Suv.prototype;`

Add those lines - the first one makes sure that any Suv instance has all the prototype functions of Car, and the second one is a backstop to make sure that all instances of Suv are actually pointing to Suv and not Car.  

See if explorer can honk!  It can! Awesome!  Now let's give SUVs a prototype function that all SUVs can do but Cars can't, like towing.  Create a prototype function that console.logs "Cars can't tow but I can!"

### Can a prototype inherit from a prototype that inherits from a prototype?

I've always wanted a Mack Truck!  

Create a prototype for Truck that inherits all the key values and the prototype functions of Car and Suv.  

Truck should also have a key value of cargo (which is an array of strings), and a key value for number of wheels.

Make sure the Truck can (or can't) honk, can rev its engine, and can tow.  Maybe give it a special prototype function.

Drop off one of the cargo items.

Useful links:

[MDN - Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

[MDN - Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
