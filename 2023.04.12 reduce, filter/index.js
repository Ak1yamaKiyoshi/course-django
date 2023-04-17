// Створіть масив чисел і використовуйте метод filter() та стрілочну функцію, щоб відфільтрувати тільки парні числа. 
// Потім використовуйте метод map() та стрілочну функцію, щоб помножити кожне число на 2. 
// Наприкінці, використовуйте метод reduce() та стрілочну функцію, щоб отримати суму всіх чисел у масиві.
function sumOfEvenNumbersMultipliedByTwo(array) {
    array = array.filter(n => n % 2 == 0); /* filter even number */
    array = array.map(n => n *= 2); /* multiply each by 2 */
    return array.reduce((acc, element) => {return acc + element }); 
}
console.log(sumOfEvenNumbersMultipliedByTwo([1, 2, 3, 4, 5, 6, 7, 8, 10])) // 60


// Напишіть функцію, яка приймає два аргументи - ім'я та вік. 
// Функція повинна повернути рядок у форматі 
// "Привіт, мене звати <ім'я> та мені <вік> років.", використовуючи стрілочну функцію.
// ! makes first letter of name uppercase too 
// name.charAt(0).toUpperCase() + name.slice(1)
let greeting = (name, age) => {return `Hello, my name is ${name.charAt(0).toUpperCase() + name.slice(1)}. I'm ${age}.`};
console.log(greeting('someone', 13)); // Hello, my name is Someone. I'm 13.


// Створіть функцію, яка приймає довільну кількість аргументів та виводить їх у консоль. 
// Потім викличте цю функцію, передавши їй кілька аргументів за допомогою spread-оператора.
function printAllParamteres() {
    for (let i = 0; i < arguments.length; i++)
    console.log(arguments[i]); 
} 
printAllParamteres(...[1, 2, ('b'+'a'+ +'a'+'a').toLowerCase()] ) // 1 2 'banana'


// Створіть об'єкт Map, у якому ключами будуть імена країн, а значеннями - їхні столиці. 
// Заповніть цей об'єкт кількома парами ключ-значення і виведіть їх у консоль.
let countries = new Map; 
countries.set('Ukraine', 'Kiyv');
countries.set('England', 'London');
countries.set('France', 'Paris');
for (let country of countries) 
    console.log(`${country[0]}: ${country[1]}`) // 'Ukraine: Kiyv' 'England: London' 'France: Paris'