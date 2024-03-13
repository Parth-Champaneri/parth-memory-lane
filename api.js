const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(express.json())
app.use(cors())

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      name TEXT,
      memory_id INTEGER,
      FOREIGN KEY (memory_id) REFERENCES memories(id)
    )
  `)
})

// Get all photos for a particular memory
app.get('/memories/:id/photos', (req, res) => {
  const { id } = req.params
  db.all('SELECT * FROM photos WHERE memory_id = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ photos: rows })
  })
})

// Add a new photo
/*
Using transactions here to retrieve the latest uploaded photo with it's properties to avoid race conditions. 
*/
app.post('/photos', (req, res) => {
  const { url, memory_id, name } = req.body

  if (!url || !memory_id || !name) {
    res.status(400).json({
      error: 'Please provide url, memory_id, and name',
    })
    return
  }

  db.run('BEGIN TRANSACTION')

  const stmt = db.prepare(
    'INSERT INTO photos (url, memory_id, name) VALUES (?, ?, ?)'
  )
  stmt.run(url, memory_id, name, function (err) {
    if (err) {
      db.run('ROLLBACK')
      res.status(500).json({ error: err.message })
      return
    }
    db.get('SELECT last_insert_rowid() as id', [], (err, row) => {
      if (err) {
        db.run('ROLLBACK')
        res.status(500).json({ error: err.message })
        return
      }
      const lastID = row.id
      db.run('COMMIT')
      res.status(201).json({
        id: lastID,
        url: url,
        name: name,
        memory_id: memory_id,
        message: 'Photo added successfully',
      })
    })
  })
})

// Delete a photo
app.delete('/photos/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM photos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Photo deleted successfully' })
  })
})

app.get('/memories', (req, res) => {
  let order = req.query.sortOrder === 'newest' ? 'DESC' : 'ASC'
  db.all(`SELECT * FROM memories ORDER BY timestamp ${order}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.post('/memories', (req, res) => {
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp) VALUES (?, ?, ?)'
  )
  stmt.run(name, description, timestamp, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// quickly run some sql
// db.all('SELECT * FROM photos', [], (err, rows) => {
//   if (err) {
//     console.error('Error fetching photos:', err.message)
//     return
//   }
//   console.log('Current photos:', rows)
// })
