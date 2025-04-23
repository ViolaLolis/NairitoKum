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

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// 🔐 Login
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

// 📝 Registro
app.post('/register', (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error en el servidor' });

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
    }

    db.query(
      'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)',
      [nombre, email, telefono, password],
      (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });

        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
      }
    );
  });
});

// ✅ NUEVAS RUTAS PARA MASCOTAS

// Obtener todas las mascotas
app.get('/pets', (req, res) => {
  db.query('SELECT * FROM mascotas', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error al obtener mascotas' });
    res.json(results);
  });
});

// Agregar una nueva mascota
// Agregar una nueva mascota
app.post('/pets', (req, res) => {
  const { nombre, especie, raza, edad, peso, usuario_id } = req.body;

  console.log('📦 Mascota recibida:', { nombre, especie, raza, edad, peso, usuario_id });

  const sql = `
    INSERT INTO mascotas (nombre, especie, raza, edad, peso, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  console.log('📝 Consulta SQL:', sql);
  console.log('🧾 Datos a insertar:', [nombre, especie, raza, edad, peso, usuario_id]);

  db.query(sql, [nombre, especie, raza, edad, peso, usuario_id], (err, result) => {
    if (err) {
      console.error('❌ Error al agregar mascota:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al agregar mascota',
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      id: result.insertId,
      nombre,
      especie,
      raza,
      edad,
      peso,
      usuario_id,
    });
  });
});


// Eliminar mascota
app.delete('/pets/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM mascotas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Error al eliminar mascota' });
    res.json({ success: true, message: 'Mascota eliminada' });
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://192.168.1.7:3000');
});
