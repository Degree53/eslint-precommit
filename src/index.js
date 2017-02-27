#!/usr/bin/env node
const git = require('git-utils');
const CLIEngine = require('eslint').CLIEngine;
const path = require('path');

const options = require('minimist')(process.argv.slice(2), {
	alias: {
		config: 'c',
		extensions: 'ext'
	},
	boolean: ['no-eslintrc', 'cache', 'ignore', 'no-inline-config'],
	default: {
		config: null,
		env: [],
		extensions: ['.js'],
		global: [],
		'no-eslintrc': false,
		parser: 'espree',
		cache: false,
		'cache-location': '.eslintrc',
		rulesdir: [],
		plugin: [],
		'no-ignore': false,
		'ignore-path': null,
		'ignore-pattern': [],
		'no-inline-config': false
	}
});

// Get the git repo from the working directory
const repository = git.open(process.cwd());

const stagedFiles = Object.keys(repository.getStatus())

	// Get all staged files
	.filter(filepath => repository.isPathStaged(filepath))

	.map(filepath => path.normalize(path.join(process.cwd(), filepath)))

	// Filter by folder (if provided)
	.filter(filepath => {

		if (options._.length === 0) {
			return filepath;
		}

		return options._
			.map(dir => path.normalize(path.join(process.cwd(), dir)))
			.some(dir => filepath.indexOf(dir) === 0);
	})

	// match only those with the desired extensions
	.filter(filepath => options.extensions.some(ext => new RegExp(`${ext}$`).test(filepath)));

// release the repo
repository.release();

const cliEngineOptions = {
	configFile: options.config,
	env: options.env,
	globals: options.global,
	useEslintrc: !options['no-eslintrc'],
	parser: options.parser,
	cache: options.cache,
	cacheLocation: options['cache-location'],
	rulesPaths: options.rulesdir,
	plugins: options.plugin,
	ignore: !options['no-ignore'],
	ignorePath: options['ignore-path'],
	ignorePattern: options['ignore-pattern'],
	allowInlineConfig: !options['no-inline-config']
}


// Create an instance of eslint
const eslint = new CLIEngine(cliEngineOptions);

// lint files
const result = eslint.executeOnFiles(stagedFiles);

const reporter = eslint.getFormatter();

console.log(reporter(result.results));

// exit 0 or 1
process.exit(result.errorCount > 0 ? 1 : 0);
