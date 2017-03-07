/**
 * Taken from https://github.com/eslint/eslint/blob/c9a7ec57604519046fdd267e6bb5ccfe9107ba69/lib/cli.js
 *
 * Translates the CLI options into the options expected by the CLIEngine.
 * @param {Object} cliOptions The CLI options to translate.
 * @returns {CLIEngineOptions} The options object for the CLIEngine.
 */
export default function translateOptions (cliOptions) {
	return {
		envs: cliOptions.env,
		extensions: cliOptions.ext,
		rules: cliOptions.rule,
		plugins: cliOptions.plugin,
		globals: cliOptions.global,
		ignore: cliOptions.ignore,
		ignorePath: cliOptions.ignorePath,
		ignorePattern: cliOptions.ignorePattern,
		configFile: cliOptions.config,
		rulePaths: cliOptions.rulesdir,
		useEslintrc: cliOptions.eslintrc,
		parser: cliOptions.parser,
		parserOptions: cliOptions.parserOptions,
		cache: cliOptions.cache,
		cacheFile: cliOptions.cacheFile,
		cacheLocation: cliOptions.cacheLocation,
		fix: cliOptions.fix,
		allowInlineConfig: cliOptions.inlineConfig
	};
}
