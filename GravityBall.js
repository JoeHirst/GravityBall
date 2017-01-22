$(document).ready(function(){

		var cvs = $("canvas").get(0);
		var ctx = cvs.getContext("2d");
		var w = cvs.width;
		var h = cvs.height;
		var timeout;
		var gravity = 0.3;
		var bounce = 0.7;
		var friction = 0.7;
		var groundFriction = 0.9;
		var mouseX;
		var mouseY; 
		var dx;
		var dy;
		var count = [];
		var r = 20;

		function init(){

			count.length = 3;

			for(var i = 0; i < count.length; i++){
				count[i] = new sphere(Math.random()*w, Math.random()*h, r, 0, 0);
			}

			draw();
		}

		var sphere = function(x, y, r, vx, vy) {
			this.x=x;
			this.y =y;
			this.r = r;
			this.vx = vx;
			this.vy = vy;
		};

		function draw(){

			ctx.clearRect(0, 0, w, h);

			drawSphere();
			updateSphere();

			requestAnimationFrame(draw);
		}

		function updateSphere(){

			for(var i = 0; i < count.length; i++){
				count[i].vy += gravity;
				count[i].x += count[i].vx;
				count[i].y += count[i].vy;

				if(count[i].y >= h - count[i].r){
					count[i].vy *= -bounce;
					count[i].y =h-count[i].r;
					count[i].vx *= groundFriction;
				}

				if(count[i].y < 0 + count[i].r){
					count[i].vy *= -bounce;
					count[i].y = 0 + count[i].r;
				}	

				if(count[i].x > w - count[i].r){
					count[i].vx *= -bounce;
					count[i].x = w - count[i].r;
				}

				if(count[i].x < 0 + count[i].r){
					count[i].vx *= -bounce;
					count[i].x = 0 + count[i].r;
				}
			}

		}

		function drawSphere(){
			ctx.fillStyle = "grey";
			ctx.strokeStyle = "black";
			for(var i = 0; i < count.length; i++){
				ctx.beginPath();
				ctx.arc(count[i].x,count[i].y, count[i].r, 0, 2*Math.PI);
				ctx.fill();
			}
		}
		
		$("canvas").mousemove(function(e){
			mouseX = e.offsetX;
			mouseY = e.offsetY;		

		});

		$("canvas").mousedown(function(e){
			timeout = setInterval(function(){
				for(var i = 0; i < count.length; i++){
					dx = mouseX - count[i].x;
					dy = mouseY - count[i].y;

					count[i].vx += dx*gravity;
					count[i].vy += dy*gravity; 

					count[i].vx *= friction;
					count[i].vy *= friction;
				}
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