//Archivo encargado de manipular la interfaz
import { saveUser,deleteUser, getUserById, updateUser} from "./socket.js"

const usersList = document.querySelector('#users')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

let savedId = ""

const userUI = user =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${user.username}</h1>
            <p>${user.password}</p>
            <div>
                <button class="update" data-id="${user._id}">Update</button>
                <button class="delete" data-id="${user._id}">Delete</button>
            </div>
        </div>
    `

    const btnDelete = div.querySelector('.delete')
    btnDelete.addEventListener('click', e => deleteUser(btnDelete.dataset.id))
    
    const btnUpdate = div.querySelector('.update')
    btnUpdate.addEventListener('click', e  => getUserById(btnUpdate.dataset.id))

    return div
}

export const renderUsers = users => {
    usersList.innerHTML = ""
    users.forEach(user => usersList.append(userUI(user)))
}

export const fillForm = user =>{
    username.value = user.username;
    password.value = user.password;
    savedId = user._id;
}

export const onHandleSubmit = (e) => {
    e.preventDefault()

    if (savedId){
        updateUser(savedId, username.value, password.value)
    }else{
        saveUser(username.value,password.value)
    }
    savedId = ""
    username.value = ""
    password.value = ""
}

export const appendUser = user => {
    usersList.append(userUI(user))
}