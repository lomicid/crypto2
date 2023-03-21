const fs = require ('fs');
const crypto = require('crypto');
const { json } = require('stream/consumers');

//паролі 
const pass = 'qwerty123'; // до user1
const pass1 = '1221312321' // до user2
const pass2 = '1221eklfjaefpaejfowqf312321' //до user3

//1 завдання
function hashPassword(username,password){
    const salt = crypto.randomBytes(16).toString('hex'); //сіль
    const hash = crypto.createHash('sha512').update(password).digest('hex') // хешує
    const data = JSON.stringify({ salt, hash }); // для зручного вводу
    if (fs.existsSync(`${username}.json`)) { // Перевірка на наявність json файлу з username
        console.log(`${username} вже існує`);
      } else {
    fs.writeFileSync(`${username}.json`,`${data}\n`,'utf-8',(err) => {// створить новий json файл під конкретного user
        console.log('Записано');
           })
        }
    }

//2 завдання
function checkPassword(userCheck,passwordCheck){
    const data = JSON.parse(fs.readFileSync(`${userCheck}.json`, 'utf-8')) // парсить дані з файлу
    const hash = crypto.createHash('sha512').update(passwordCheck).digest('hex') // хешує
    if(hash === data.hash){ // перевірка
        console.log('Паролі співпадають')
    }else{
        console.log('Пароль невірний')
    }
}


//хешування паролів + створення для нього json файлу
hashPassword('user1',pass)
hashPassword('user2',pass1)
hashPassword('user3',pass2)


//перевірка паролів з файлу 
checkPassword('user1', pass1)
checkPassword('user2', pass)
checkPassword('user3', pass2)
