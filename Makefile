run:
	@docker-compose up --build --remove-orphans

test:
	@docker-compose -f docker-compose-test.yaml up --build --remove-orphans