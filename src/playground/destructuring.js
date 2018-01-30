const person = {
    name: 'Amy',
    age: 50,
    location: {
        city: 'Milwaukee',
        temp: 19
    }
};

// use a name variable adn age variable
//const name = person.name;
//const age = person.age;

// --- Use ES6 Destucturing instead --- //
const { name: firstName = 'Anonymous', age } = person; // setting a default on name and renaming name to firstName

console.log(`${firstName} is ${age}.`);


// if (person.location.city && person.location.temp) {
    // console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// }
    
const { city, temp: temperature } = person.location; // renaming temp variable to temperature

if (city && temperature) {
    console.log(`It's ${temperature} in ${city}.`);
}


// ---- Challenge ---- //

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        //name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;


console.log(publisherName);
