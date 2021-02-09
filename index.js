const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const items = require('./item');
let item = items.Item;

//server
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));

//productos
let productos = [];
let idGen = 1;

app.get("/productos/:id",(req,res)=>{
    try{
        let producto = productos.find((producto) => {
            if(producto.id == req.params.id) {
                return producto;
            }
        });
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

app.post("/productos", (req,res)=>{
    try{
        let newItem = new item(
            idGen,
            req.body.title,
            req.body.price,
            req.body.thumbnail
        );
    productos.push(newItem);
    idGen++;
    res.json(`item creado: ${JSON.stringify(newItem)}`);
    }
    catch(err){
        console.log(err);
        res.json(JSON.stringify({error: "error salvando producto"}));
    }
});

