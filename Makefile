install:
	npm ci

brain-games:
	node bin/brain-games.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test t:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
