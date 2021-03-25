docker-build:
	docker-compose build
run: docker-build
	docker-compose up

frontend-deps:
	docker-compose run --rm frontend npm install
backend-deps:
	docker-compose run --rm backend pip install --user -r requirements.txt

frontend-build:
	docker-compose run --rm frontend npm run build

frontend-bash:
	docker-compose run --rm frontend bash
backend-bash:
	docker-compose run --rm backend bash

redis-cli:
	docker-compose run --rm redis redis-cli -h redis
redis-clear:
	docker-compose run --rm redis redis-cli -h redis FLUSHALL
