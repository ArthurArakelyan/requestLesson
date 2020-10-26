// Promise

// console.log('Request data...');

// setTimeout(() => {
//     console.log('Preparing data...');

    // const backendData = {
    //     server: 'aws',
    //     port: 2000,
    //     status: 'working'
    // }

    // setTimeout(() => {
    //     backendData.modified = true;
    //     console.log('Data received', backendData);
    // }, 2000);
// }, 2000);

// const p = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         console.log('Preparing data...');
//         const backendData = {
//             server: 'aws',
//             port: 2000,
//             status: 'working'
//         }
//         resolve(backendData);
//     }, 2000);
// });

// p.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             data.modified = true;
//             resolve(data)
//         }, 2000);
//     })
// })
//   .then((clientData) => {
//     clientData.fromPromise = true;
//     return clientData;
//   })
//   .then((data) => {
//     console.log('Modified', data);
//   })
//   .catch((err) => console.error('Error', err))
//   .finally(() => console.log('Finally'));

// const sleep = (ms) => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), ms);
//     });
// }

// // sleep(2000).then(() => console.log('After 2 seconds'));
// // sleep(3000).then(() => console.log('After 3 seconds'));

// Promise.all([sleep(2000), sleep(5000)]).then(() => {
//     console.log('All Promises');
// });

// Promise.race([sleep(2000), sleep(5000)]).then(() => {
//     console.log('Race Promises');
// });

// =============== Async Await

// const delay = (ms) => {
//     return new Promise(r => {
//         setTimeout(() => {
//             r();
//         }, ms);
//     })
// }

// const url = `https://jsonplaceholder.typicode.com/todos/1`;

// function fetchTodos() {
//     // console.log('Fetch todo started...');
//     return delay(2000)
//         .then(() => fetch(url)
//         .then(response => response.json()))
// }

// fetchTodos()
//     .then(data => {
//         console.log('Data:', data);
//     })
//     .catch(e => console.error(e));

// async function fetchAsyncTodos() {
//     console.log('Fetch todo started...');
//     const url = `https://jsonplaceholder.typicode.com/todos`;
//     try {
//         await delay(2000);
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log('Data:', data);
//     } catch(e) {
//         console.error('Error', e);
//     } finally {

//     }
// }

// fetchAsyncTodos();

const container = document.querySelector('#container');
const requestBtn = document.querySelector('.requestBtn');

function todoRequest(todo = prompt('Todo')) {
    const url = `https://jsonplaceholder.typicode.com/todos/${todo}`;

    fetch(url)
        .then(res => {
            if(res.status !== 200) {
                throw new Error('No more 200');
            }
            return res.json();
        })
        .then(data => {
            container.appendChild(document.createElement('div')).innerHTML = `
                <p>Completed: ${data.completed}</p>
                <p>ID: ${data.id}</p>
                <p>Title: ${data.title}</p>
                <p>UserID: ${data.userId}</p>
            `;
        })
        .catch(e => console.error(e));
}

requestBtn.addEventListener('click', () => todoRequest());
