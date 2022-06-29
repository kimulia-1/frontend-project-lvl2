install: 
	npm ci

publish:
	npm publish --dry-run

test:
	npm run test
lib:

	npm install commander

lint:
	npx eslint .

start: install publish lib lint test