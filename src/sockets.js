import User from './models/User'

export default (io) => {
    io.on('connection', (socket) => {
        const emitUsers = async () => {
            const users = await User.find()    
            io.emit('server:loadusers',users)
        }
        emitUsers()
        
        //console.log('New user connected: ', socket.id)
        socket.on('client:algo', (data) =>{
            //Mostrar en el panel del admin
            //Guardar en BD
        })

        socket.on('client:newuser', async(data) => {
            const newUser = new User(data);
            const savedUser = await newUser.save();
            //si es socket.emit solo le responde a la ventana que mando el client.newuser
            //si es io.emit le respondera a todas las ventanas activas
            io.emit('server:newuser',savedUser)
        })

        socket.on('client:deleteuser', async (id) => {
            await User.findByIdAndDelete(id)
            emitUsers()
        })

        socket.on('client:getUser', async (id) => {
            const user = await User.findById(id)
            socket.emit('server:selecteduser',user)
        })

        socket.on('client:updateuser', async (updatedUser) => {
            await User.findByIdAndUpdate(updatedUser._id,{
                username: updatedUser.username,
                password: updatedUser.password
            })
            emitUsers()
        })
    })

    
}