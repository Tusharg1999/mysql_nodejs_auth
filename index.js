const {databaseConnection}=require('./database')
const express=require('express')
const app=express()
const PORT=3000|process.env.PORT

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api',require('./routes/api/routes'))
app.listen(PORT,()=>{
    databaseConnection.connect((err)=>{
        if(err){
            throw err
        }
        else{
            console.log('database is connected and ready')
        }
    })
    console.log(`server running at port ${PORT}`)
})
