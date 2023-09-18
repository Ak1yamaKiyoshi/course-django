
const http = require('http');
const fs = require('fs')

/*
Створити форму, куди користувач введе свої дані: ім'я, прізвище, вік, пошту та пароль
Після натискання на кнопку наприкінці форми має формуватися файл із даними, які ввів користувач.
*/

const sameSets = (xs, ys) => xs.size === ys.size && [...xs].every((x) => ys.has(x));
const sameKeys = (obj1, obj2) => sameSets(new Set(Object.keys(obj1)), new Set(Object.keys(obj2)));
const htmlForm = `<html>
<body>
    <form method="post" action="http://localhost:3000">Name: 
        <p> name <p/>
        <input type="text" name="name" />
        <p> second name <p/>
        <input type="text" name="secondName" />
        <p> age <p/>
        <input type="number" name="age" />
        <p> email <p/>
        <input type="text" name="email" />
        <p> password <p/>
        <input type="password" name="password" />
        <p> submit <p/>
        <input type="submit" value="Submit" />
    </form>
</body> 
</html>`

const htmlUser = (name, secondName, age, email, password) => { 
    return `
    <html>
        <body>
            <h2> name </h2> 
            <p>  ${name} </p>
            <h2> secondName </h2> 
            <p>  ${secondName} </p>
            <h2> age </h2> 
            <p>  ${age} </p>
            <h2> email </h2> 
            <p>  ${email} </p>
            <h2> password </h2> 
            <p>  ${password} </p>
        </body>
    </html>
`}


/**
 * @param filename string filename to write user data
 * @param data object with keys 'name', 'secondName', 'age', 'email', 'password'
*/
function writeUser(filename, user) {
    const exampleUserData = {name: "", secondName: "", age: 0, email: "", password: "",};
    
    if (typeof(user) != 'object' 
        || !sameKeys(user, exampleUserData) 
        || !filename.includes('.txt') ) 
        throw new Error(
            `Wrong ${!filename.includes('.txt') ?
            'user object keys' : 'filename, filename should include ".txt"'}`
        );
    fs.writeFileSync(filename, JSON.stringify(user));
}


function handleGet(request, response) {
    let html = htmlForm;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
}

function handlePost(request, response) {
    request.on('data', function(data) {
        let userData = {}
        decodeURIComponent(data + '').split("&").forEach(e => {
            const temp = e.split("=");
            userData[temp[0]] = temp[1];
        });

        writeUser(userData.name + '.txt', userData);  
        
        const html = htmlUser(userData.name, 
            userData.secondName, userData.age, 
            userData.email, userData.password
        );
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    });
}


const server = http.createServer(function(request, response) {
  if (request.method == 'POST') handlePost(request, response);
  else handleGet(request, response );
});


const port = 3000;
const host = '127.0.0.1';
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);

// шаблони проєктування
// 