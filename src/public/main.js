import {loadUsers, onNewUser, onSelectedUser} from './socket.js'
import { onHandleSubmit, renderUsers, appendUser, fillForm } from './ui.js'

onNewUser(appendUser)
loadUsers(renderUsers)
onSelectedUser(fillForm)

const userForm = document.querySelector('#userForm')
userForm.addEventListener('submit', onHandleSubmit)