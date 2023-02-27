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
        		"capo": "0",
        		"recording": "null",
        		"team": "1"
        	},
            {
            	"id": 62,
              	"nazev": "10,000 Reasons",
              	"autor": "Matt Redman",
              	"obsah": "[C] [G] [D] [Em] [br] Bless the Lord oh my soul, oh my soul[br] [C] [G] [D][br] Worship His Holy name[br] [C] [Em], [C] [D] [Em][br] Sing like never before, oh my soul[br] [C] [D] [G][br] I'll worship Your Holy name[br] [br] [C] [G] [D] [Em], [G][br] The sun comes up It's a new day dawning[br] It's time to sing Your song again[br] Whatever may pass and whatever lies before me[br] Let me be singing when the evening comes[br] [br] [C] [G] [D] [Em], [G][br] You're rich in love and You're slow to anger[br] Your name is great and Your heart is kind[br] For all Your goodness I will keep on singing [br] Ten thousand reasons for my heart to find[br] [br] [C] [G] [D] [Em], [G][br] And on that day when my strength is failing[br] The end draws near and my time has come[br] Still my soul will sing Your praise unending[br] Ten thousand years and then forevermore[br] [br] [C] [D] [Em], [G][br] I'll worship Your Holy name[br] Yes I'll worship Your Holy name[br] I'll worship Your Holy name[br]",
              	"poznamky": "",
              	"capo": "6.",
              	"nahravka": "null",
              	"cirkev": "1"
            },
            {
              	"id": "60",
              	"nazev": "Above All",
              	"autor": "Michael W. Smith",
              	"obsah": "[D] [G] [A] [D] [br] Above all powers, above all kings[br] [G] [A] [D] [br] Above all nature and all created things [br] [Hm] [A] [G] [D] [br] Above all wisdom and all the ways of man [br] [Em] [G] [A] [br] You were here before the world began [br] [br] [D] [G] [A] [D] [br] Above all kingdoms, above all thrones [br] [G] [A] [D] [br] Above all wonders the world has ever known [br] [Hm] [A] [G] [D] [br] Above all wealth and treasures of the earth[br] [Em] [G] [Fis] [br] There's no way to measure what you're worth [br] [br] [D] [Em] [A] [D][br] Crucified laid behind the stone [br] You lived to die, rejected and alone [br] [Hm] [A] [G] [D][br] Like a rose trampled on the ground[br] [Em] [Hm] [G] [A][br] You took the fall and thought of me[br] Above all[br]",
              	"poznamky": "",
              	"capo": "3.",
              	"nahravka": "null",
              	"cirkev": "1"
            },
            {
             	"id": "163",
             	"nazev": "Agnus Dei",
             	"autor": "",
             	"obsah": "[E]Hale[A]lu[E]ja, [E]hale[A][B]lu[C#]ja,[br] vládne [H]nám všemoc[A]ný Bůh a [E]Pán[br] [E]Hale[A]lu[E]ja, [E]hale[A][B]lu[C#]ja,[br] vládne [H]nám všemoc[A]ný Bůh a [E]Pán[br] [E]Hale[A][B]lu[C#]ja, sva[H][E]tý[br] [br] [H]Sva[E]tý, je náš [A]Pán [E]Bůh vše[C#]mohou[H]cí[br] Hoden je náš [A]Pán, hoden je náš [A]Pán, [H]On je sva[E]tý[br] [H]Sva[E]tý, je náš [A]Pán [E]Bůh vše[C#]mohou[H]cí[br] Hoden je náš [A]Pán, hoden je náš [A]Pán, [H]chvá[E]ly[br]",
             	"poznamky": "",
             	"capo": "",
             	"nahravka": "null",
             	"cirkev": "1"
            },
            {
              	"id": "150",
              	"nazev": "Alive (CZ)",
              	"autor": "Hillsong YoungFree",
              	"obsah": "Ztracený, srdce zlomené, teď už jsem chycen v Lásce Tvé.[br] Z popela znovu narozen, navěky, navždy zachráněn.[br] Ty jsi víc, než mohu říct, každý den jdu po cestách Tvých,[br] k Tobě jdu zrakem upřeným, Svobodný navždy svobodný.[br] [br] Tobě, Tobě dávám všechnu slávu[br] teď už jsem volný, už jsem volný,[br] Ty jsi mi dal svoji věčnou lásku[br] oh, oh, oh.[br] [br] Navěky žiješ v nás,[br] v mém srdci místo máš.[br] A všechno, co chci mít, [br] Tvou láskou volný být.[br] [br] Uprostřed noci v temnotě, zazáříš světlem lásky své.[br] Řetěžy spoutaný jsem byl, Ježíš, Tys mě zachránil.[br] Tenhle svět jednou pomine, jdu proti proudu ke tváři Tvé.[br] Ať si Tvá vůle naplní, ať sestoupí Tvoje království.[br]",
              	"poznamky": "",
              	"capo": "",
              	"nahravka": "null",
              	"cirkev": "1"
            },
            {
               	"id": "48",
               	"nazev": "Amazing Grace",
               	"autor": "",
               	"obsah": "[C] [F] [C] [G][br] Amazing Grace, how sweet the sound [br] That saved a wretch like me.[br] I once was lost but now am found,[br] Was blind, but now I see.[br] [br] Twas Grace that taught my heart to fear.[br] And Grace, my fears relieved.[br] How precious did that Grace appear[br] The hour I first believed.[br] [br] Through many dangers, toils and snares[br] I have already come;[br] This Grace that brought me safe thus far[br] and Grace will lead me home.[br] [br] When we've been here ten thousand years[br] Bright shining as the sun.[br] We've no less days to sing God's praise[br] Than when we've first begun.[br] [br] Amazing Grace, how sweet the sound,[br] That saved a wretch like me.[br] I once was lost but now am found,[br] Was blind, but now I see.[br]",
               	"poznamky": "od 4. capa - G C G D",
               	"capo": "0. capo",
               	"nahravka": "null",
               	"cirkev": "1"
            },
            {
                "id": "76",
                "nazev": "Anchor for the Soul",
                "autor": "",
                "obsah": "[E] [A] [H] [E][br] We have this hope [br] - as an anchor for the soul![br] Firm and secure [br] - we have this anchor for the soul![br] [br] [E] [A] [H] [E][br] Now i would walk five hundred miles[br] And i would walk five hundred more[br] Just to be the one who walks a thousand miles[br] To stand firm in my Lord[br] Da-da-da-da...[br] [br] [E] [A] [H] [E][br] And we believe that our God so loved the world[br] He gave His Son to be the anchor for our souls[br]",
                "poznamky": "",
                "capo": "",
                "nahravka": "null",
                "cirkev": "1"
            },
            {
                "id": "146",
                "nazev": "Áronovo požehnání (The Blessings)",
                "autor": "Elevation worship",
                "obsah": "[H] [E][br] Ať Pán žehná nám, chrání nás[br] [H] [F#][br] a rozzáří nad námi svoji tvář[br] [G#m] [E][br] Je laskavý shlédl k nám[br] [H] [F#] [H][br] a dal nám mír[br] [br] [G#m] [E] [H] [F#][br] Amen[br] [br] [G#m] [E] [H] [F#][br] Jeho přízeň ať nás chrání[br] Ať v nás šíří požehnání[br] Naše blízké v jejich pláči [br] Ve zlých chvílích ať je chrání[br] [br] [G#m] [E] [H] [F#][br] Jeho láska, ať se sklání[br] K národům, s požehnáním[br] Po tisíce pokolení[br] Ať je s námi, ať je s námi[br]",
                "poznamky": "",
                "capo": "",
                "nahravka": "null",
                "cirkev": "1"
            },
            {
                "id": "74",
                "nazev": "Awesome God",
                "autor": "Hillsong United",
                "obsah": "[Hm]Our [G]God [br] is an [D]awesome God he [A]reigns [br] From [Hm]heaven above with [G]wisdom, [br] [D]power and love[br] Our [Em]God is an [A]awesome [Hm]God[br]",
                "poznamky": "",
                "capo": "3,",
                "nahravka": "null",
                "cirkev": "1"
            },
            {
                "id": "135",
                "nazev": "Be Born In Me",
                "autor": "Francesca Battistelli",
                "obsah": "[G] [C] [Am] [D][br] Everything inside me cries for order[br] Everything inside me wants to hide[br] Is this shadow an angel or a warrior?[br] If God is pleased with me, why am I so terrified?[br] [Am] [D][br] Someone tell me I am only dreaming[br] [Am] [G] [D][br] Somehow help me see with Heaven's eyes[br] [Am] [Em] [C] [D][br] And before my head agrees, my heart is on it's knees[br] Holy is He. Blessed am I[br] [br] [D] [Em] [C] [G][br] Be born in me. Be born in me[br] [D] [Em] [C] [D][br] Trembling heart, somehow I believe[br] that You chose me[br] [Am] [D][br] I'll hold you in the beginning[br] You will hold me in the end[br] [Am] [D] [G][br] Every moment in the middle[br] make my heart your Bethlehem[br] Be born in me[br] [br] [G] [C] [Am] [D][br] All this time we've waited for the promise[br] All this time You've waited for my arms[br] Did You wrap yourself inside the unexpected[br] So we might know that Love would go that far?[br] [br] [C] [D][br] I am not brave I'll never be[br] [Em] [D] [G][br] The only thing my heart can offer is a vacancy[br] [C] [D][br] I'm just a girl nothing more[br] [Em] [D] [c][br] But I am willing, I am Yours[br]",
                "poznamky": "",
                "capo": "5. capo",
                "nahravka": "null",
                "cirkev": "1"
            }
    ];
    res.json(worships).end()
})

