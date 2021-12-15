const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
	dimensions: [ 1080, 1080 ]
};

const colors = ['yellow', 'blue', 'red'];

//Source => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const sketch = () => {
	return ({ context, width, height }) => {
		let my_gradient = context.createLinearGradient(0, 0, 0, 170);
    my_gradient.addColorStop(0, 'black');
    my_gradient.addColorStop(1, 'white');
    context.fillStyle = my_gradient;
		context.fillRect(0, 0, width, height);

		context.fillStyle = colors[getRandomInt(0, colors.length)];

		const cx = width  * 1.0;
		const cy = height * 1.0;

		const w = width  * 0.01;
		const h = height * 0.1;
		let x, y;

		const num = 40;
		const radius = width * 0.75;

		for (let i = 0; i < num; i++) {
			const slice = math.degToRad(360 / num);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);
			y = cy + radius * Math.cos(angle);

			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

			context.beginPath();
			context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
			context.fill();
			context.restore();

			context.save();
			context.translate(cx, cy);
			context.rotate(-angle);

			context.lineWidth = random.range(5, 20);

			context.beginPath();
			context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
			context.stroke();

			context.restore();
		}
	};
};

canvasSketch(sketch, settings);
