// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import {CLIEngine} from 'eslint';
import git from 'git-utils';
import path from 'path';
import translateOptions from './translate-options';

// ------------------------------------------------------------------------------
// Class Definition
// ------------------------------------------------------------------------------

export default class Linter {

	execute (options, paths = options._) {

		// Translate CLI options to those needed by CLIEngine
		const linterArgs = translateOptions(options);

		// Create an instance of the CLIEngine
		const linter = new CLIEngine(linterArgs);

		// Get the git repo from the working directory
		const repository = git.open(process.cwd());

		// Find all staged files matching the given paths
		const stagedFiles = Object.keys(repository.getStatus())

			// Get all staged files
			.filter(filepath => repository.isPathStaged(filepath))

			// Normalize all paths, and make them absolute
			.map(filepath => path.normalize(path.join(process.cwd(), filepath)))

			// Filter by extension (CLIEngine won't do this for us)
			.filter(filepath => linterArgs.extensions.some(ext =>
				new RegExp(`${ext.replace(/\./, '\\.')}$`).test(filepath))
			)

			// Filter by folder (if provided)
			.filter(filepath => {

				if (paths.length === 0) {
					return filepath;
				}

				return paths
					.map(dir => path.normalize(path.join(process.cwd(), dir)))
					.some(dir => new RegExp(`^${dir.replace(/\\/g, '/')}`).test(filepath.replace(/\\/g, '/')));
			});

		// release the repo
		repository.release();

		// execute eslint on the staged files
		return linter.executeOnFiles(stagedFiles);
	}

}
