

function move(from, to, aux) {
    if (to.disks == [] || to.disks[to.disks.lenght-1] > from.disks[from.disks.lenght-1]) {
        let popped = from.disks.pop()
        to.disks.push(popped);
        
        console.log( [from, to, aux], '->->-.+>')  
    }
    console.log('aaaaaaaa')
    return [from, to, aux]//.sort((a, b) => { a.number - b.number }); 
}
 

// function hanoi(n, from, to, aux) {
//     if (n == 0) {return }
//     hanoi(n-1, from, to, aux) 
//     console.log(`${from.number} -> ${to.number}`);
//     hanoi(n-1, aux, to, from)
// }

function hanoi(n,from, to, aux) {
    if (from.disks.lenght == 0) {console.log( [from, to, aux]); return}
    [from, to, aux] = move(from, to, aux)
    hanoi(n -1,from, to, aux) 
    [aux, to, from] = move( aux, to, from);
    hanoi(n -1,from, to, aux)
    //console.log(`${from.number} -> ${to.number}`);

}

// Shift ‘N-1’ disks from ‘A’ to ‘B’, using C.
// Shift last disk from ‘A’ to ‘C’.
// Shift ‘N-1’ disks from ‘B’ to ‘C’, using A.



// let maxLenght = 5;
let rods = [
    {number: 1, disks: [1, 2, 3]},
    {number: 2, disks: []},
    {number: 3, disks: []},
];

console.log( rods )
rods = hanoi(3, rods[0], rods[1], rods[2])
console.log( rods )