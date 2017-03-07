describe('app', () => {

	// eslint-staged
	it('should pass a list of staged files to eslint');

	// eslint-staged --ext jsx
	it('should filter staged files based on passed extensions');

	// eslint-staged myfile.js src/lib/
	it('should filter staged files based on passed scope');

});
