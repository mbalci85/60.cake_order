// Build the Patisserie Cake Order page functionality.
// You have 3 steps; take order, calculate payment, check stock.

const patisserie = {
	bananaCaramel: {
		stock: 3,
		price: 9.99,
	},
	contessa: {
		stock: 5,
		price: 7.99,
	},
	concorde: {
		stock: 11,
		price: 22.99,
	},
	mouseCake: {
		stock: 8,
		price: 16.99,
	},
	confettiSuprise: {
		stock: 9,
		price: 14.99,
	},
};

const cakeType = document.getElementById('cakeSelect');
const cakeAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

const checkOrder = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`You ordered ${cakeAmount.value} ${cakeType.value}`);
			if (patisserie[cakeType.value].stock >= cakeAmount.value) {
				let cost = cakeAmount.value * patisserie[cakeType.value].price;
				console.log(
					`All of the items are in stock. The total cost of the order is ${cost}`,
				);
				resolve([cakeType.value, cakeAmount.value, cost]);
			} else {
				reject('There is a problem, we can not proceed your order!!!');
			}
		}, 1000);
	});
};

const payment = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Press 1 if it is ok?');
			let approve = prompt('Press 1 if it is ok...');
			if (approve == '1') {
				console.log(
					`Payment is processed and completed... You paid $${order[2]}`,
				);
				patisserie[order[0]].stock -= order[1];
				resolve([order[0], order[1]]);
			}
		}, 2000);
	});
};

const stockControl = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('To Cashier: Wait for checking stock....');
			if (patisserie[order[0]].stock > 2) {
				resolve(`${order[0]} stock is enough`);
			} else {
				resolve(
					`${order[0]} stock is ${
						patisserie[order[0]].stock
					} and it's critical`,
				);
			}
		}, 3000);
	});
};

orderBtn.onclick = () => {
	checkOrder()
		.then((resolvedValue) => {
			return payment(resolvedValue);
		})
		.then((resolvedValue) => {
			return stockControl(resolvedValue);
		})
		.then((resolvedValue) => console.log(resolvedValue));
};
