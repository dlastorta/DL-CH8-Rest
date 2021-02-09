//req.params.id req.body
//app.use(express.json())
//app.use(express.urlencoded({extended:true}))

const express = require('express');
const app = express();
let items = require('./item');
let item = items.Item;

//server
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));

//productos
let productos = [];
let idGen = 0;


app.get("/productos/:id",(req,res)=>{
    try{
        let producto = productos.find(producto => producto.id === req.params.id)
        if(producto){
            res.json(JSON.stringify(producto));
        }
        else {
            res.json(JSON.stringify(JSON.stringify({error: 'producto no encontrado'})));
        }
    }
    catch(err){
        res.json(JSON.stringify(JSON.stringify({error: err})));
    }
    
    
    
});

app.get("/productos",(req,res)=>{
    try{
        if(productos.length > 0){
            res.json(JSON.stringify(productos));
        } else {
            res.json(JSON.stringify(JSON.stringify({error: 'no hay productos cargados'})));
        }
    }
    catch(err){
        res.json(JSON.stringify(JSON.stringify({error: err})));
    }
});

app.post("/productos",(req,res)=>{
    console.log("title:" + req.body.title);
    try{
        let newItem = new item(
            idGen,
            req.body.title,
            req.body.price,
            req.body.thumbnail
        );
    productos.push(newItem);
    res.json(`item creado: ${JSON.stringify(newItem)}`);
    }
    catch(err){
        console.log(err);
        res.json(JSON.stringify({error: "error salvando producto"}));
    }
});

