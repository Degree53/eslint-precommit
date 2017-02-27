# eslint-staged

Validate git staged files with ESLint - perfect for a precommit hook.  

Takes any git staged files, filtering to those that match the passed file & directory list, and lints using eslint.

## Options

```text
eslint-staged [options] [file.js] [dir]

Basic configuration:
  -c, --config path::String    Use configuration from this file or shareable config
  --no-eslintrc                Disable use of configuration from .eslintrc
  --env [String]               Specify environments
  --ext [String]               Specify JavaScript file extensions - default: .js
  --global [String]            Define global variables
  --parser [String]            Specify the parser to be used - default: `espree`

  Caching:
  --cache                      Only check changed files - default: false
  --cache-location path::String  Path to the cache file or directory

  Specifying rules and plugins:
  --rulesdir [path::String]    Use additional rules from this directory
  --plugin [String]            Specify plugins

Ignoring files:
  --ignore-path path::String   Specify path of ignore file
  --no-ignore                  Disable use of ignore files and patterns
  --ignore-pattern [String]    Pattern of files to ignore (in addition to those in .eslintignore)

Miscellaneous:
  --no-inline-config           Prevent comments from changing config or rules
```
