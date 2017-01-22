	$(document).ready(function(){

		var cvs = $("canvas").get(0);
		var ctx = cvs.getContext("2d");
		var w = cvs.width;
		var h = cvs.height;
		var timeout;
		var gravity = 0.3;
		var bounce = 0.7;
		var friction = 0.75;
		var mouseX;
		var mouseY; 
		var dx;
		var dy;

		function init(){

			sphere = {
				x: w/2,
				y: 50,
				r: 20,
				vx: 0,
				vy: 0
			};

			draw();
		}

		function draw(){

			ctx.clearRect(0, 0, w, h);

			drawSphere();
			updateSphere();

			requestAnimationFrame(draw);
		}

		function updateSphere(){

			sphere.vy += gravity;
			sphere.x += sphere.vx;
			sphere.y += sphere.vy;

			if(sphere.y >= h - sphere.r){
				sphere.vy *= -bounce;
				sphere.y =h-sphere.r;
				
			}

			if(sphere.y < 0 + sphere.r){
				sphere.vy *= -bounce;
				sphere.y = 0 + sphere.r;
			}	

			if(sphere.x > w - sphere.r){
				sphere.vx *= -bounce;
				sphere.x = w - sphere.r;
			}

			if(sphere.x < 0 + sphere.r){
				sphere.vx *= -bounce;
				sphere.x = 0 + sphere.r;
			}

		}

		function drawSphere(){
			ctx.fillStyle = "grey";
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.arc(sphere.x,sphere.y, sphere.r, 0, 2*Math.PI);
			ctx.fill();
		}
		
		$("canvas").mousemove(function(e){
			mouseX = e.offsetX;
			mouseY = e.offsetY;		

		});

		$("canvas").mousedown(function(e){
			timeout = setInterval(function(){
				dx = mouseX - sphere.x;
				dy = mouseY - sphere.y;

				sphere.vx += dx*gravity;
				sphere.vy += dy*gravity; 

				sphere.vx *= friction;
				sphere.vy *= friction;
			}, 60);
			
		});

		$("canvas").mouseup(function(e){
			clearInterval(timeout);

		});

		$("canvas").mouseout(function(e){
			clearInterval(timeout);
		});	
		
		init();

	});