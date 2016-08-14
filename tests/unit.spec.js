const { describe, it } = require('mocha');
const { expect } = require('chai');
const statusClass = require('../src/matcher');


describe('Constants', () => {

	describe('INFORMATIONAL', () => {

		it('exist', () => {
			expect(statusClass.INFORMATIONAL).to.exist;
		});

		it('has expected value', () => {
			expect(statusClass.INFORMATIONAL).to.equal(1);
		});
 
	});

	describe('SUCCESS', () => {

		it('exist', () => {
			expect(statusClass.SUCCESS).to.exist;
		});

		it('has expected value', () => {
			expect(statusClass.SUCCESS).to.equal(2);
		});
 
	});

	describe('REDIRECTION', () => {

		it('exist', () => {
			expect(statusClass.REDIRECTION).to.exist;
		});

		it('has expected value', () => {
			expect(statusClass.REDIRECTION).to.equal(3);
		});
 
	});

	describe('CLIENT_ERROR', () => {

		it('exist', () => {
			expect(statusClass.CLIENT_ERROR).to.exist;
		});

		it('has expected value', () => {
			expect(statusClass.CLIENT_ERROR).to.equal(4);
		});
 
	});

	describe('SERVER_ERROR', () => {

		it('exist', () => {
			expect(statusClass.SERVER_ERROR).to.exist;
		});

		it('has expected value', () => {
			expect(statusClass.SERVER_ERROR).to.equal(5);
		});
 
	});

});	

describe('Matcher', () => {

	it('exist', () => {
		expect(statusClass.match).to.exist;
	});

	it('is a function', () => {
		expect(statusClass.match).instanceOf(Function);
	});


	describe('when status code is 1**', () => {
		it('should return INFORMATIONAL', () => {
			const codes = statusClassSequence(statusClass.INFORMATIONAL);

			for (let code of codes) {
				expect(statusClass.match(code)).to.equal(statusClass.INFORMATIONAL);
			}
		})
	});

	describe('when status code is 2**', () => {
		it('should return SUCCESS', () => {
			const codes = statusClassSequence(statusClass.SUCCESS);

			for (let code of codes) {
				expect(statusClass.match(code)).to.equal(statusClass.SUCCESS);
			}
		})
	});

	describe('when status code is 3**', () => {
		it('should return REDIRECTION', () => {
			const codes = statusClassSequence(statusClass.REDIRECTION);

			for (let code of codes) {
				expect(statusClass.match(code)).to.equal(statusClass.REDIRECTION);
			}
		})
	});

	describe('when status code is 4**', () => {
		it('should return CLIENT_ERROR', () => {
			const codes = statusClassSequence(statusClass.CLIENT_ERROR);

			for (let code of codes) {
				expect(statusClass.match(code)).to.equal(statusClass.CLIENT_ERROR);
			}
		})
	});

	describe('when status code is 5**', () => {
		it('should return SERVER_ERROR', () => {
			const codes = statusClassSequence(statusClass.SERVER_ERROR);

			for (let code of codes) {
				expect(statusClass.match(code)).to.equal(statusClass.SERVER_ERROR);
			}
		})
	});

});


describe('Helpers', () => {

	describe('isInformational', () => {

		it('exist', () => {
			expect(statusClass.isInformational).to.exist
		});

		it('is a function', () => {
			expect(statusClass.isInformational).instanceOf(Function);
		});

		it('should return true if class is 1**', () => {
			const codes = statusClassSequence(statusClass.INFORMATIONAL);

			for (let code of codes) {
				expect(statusClass.isInformational(code)).to.be.true;
			}
		});

		it('should return false if class is not 1**', () => {
			expect(statusClass.isInformational(301)).to.be.false;
		});
	});

	describe('isSuccess', () => {

		it('exist', () => {
			expect(statusClass.isSuccess).to.exist
		});

		it('is a function', () => {
			expect(statusClass.isSuccess).instanceOf(Function);
		});

		it('should return true if class is 2**', () => {
			const codes = statusClassSequence(statusClass.SUCCESS);

			for (let code of codes) {
				expect(statusClass.isSuccess(code)).to.be.true;
			}
		});

		it('should return false if class is not 2**', () => {
			expect(statusClass.isSuccess(301)).to.be.false;
		});
	});

	describe('isRedirection', () => {

		it('exist', () => {
			expect(statusClass.isRedirection).to.exist
		});

		it('is a function', () => {
			expect(statusClass.isRedirection).instanceOf(Function);
		});

		it('should return true if class is 3**', () => {
			const codes = statusClassSequence(statusClass.REDIRECTION);

			for (let code of codes) {
				expect(statusClass.isRedirection(code)).to.be.true;
			}
		});

		it('should return false if class is not 3**', () => {
			expect(statusClass.isRedirection(200)).to.be.false;
		});
	});

	describe('isClientError', () => {

		it('exist', () => {
			expect(statusClass.isClientError).to.exist
		});

		it('is a function', () => {
			expect(statusClass.isClientError).instanceOf(Function);
		});

		it('should return true if class is 4**', () => {
			const codes = statusClassSequence(statusClass.CLIENT_ERROR);

			for (let code of codes) {
				expect(statusClass.isClientError(code)).to.be.true;
			}
		});

		it('should return false if class is not 4**', () => {
			expect(statusClass.isClientError(200)).to.be.false;
		});
	});

	describe('isServerError', () => {

		it('exist', () => {
			expect(statusClass.isServerError).to.exist
		});

		it('is a function', () => {
			expect(statusClass.isServerError).instanceOf(Function);
		});

		it('should return true if class is 5**', () => {
			const codes = statusClassSequence(statusClass.SERVER_ERROR);

			for (let code of codes) {
				expect(statusClass.isServerError(code)).to.be.true;
			}
		});

		it('should return false if class is not 5**', () => {
			expect(statusClass.isServerError(200)).to.be.false;
		});
	});

});


function* statusClassSequence(num) {
	const lengths = [3, 8, 8, 29, 11];
	const extras = [null, [226], null, [431, 444, 451, 499], [599]];

	for (let i=0; i<lengths[num-1]; i++) yield num * 100 + i;
	}

	if (extras[num - 1]) yield* extras[num - 1];
}
