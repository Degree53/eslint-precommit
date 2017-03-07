/**
 * Test cases take from
 * https://github.com/eslint/eslint/blob/c9a7ec57604519046fdd267e6bb5ccfe9107ba69/tests/lib/options.js
 * Original author - George Zahariev
 *
 * @fileoverview Tests for options.
 */

import { expect } from 'chai';
import options from '../src/options';

describe('options', () => {

	describe('--config', () => {
		it('should return a string for .config when passed a string', () => {
			const currentOptions = options.parse('--config file');

			expect(currentOptions.config).to.be.a('string');
			expect(currentOptions.config).to.equal('file');
		});
	});

	describe('-c', () => {
		it('should return a string for .config when passed a string', () => {
			const currentOptions = options.parse('-c file');

			expect(currentOptions.config).to.be.a('string');
			expect(currentOptions.config).to.equal('file');
		});
	});

	describe('--ext', () => {
		it('should return an array with one item when passed .jsx', () => {
			const currentOptions = options.parse('--ext .jsx');

			expect(currentOptions.ext).to.be.an('array').and.to.have.a.lengthOf(1);
			expect(currentOptions.ext).include('.jsx');
		});

		it('should return an array with two items when passed .js and .jsx', () => {
			const currentOptions = options.parse('--ext .jsx --ext .js');

			expect(currentOptions.ext).to.be.an('array').and.to.have.a.lengthOf(2);
			expect(currentOptions.ext).to.include('.jsx').and.include('.js');
		});

		it('should return an array with two items when passed .jsx,.js', () => {
			const currentOptions = options.parse('--ext .jsx,.js');

			expect(currentOptions.ext).to.be.an('array').and.to.have.a.lengthOf(2);
			expect(currentOptions.ext).to.include('.jsx').and.include('.js');
		});

		it('should return an array one item when not passed', () => {
			const currentOptions = options.parse('');

			expect(currentOptions.ext).to.be.an('array').and.to.have.a.lengthOf(1);
			expect(currentOptions.ext).to.include('.js');
		});
	});

	describe('--rulesdir', () => {
		it('should return a string for .rulesdir when passed a string', () => {
			const currentOptions = options.parse('--rulesdir /morerules');

			expect(currentOptions.rulesdir).to.be.an('array').and.to.have.a.lengthOf(1);
			expect(currentOptions.rulesdir).to.include('/morerules');
		});
	});

	describe('when asking for help', () => {
		it('should return string of help text when called', () => {
			const helpText = options.generateHelp();

			expect(helpText).to.be.a('string');
		});
	});

	describe('--no-ignore', () => {
		it('should return false for .ignore when passed', () => {
			const currentOptions = options.parse('--no-ignore');

			expect(currentOptions.ignore).to.be.false();
		});
	});

	describe('--ignore-path', () => {
		it('should return a string for .ignorePath when passed', () => {
			const currentOptions = options.parse('--ignore-path .gitignore');

			expect(currentOptions.ignorePath).to.equal('.gitignore');
		});
	});

	describe('--ignore-pattern', () => {
		it('should return a string array for .ignorePattern when passed', () => {
			const currentOptions = options.parse('--ignore-pattern *.js');

			expect(currentOptions.ignorePattern).to.be.an('array').and.have.lengthOf(1);
			expect(currentOptions.ignorePattern).to.include('*.js');
		});

		it('should return a string array for multiple values', () => {
			const currentOptions = options.parse('--ignore-pattern *.js --ignore-pattern *.ts');

			expect(currentOptions.ignorePattern).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.ignorePattern).to.include('*.js').and.include('*.ts');
		});

		it('should return a string array of properly parsed values, when those values include commas', () => {
			const currentOptions = options.parse('--ignore-pattern *.js --ignore-pattern foo-{bar,baz}.js');

			expect(currentOptions.ignorePattern).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.ignorePattern).to.include('*.js').and.include('foo-{bar,baz}.js');
		});
	});

	describe('--global', () => {
		it('should return an array for a single occurrence', () => {
			const currentOptions = options.parse('--global foo');

			expect(currentOptions.global).to.be.an('array').and.have.lengthOf(1);
			expect(currentOptions.global).to.include('foo');
		});

		it('should split variable names using commas', () => {
			const currentOptions = options.parse('--global foo,bar');

			expect(currentOptions.global).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.global).to.include('foo').and.include('bar');
		});

		it('should not split on colons', () => {
			const currentOptions = options.parse('--global foo:false,bar:true');

			expect(currentOptions.global).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.global).to.include('foo:false').and.include('bar:true');
		});

		it('should concatenate successive occurrences', () => {
			const currentOptions = options.parse('--global foo:true --global bar:false');

			expect(currentOptions.global).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.global).to.include('foo:true').and.include('bar:false');
		});
	});

	describe('--plugin', () => {
		it('should return an array when passed a single occurrence', () => {
			const currentOptions = options.parse('--plugin single');

			expect(currentOptions.plugin).to.be.an('array').and.have.lengthOf(1);
			expect(currentOptions.plugin).to.include('single');
		});

		it('should return an array when passed a comma-delimiated string', () => {
			const currentOptions = options.parse('--plugin foo,bar');

			expect(currentOptions.plugin).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.plugin).to.include('foo').and.include('bar');
		});

		it('should return an array when passed multiple times', () => {
			const currentOptions = options.parse('--plugin foo --plugin bar');

			expect(currentOptions.plugin).to.be.an('array').and.have.lengthOf(2);
			expect(currentOptions.plugin).to.include('foo').and.include('bar');
		});
	});

	describe('--inline-config', () => {
		it('should return false when passed --no-inline-config', () => {
			const currentOptions = options.parse('--no-inline-config');

			expect(currentOptions.inlineConfig).to.be.false();
		});

		it('should return true for --inline-config when empty', () => {
			const currentOptions = options.parse('');

			expect(currentOptions.inlineConfig).to.be.true();
		});
	});

	describe('--parser', () => {
		it('should return a string for --parser when passed', () => {
			const currentOptions = options.parse('--parser test');

			expect(currentOptions.parser).to.equal('test');
		});
	});

});
