const perceptron = (w0, ...weights) => {
	return (...x) => {
		const sum = weights
			.map((w, i) => w * x[i])
			.reduce((acc, t) => t + acc, 0);
		return sum >= w0 ? 1 : -1;
	};
};

const or = perceptron(0.3, 0.5, 0.5);
const and = perceptron(0.75, 0.5, 0.5);

const n1 = perceptron(1, 1);
const n2 = perceptron(2, 1, 1);
const n3 = perceptron(1, 1);
const n4 = perceptron(1, 1, -2, 1);
const xor = (x, y) => n4(n1(x), n2(x, y), n3(y)); 

const traning = (p, t) => {
	const n = 0.1;
}

const p = perceptron(0.6, 0.3, 0.4);

//traning(p(0, 1), 1,)