const express = require("express");
const router = express.Router();
const friends = require("../data/friends");
router
	.route("/friends")
	.get((req, res) => {
		res.json(friends);
	})
	.post((req, res) => {
		let [name, bio, ...answers] = req.body.values;
		let submitter = { name, bio, answers };
		let bestMatch = getTopMatches(submitter);
		friends.push(submitter);
		res.json(bestMatch);
	});

router.route("/delete/:id").get((req, res) => {
	if (friends[req.params.id]) friends.splice(req.params.id, 1);
	res.redirect("/api/all");
});
router.route("/all").get((req, res) => {
	res.json(friends);
});
router.route("/clear").get((req, res) => {
	friends.length = 1;
	res.redirect("/");
});
module.exports = router;
router.route('/run').get((req, res)=>{
		console.log('run')
	function Answer(guess, val){
		return {guess, val};
	}
	function Person(name,answer1, answer2, answer3, answer4, answer5, answer6 ){
		return {name,answer1, answer2, answer3, answer4, answer5, answer6 };
	}
	const getPoints = (correct, answer) =>{
		let points = 0;
		Object.keys(correct).forEach(prop=>{
			if(prop === 'name') return;
			Object.keys(correct[prop]).forEach(e=>{
					if(correct[prop].guess !== answer[prop].guess)return;
					if(correct[prop][e] == answer[prop][e])
					points++;
					})
		})
		return points;
	}

	const rand = (n) =>Math.floor( Math.random() * n);
	const newAnswer = () => Answer(Math.random() - .5 > 0, rand(6));
	const newPerson = (name) => Person(name,newAnswer(),newAnswer(),newAnswer(),newAnswer(),newAnswer(),newAnswer());
	
	let people = [];
	let n = 1000000;
	
	while(n--){
		people.push(newPerson(n));
	}
	
	const correctAnswer = newPerson();
	let scores = {};
	console.time('b')
	for(let person of people){
		if(!person)break;
		let points = getPoints(correctAnswer, person);
		scores[points+''] = scores[points+''] ? scores[points+'']+1 :1 ;
	}
	
	console.log(scores);
	console.log(getPoints(correctAnswer, correctAnswer));
	res.json({scores, correctAnswer})
})
	
function getTopMatches(submitter) {
	let scores = friends.map((friend) => {
		let score = 100,
			n = 0,
			len = submitter.answers.length;
		while (n < len) {
			score -= Math.abs(friend.answers[n] - submitter.answers[n]);
			n++;
		}
		return { name: friend.name, bio: friend.bio, score };
	});
	let sortedScores = scores.sort((a, b) => b.score - a.score);
	if (sortedScores.length > 3) sortedScores.length = 3;
	return sortedScores;
}
