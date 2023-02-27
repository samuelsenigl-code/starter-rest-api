const express = require('express')
const app = express()
const db = require('@cyclic.sh/dynamodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################

// Get a full listing of songs
app.get('/songs', async (req, res) => {
    const worships = [
        	{
        		"id": 123,
        		"name": "10 000 důvodů",
        		"author": "Matt Redman",
        		"content": "Chval Ho [F]o duše [C]má, [G]o duše [Am]má[br] [F]Uctívá [C]jméno [G]Tvé[br] Ze vší [F]síly [Am]zpívá, [F]du[G]še [Am]má[br] Uctí[F]vá jméno [G]Tvé [C][br] [br] [F] [C] [G] [Am]/[C][br] Slunce vychází, nový den začíná[br] Je čas zpívat Tvou píseň zas[br] Cokoli se může stát a cokoli leží za mnou[br] Já budu zpívat, než zas přijde noc[br] [br] [F] [C] [G] [Am]/[C][br] Jsi štědrý v lásce a mírný v hněvu[br] Máš velké jméno, jsi laskavý[br] Pro Tvou dobrotu já budu stále zpívat[br] Tisíce důvodů mé srdce má[br] [br] [F] [C] [G] [Am]/[C][br] A až přijde den, kdy má síla zeslábne[br] Budu blíž konci, až přijde můj čas[br] Stejně má duše bude zpívat Ti chválu[br] Tisíce let Tě chválit napořád[br]",
        		"notes": "",
        		"capo": 0,
        		"recording": "null",
        		"team": "1"
        	}
    ];
    res.json(worships).end()
})

// Create or Update an item
app.post('/:col/:key', async (req, res) => {
  console.log(req.body)

  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).set(key, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Delete an item
app.delete('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).delete(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).get(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a full listing
app.get('/:col', async (req, res) => {
  const col = req.params.col
  console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
  const items = await db.collection(col).list()
  console.log(JSON.stringify(items, null, 2))
  res.json(items).end()
})

// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
