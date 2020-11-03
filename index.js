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
const todos = document.querySelector('.todos');
const requestForm = document.querySelector('.requestForm');
const requestNumber = document.querySelector('.requestNumber');
const requestTodo = document.querySelector('.requestTodo');

requestNumber.addEventListener('input', () => {
    if(Number(requestNumber.value) < 1 || Number(requestNumber.value) > 200) {
        requestNumber.value = '';
    }
});

function createModal(options) {
    const DEFAULTH_WIDTH = '400px';
    const modal = document.body.appendChild(document.createElement('div'));
    modal.classList.add('modal');

    modal.addEventListener('click', event => {
        if(event.target.dataset.close) {
            modalMethods(modal).close();
        }
    });

    modal.innerHTML = `
        <div class="modal__overlay" data-close="true">
            <div class="modal__content" style="width: ${options.width || DEFAULTH_WIDTH}">
                <div class="modal__header">
                    <span class="modal__title">${options.title || 'Modal'}</span>
                    <span class="modal__close" data-close="true">&times;</span>
                </div>
                <div class="modal__body" style="color: ${options.color || 'black'};">
                    ${options.content || ''}
                </div>
                <div class="modal__footer">
                    ${options.footer || `
                        <button class="modal__ok">OK</button>
                        <button class="modal__closeBtn" data-close="true">Close</button>
                    `}
                </div>
            </div>
        </div>
    `;

    return modal;
}

function modalMethods(modal) {
    return {
        open() {
            modal.classList.add('open');
            document.body.classList.add('overflowHidden');
        },
        close() {
            modal.classList.remove('open');
            modal.classList.add('hide');

            setTimeout(() => {
                modal.classList.remove('hide');
                modal.remove();
                document.body.classList.remove('overflowHidden');
            }, 300);
        }
    }
}

function todoRequest(todo = prompt('Todo')) {
    const url = `https://jsonplaceholder.typicode.com/todos/${todo}`;

    return fetch(url)
        .then(res => {
            if(res.status !== 200) {
                throw new Error('No more 200');
            }
            return res.json();
        })
        .then(data => {
            const modal = createModal({
                title: 'To Do',
                width: '600px',
                content: `
                    <p>Completed: ${data.completed}</p>
                    <p>ID: ${data.id}</p>
                    <p>Title: ${data.title}</p>
                    <p>UserID: ${data.userId}</p>
                `,
                footer: `
                    <button class="modal__closeBtn" data-close="true">Close</button>
                `
            });

            setTimeout(() => {
                modalMethods(modal).open(); 
            }, 1);
            
            // const todo = todos.appendChild(document.createElement('div'));
            // todo.innerHTML = `
            //     <p>Completed: ${data.completed}</p>
            //     <p>ID: ${data.id}</p>
            //     <p>Title: ${data.title}</p>
            //     <p>UserID: ${data.userId}</p>
            // `;
        })
        .catch(e => console.error(e));
}

requestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(Number(requestNumber.value) === 0) {
        requestNumber.value = '';
    } else {
        todoRequest(Number(requestNumber.value));
        requestNumber.value = '';
    }
});

function userRequest() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const tables = container.appendChild(document.createElement('div'));
            tables.classList.add('tables');

            data.forEach((item) => {
                const userInfo = tables.appendChild(document.createElement('table'));

                userInfo.innerHTML = `
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.username}</td>
                        <td>${item.email}</td>
                        <td>${item.address.street}, ${item.address.suite}</td>
                        <td>${item.phone}</td>
                        <td>${item.website}</td>
                    </tr>
                `;
            });
        })
        .catch(e => console.error(e));
}

userRequest();