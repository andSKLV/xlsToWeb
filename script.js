class InputXl {
	// принимает арг1 = форму, арг2 = кнопку
	constructor(el){
		this.form = el;
		this.parsedXl = null;
	}
/** Основной метод к которому и будем обращаться в главном 
	@return {Object} - 
**/	
	getTable(){
		let xl = this._getXl();
		xl = this._parseXl(xl);
		return xl;
	}

	_getXl(){
		return this.form.value;
	}

/**	@param {String} xl - таблица полученная из формы
	@return {Object} table - объект из массивов rows
**/
	_parseXl(xl){
		let table = {};
		let rows = xl.split(String.fromCharCode(10));
		rows.forEach((row,i)=>
			table[`row${i}`] = row.split(String.fromCharCode(9)))
		return table;
	}
}

class Table {
	constructor(el){
		this.rowTable = {};
		this.form = el;
		this.table = null;
	}

	check () {

	} 

	setTable(rt) {
		// this.check(rt);
		this.rowTable = rt;
	}

	renderTable() {		
		let tPlace = this.form.querySelector('table');
		
		Object.values(this.rowTable).forEach((row,iR)=>{
			let tr = document.createElement('tr');
			tr.dataset.rowN = iR;
			row.forEach((cell,iC)=>{
				let td = document.createElement('td');
				td.dataset.cellN = `${iR}-${iC}`;
				td.textContent = cell;
				tr.append(td);
			})
			tPlace.append(tr)
		});
		this.table = tPlace;
	}

	renderCode(){
		let cPlace = this.form.querySelector('#code-text');
		cPlace.textContent = this.table.innerHTML;
	}

	clear() {
		let tPlace = this.form.querySelector('table');
		let cPlace = this.form.querySelector('#code-text');
		tPlace.innerHTML = '';
		cPlace.innerHTML = '';
	}
}


class Main {
	constructor () {
		this.inp = new InputXl(document.querySelector('.excel-copy'));
		this.result = new Table (document.querySelector('#result'));

		this.btn = document.querySelector('.submit-excel');
		this.btn.onclick = this.btnClick.bind(this);
	}

	btnClick(){
		let rowTable = this.inp.getTable();
		this.result.setTable (rowTable);
		this.result.clear();
		this.result.renderTable();
		this.result.renderCode();
	}
}

let app = new Main();
