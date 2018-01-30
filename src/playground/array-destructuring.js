const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [ , city, state = 'New York'] = address; // we don't need all items in the array, we do need maintain order of items in the array
console.log(`You are in ${city}, ${state}.`);

const item = ['Hot Coffee', '$2.00', '$2.60', '$2.75'];

const [ itemName, , priceMedium ] = item;

console.log(`A ${itemName} costs ${priceMedium}`);