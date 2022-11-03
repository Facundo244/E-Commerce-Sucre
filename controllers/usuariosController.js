const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { exit } = require("process");

function findAll(){
    const jsonData = fs.readFileSync(path.join(__dirname, "../data/usuarios.json"))
    const data = JSON.parse(jsonData);
    return data;
}

function writeFile(data){
    const stringData = JSON.stringify(data, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/usuarios.json"), stringData);
}

//Defino funcion para buscar un usuario por id
function buscarUsuarioPorId(id){
    let usuario = {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        nacimiento: "12/10/1984",
        domicilio: "San Martin 2589",
        domicilioPiso: 15,
        domicilioDpto: "A",
        telefono: "11 3689-3258",
        email: "juan.perez@gmail.com"
    }
    return usuario;
}
//Defino una funcion para actualizar usuario por id
function actualizarUsuarioPorId(id, datos) {
    console.log("Actualizando usuario con id: " + id);
    console.log("Nuevo nombre: " + datos.nombre);
    console.log("Nuevo apellido: " + datos.apellido);
}
//Defino un objeto literal que contiene los metodos con los callbacks de cada ruta y lo exporto para poder usarlo en el router
const controller = {
    registro: (req,res)=>{
        res.render("usuarios/registro", {
            title: "Formulario de registro",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando formulario de registro");
    },
    processRegister: (req, res) =>{

        const error = validationResult(req)
        
        if(!error.isEmpty()){

            //console.log(error.mapped())
            console.log(error.errors)
            return res.render("usuarios/registro" , { 
                title: "Formulario de registro",
                estilos: [
                    "style.css"
                ],
                errors: error.errors, 
                old: req.body 
                })
        }
        
        const users = findAll();

        const newUser = {

            id:  users.length + 1,
            nombre: req.body.nombre,
            apellido: req.body.Apellido,
            nacimiento: req.body.Fechadenacimiento,
            telefono: req.body.telefono,
            domicilio: req.body.calleyaltura,
            domicilioPiso: req.body.piso,
            domicilioDpto: req.body.dpto,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            
        };

        users.push(newUser);

        writeFile(users);

        res.render("usuarios/registrado", {
            title: "Formulario de ingreso",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando agradecimiento por haberse registrado");


    },
    registrado: (req,res)=>{


        res.render("usuarios/registrado", {
            title: "Formulario de ingreso",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando agradecimiento por haberse registrado");

        
    },
    recuperar: (req,res)=>{
        res.render("usuarios/recuperar", {
            title: "Recuperar contraseña",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando recuperar contraseña");
    },
    restablecer: (req,res)=>{
        res.render("usuarios/reestablecercontrasena", {
            title: "Reestablecer contraseña",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando reestablecer contraseña");
    },
    validado: (req,res)=>{
        res.render("usuarios/validado", {
            title: "Validado correctamente",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando correo validado");
    },
    ingreso: (req,res)=>{
        res.render("usuarios/ingreso", {
            title: "Formulario de ingreso",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando ingreso");
    },
    iniciarSesion: (req,res)=>{
       console.log("Validando credenciales del usuario");
       res.redirect("/usuarios/perfil/" + 1);
    },

    perfil: (req,res)=>{
        let usuario = buscarUsuarioPorId(req.params.id);
        res.render("usuarios/perfil", {
            title: "Perfil de usuario",
            estilos: [
                "style.css"        
            ],
            usuario: usuario
        });
        console.log("Mostrando Pagina de Perfil de usuario con id: " + req.params.id);
    },
    recuperacion: (req,res)=>{
        res.render("usuarios/recuperacion", {
            title: "Recuperaración iniciada",
            estilos: [
                "style.css"        
            ]
        });
        console.log("Mostrando recuperacion enviada");
    }, 
    actualizar: (req, res)=>{
        let id = req.params.id;
        let datos = {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        }
        actualizarUsuarioPorId(id, datos);
        res.redirect("/usuarios/perfil/" + req.params.id);
    }
    
};

module.exports = controller;