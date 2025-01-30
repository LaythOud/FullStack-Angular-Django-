# Define services
BACKEND_CONTAINER=django_backend
FRONTEND_CONTAINER=angular_frontend

run-app:
	docker-compose up backend -d
	docker-compose up frontend -d

lint:
	docker-compose up django-lint -d
	docker-compose up angular-lint -d

test:
	docker-compose up django-test -d

stop:
	docker-compose down --remove-orphans