// Get a full listing of playlists
app.get('/playlists', async (req, res) => {
    const playlists = [
            {id: 3, datum:"25. září 2022", sestava: "Všichni", poznamka: "-", chvaly: "10 000 důvodů, Bůh náš neotřesitelný, Closer, Duchu Svatý jsi tu vítaný"},
            {id: 3, datum:"18. září 2022", sestava: "Sam a Markétka", poznamka: "Zkouška začíná až v 8:30", chvaly: "Ježíš přítel hříšných, Above All, Jsi Cesta, Hledám Tvoji tvář"},
            {id: 3, datum:"11. září 2022", sestava: "Sam, Markétka a Grace", poznamka: "Zkusíme jednu úplně novou chválu", chvaly: "Já tě chci více znát, Ježíš je jméno nad každé jméno, Jsem nový, Jsi světem mým, Nikdy nekončíci milost"}
    ];
    res.json(playlists).end()
})

// Get a full listing of tasks
app.get('/tasks', async (req, res) => {
    const tasks = [
            {id: 3, nadpis:"Naučit se bridge k Jsi cesta", datum: "20.8.2022", sdilen: "Samuel Šenigl, Markéta Šeniglová", stav: "čeká na splnění"},
            {id: 3, nadpis:"Cvičit vyhrávku k 10 000 Reasons", datum: "1.9.2022", sdilen: "Samuel Šenigl", stav: "hotový"},
    ];
    res.json(tasks).end()
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
