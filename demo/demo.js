// const getTodo = callback => {
//     setTimeout(() => {
//        callback ({ text: 'Complete Code Example' })
//     }, 2000)
// }

// getTodo(todo => {
//     console.log(todo.text)
// })

// const getTodo = callback => {
//     setTimeout(() => {
//        callback ({ text: 'Complete Code Example' })
//     }, 2000)
// }

// getTodo(todo => {
//     console.log(todo.text)
// })

// console.log("This is the first output")




// const getTodo = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let error = false;
//             if(!error)
//                 resolve({ text: 'Complete Code Example' })
//             else
//                 reject()
//         }, 2000)     
//     })
// }

// getTodo()
//     .then(todo => {
//         console.log(todo.text)
//     })
//     .catch(error => {
//         console.log("Error occurred")
//     })



const getTodo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;
            if(!error)
                resolve({ text: 'Complete Code Example' })
            else
                reject()
        }, 2000)     
    })
}

async function fetchTodo () {
    const todo = await getTodo()
    return todo
}

// fetchTodo().then(todo => console.log(todo.text))