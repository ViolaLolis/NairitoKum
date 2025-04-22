const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bocanegra_bd'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Error en el servidor' });

      if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://172.30.1.101:3000');
});

app.post('/register', (req, res) => {
    const { nombre, email, telefono, password } = req.body;
  
    // Verificar si el correo electrónico ya está registrado
    db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
        }
  
        // Insertar el nuevo usuario en la base de datos
        db.query(
          'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)',
          [nombre, email, telefono, password],
          (err, results) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
            }
  
            res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
          }
        );
      }
    );
  });
  