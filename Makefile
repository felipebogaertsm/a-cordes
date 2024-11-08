run:
	@docker compose up --build

test:
	@docker compose -f docker-compose-test.yaml up --build --remove-orphans --abort-on-container-exit --exit-code-from api