/**
 * Dirty-chai stops assertions in chai from only using property accessors, because they're evil
 */
const chai = require('chai');
chai.use(require('dirty-chai'));