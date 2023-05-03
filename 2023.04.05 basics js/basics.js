/* приймає на вхід масив чисел і виводить у консоль тільки ті числа, що є простими і більшими за 5. 
Якщо таких чисел немає, функція повинна виводити повідомлення "Немає відповідних чисел". */
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i < n; i++)
        if (n % i == 0) return false;
    return true;
}

function task1(array) {
    let output = '';
    array.forEach(a => {if (a >= 5 && isPrime(a)) output += a + ' ';});
    console.log( (output === '') ? 'no prime numbers in string' : output)
}
//task1([1, 2])


/* приймає на вхід два масиви чисел і повертає масив, 
що складається з елементів, які є тільки в першому масиві, але не в другому. 
Якщо таких елементів немає, функція повинна повертати порожній масив.
*/
function task2(arr, arr1) {
    return arr.reduce((acc, num) => {
        if (arr1.indexOf(num) == -1) 
            return [...acc, num]; 
        return [acc];
    });
}
//console.log(task2([3, 2, 4, 1, 6, 7], [2, 3]));


/*приймає на вхід число і масив чисел. Функція повинна виводити в консоль усі числа з масиву, 
    які більші за задане число і діляться на нього без залишку. Якщо таких чисел немає, 
    функція повинна виводити повідомлення "Немає відповідних чисел".
*/
function task3(array, num) {
    let output = '';
    array.forEach(a => {if (a > num && a % num == 0) output += a + ' ';});
    console.log( (output === '') ? 'no prime numbers in string' : output)
}
//task3([-1, 1, 2, 4, 5, 20], 2)