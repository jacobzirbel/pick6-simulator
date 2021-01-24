const runButton = document.getElementById('run-button');
const timer = document.getElementById('timer');
const results = document.getElementById('results');
const timerText = (num) => (num/100).toFixed(2)
let timerNum =0; 
timer.textContent = timerText(timerNum); 
let intervalId;
runButton.onclick= ()=>{
	intervalId = setInterval(()=>{
		timerNum+=1	
		timer.textContent = timerText(timerNum); 
	},10)

	console.log('running')

	$.ajax({
			type: "GET",
			url: "/api/run",
			success: (data)=>{
				console.log(data);
				results.textContent = JSON.stringify(data, null, 3)
				clearInterval(intervalId);
			}
		})	
		
	}
/*
		$.ajax({
			type: "POST",
			url: "/api/friends",
			data: { values },
			success: success,
		});
});
*/
function success(e) {
	$("#close").on("click", () => {
		window.location.href = "/home";
	});
	let text = "";
	e.forEach((e, i) => {
		text += `${i + 1}: ${e.name} <br />`;
		text += `&nbsp;&nbsp; Match Score: ${e.score} <br />`;
		text += e.bio;
		text += "<hr />";
	});
	document.getElementById("modal-title").textContent = "Closest Matches";

	document.getElementById("modal-body").innerHTML = text;
	$("#modal").modal({ show: true });
}
