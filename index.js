'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send(makeBadJoke())
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    sendTextMessage(sender, makeBadJoke());
	    }
    }
    res.sendStatus(200);
})

const token = process.env.PAGE_ACCESS_TOKEN;

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function makeBadJoke(){
	var joke = "";
	var question_index = Math.floor(Math.random() * jokes.length - 1);
	var answer_index = (Math.floor((Math.random() * jokes.length - 1)) + question_index) % jokes.length;
	joke += "Q: " + jokes[question_index].question;
	joke += "\nA: " + jokes[answer_index].answer;

	return joke;
}

var jokes = [
    {
        "question": "How can you get four suits for a dollar?",
        "answer": "Buy a deck of cards."
    },
    {
        "question": "How do dinosaurs pay their bills?",
        "answer": "With Tyrannosaurus checks."
    },
    {
        "question": "What do you call a dinosaur that smashes everything in its path?",
        "answer": "Tyrannosaurus wrecks."
    },
    {
        "question": "What do you call a dinosaur that wears a cowboy hat and boots?",
        "answer": "Tyrannosaurus Tex."
    },
    {
        "question": "How do we know the Indians were the first people in North America?",
        "answer": "They had reservations."
    },
    {
        "question": "How do you make a hot dog stand?",
        "answer": "Steal its chair."
    },
    {
        "question": "How do you make an egg laugh?",
        "answer": "Tell it a yolk."
    },
    {
        "question": "How do you prevent a Summer cold?",
        "answer": "Catch it in the Winter!"
    },
    {
        "question": "How does a pig go to hospital?",
        "answer": "In a hambulance."
    },
    {
        "question": "If a long dress is evening wear, what is a suit of armor?",
        "answer": "Silverware."
    },
    {
        "question": "What bird can lift the most?",
        "answer": "A crane."
    },
    {
        "question": "What bone will a dog never eat?",
        "answer": "A trombone."
    },
    {
        "question": "What can you hold without ever touching it?",
        "answer": "A conversation."
    },
    {
        "question": "What clothes does a house wear?",
        "answer": "Address."
    },
    {
        "question": "What country makes you shiver?",
        "answer": "Chile."
    },
    {
        "question": "What did one elevator say to the other?",
        "answer": "I think I'm coming down with something!"
    },
    {
        "question": "What did one magnet say to the other?",
        "answer": "I find you very attractive."
    },
    {
        "question": "What did Tennessee?",
        "answer": "The same thing Arkansas."
    },
    {
        "question": "What did Delaware?",
        "answer": "Her New Jersey."
    },
    {
        "question": "What did the mother broom say to the baby broom?",
        "answer": "It's time to go to sweep."
    },
    {
        "question": "What did the necktie say to the hat?",
        "answer": "You go on ahead. I'll hang around for a while."
    },
    {
        "question": "What did the rug say to the floor?",
        "answer": "Don't move, I've got you covered."
    },
    {
        "question": "What do bees do with their honey?",
        "answer": "They cell it."
    },
    {
        "question": "What do you call a calf after it's six months old?",
        "answer": "Seven months old."
    },
    {
        "question": "What do you call a guy who's born in Columbus, grows up in Cleveland, and then dies in Cincinnati?",
        "answer": "Dead."
    },
    {
        "question": "Why does the Easter Bunny have a shiny nose?",
        "answer": "His powder puff is on the wrong end."
    },
    {
        "question": "Why was Cinderella thrown off the basketball team?",
        "answer": "She ran away from the ball."
    },
    {
        "question": "Why were the teacher's eyes crossed?",
        "answer": "She couldn't control her pupils."
    },
    {
        "question": "What do you call a pig that does karate?",
        "answer": "A pork chop."
    },
    {
        "question": "What do you call a song sung in an automobile?",
        "answer": "A cartoon."
    },
    {
        "question": "What do you call the best butter on the farm?",
        "answer": "A goat."
    },
    {
        "question": "What do you do when your chair breaks?",
        "answer": "Call a chairman."
    },
    {
        "question": "What do you get if you cross a chicken with a cement mixer?",
        "answer": "A brick layer!"
    },
    {
        "question": "What do you get if you cross an elephant and a kangaroo?",
        "answer": "Big holes all over Australia!"
    },
    {
        "question": "What do you get if you cross an insect with the Easter rabbit?",
        "answer": "Bugs Bunny."
    },
    {
        "question": "What do you get when you cross a stream and a brook?",
        "answer": "Wet feet."
    },
    {
        "question": "What do you get when you cross poison ivy with a 4-leaf clover?",
        "answer": "A rash of good luck."
    },
    {
        "question": "What happens when frogs park illegally?",
        "answer": "They get toad."
    },
    {
        "question": "What has 6 eyes but can't see?",
        "answer": "3 blind mice."
    },
    {
        "question": "What has a lot of keys but can not open any doors?",
        "answer": "A piano."
    },
    {
        "question": "What has one horn and gives milk?",
        "answer": "A milk truck."
    },
    {
        "question": "What is a tree's favorite drink?",
        "answer": "Root beer."
    },
    {
        "question": "What is the best thing to do if you find a gorilla in your bed?",
        "answer": "Sleep somewhere else."
    },
    {
        "question": "What kind of cats like to go bowling?",
        "answer": "Alley cats."
    },
    {
        "question": "What kind of eggs does a wicked chicken lay?",
        "answer": "Deviled eggs."
    },
    {
        "question": "What kind of ties can't you wear?",
        "answer": "Railroad ties."
    },
    {
        "question": "What lies on its back, one hundred feet in the air?",
        "answer": "A dead centipede."
    },
    {
        "question": "What do you call a country where everyone has to drive a red car?",
        "answer": "A red carnation."
    },
    {
        "question": "What do you call a country where everyone has to drive a pink car?",
        "answer": "A pink car-nation."
    },
    {
        "question": "What would the country be called if everyone in it lived in their cars?",
        "answer": "An in-car-nation."
    },
    {
        "question": "What's gray, eats fish, and lives in Washington, D.C.?",
        "answer": "The Presidential Seal."
    },
    {
        "question": "What's green and loud?",
        "answer": "A froghorn."
    },
    {
        "question": "What's round and bad-tempered?",
        "answer": "A vicious circle."
    },
    {
        "question": "Where did the farmer take the pigs on Saturday afternoon?",
        "answer": "He took them to a pignic."
    },
    {
        "question": "Where do fortune tellers dance?",
        "answer": "At the crystal ball."
    },
    {
        "question": "Why did the doughnut shop close?",
        "answer": "The owner got tired of the (w)hole business!"
    }
];