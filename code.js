console.time('a')
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
console.timeEnd('a');
console.timeEnd('b');
