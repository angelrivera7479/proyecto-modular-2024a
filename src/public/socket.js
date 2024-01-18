const socket = io()

export const loadUsers = (callback) => {
    socket.on('server:loadusers', callback)
}

export const saveUser = (username, password) => {
    socket.emit('client:newuser', {
        username,
        password
    })
}

export const onNewUser = (callback) =>{
    socket.on('server:newuser', callback)
}

export const deleteUser = id =>{
    socket.emit('client:deleteuser',id)
}

export const getUserById = (id) => {
    socket.emit('client:getUser', id)
}

export const onSelectedUser = (callback) =>{
    socket.on('server:selecteduser', callback)
}

export const updateUser = (id, username, password) => {
    socket.emit('client:updateuser',{
        _id : id,
        username,
        password
    })
}