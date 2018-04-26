class InputXl {
	// принимает арг1 = форму, арг2 = кнопку
	constructor(arg1){
		this.form = arg1;
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
	constructor(){

	}

	render() {

	}
}


class Main {
	constructor () {
		this.inp = new InputXl(document.querySelector('.excel-copy'));
		this.table = new Table (document.querySelector('#result'));
		this.btn = document.querySelector('.submit-excel');
		this.btn.onclick = this.btnClick.bind(this);
	}

	btnClick(){
		let table = this.inp.getTable();
	}
}

let app = new Main();
