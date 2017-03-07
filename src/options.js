/**
 * Taken from https://github.com/eslint/eslint/blob/c9a7ec57604519046fdd267e6bb5ccfe9107ba69/lib/options.js
 *
 * @fileoverview Options configuration for optionator.
 * @author George Zahariev
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import optionator from 'optionator';

// ------------------------------------------------------------------------------
// Initialization and Public Interface
// ------------------------------------------------------------------------------

// exports 'parse(args)', 'generateHelp()', and 'generateHelpForOption(optionName)'
export default optionator({
	prepend: 'eslint-staged [options] file.js [file.js] [dir]',
	defaults: {
		concatRepeatedArrays: true,
		mergeRepeatedObjects: true
	},
	options: [
		{
			heading: 'Basic configuration'
		},
		{
			option: 'config',
			alias: 'c',
			type: 'path::String',
			description: 'Use configuration from this file or shareable config'
		},
		{
			option: 'eslintrc',
			type: 'Boolean',
			default: 'true',
			description: 'Disable use of configuration from .eslintrc'
		},
		{
			option: 'env',
			type: '[String]',
			description: 'Specify environments'
		},
		{
			option: 'ext',
			type: '[String]',
			default: '.js',
			description: 'Specify JavaScript file extensions'
		},
		{
			option: 'global',
			type: '[String]',
			description: 'Define global variables'
		},
		{
			option: 'parser',
			type: 'String',
			description: 'Specify the parser to be used'
		},
		{
			option: 'parser-options',
			type: 'Object',
			description: 'Specify parser options'
		},
		{
			heading: 'Caching'
		},
		{
			option: 'cache',
			type: 'Boolean',
			default: 'false',
			description: 'Only check changed files'
		},
		{
			option: 'cache-file',
			type: 'path::String',
			default: '.eslintcache',
			description: 'Path to the cache file. Deprecated: use --cache-location'
		},
		{
			option: 'cache-location',
			type: 'path::String',
			description: 'Path to the cache file or directory'
		},
		{
			heading: 'Specifying rules and plugins'
		},
		{
			option: 'rulesdir',
			type: '[path::String]',
			description: 'Use additional rules from this directory'
		},
		{
			option: 'plugin',
			type: '[String]',
			description: 'Specify plugins'
		},
		{
			option: 'rule',
			type: 'Object',
			description: 'Specify rules'
		},
		{
			heading: 'Ignoring files'
		},
		{
			option: 'ignore-path',
			type: 'path::String',
			description: 'Specify path of ignore file'
		},
		{
			option: 'ignore',
			type: 'Boolean',
			default: 'true',
			description: 'Disable use of ignore files and patterns'
		},
		{
			option: 'ignore-pattern',
			type: '[String]',
			description: 'Pattern of files to ignore (in addition to those in .eslintignore)',
			concatRepeatedArrays: [true, {
				oneValuePerFlag: true
			}]
		},
		{
			heading: 'Miscellaneous'
		},
		{
			option: 'inline-config',
			type: 'Boolean',
			default: 'true',
			description: 'Prevent comments from changing config or rules'
		}
	]
});
