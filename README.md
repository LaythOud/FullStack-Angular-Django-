# FullStack (Angular + Django)

## Tech Stack

This project is built using the following technologies:

- **Backend:** Python 3.9, Django 4.2
- **Frontend:** Node.js 23.5.0, Angular 19.1
- **Database:** sqllite
- **Testing:**
  - Django: `pytest`
  - Angular: `Karma` (`npm run test`), `Cypress` (`npm run e2e-test`)
- **Linting:**
  - Django: `Ruff` (`ruff check`)
  - Angular: `ESLint` (`npm run lint`)
- **Containerization:** Docker, Docker Compose
- **Task Automation:** Makefile

---

## ⚠️ Project Considerations

- **CSRF Skipped for Simplicity:** In this setup, CSRF protection is disabled for development convenience. In a production environment, **enable CSRF protection is a MUST**.
- **Partial Unit Test Coverage:** Not every unit is covered. However, key functionalities and E2E are tested.
- **Angular in Production:** In a production environment, Angular should run using a **build output** (`ng build --prod`) instead of `ng serve`.
- **Django in Production:** The Django backend should be served using **Nginx** instead of `runserver` for better performance and security.
- **Node.js Version:** The project currently uses the latest **Node.js 25**, but it is recommended to use an **LTS (Long-Term Support) version** for stability.
- **Python Version:** The project uses **Python 3.9**, which is still security-supported, but upgrading to a newer version is recommended for long-term maintenance.
- **Backend Accessibility:** The Django backend **must be accessible at** `http://127.0.0.1:8000`, as the frontend environment is configured to map to this address.
- **(Angular/Karma) (Angular/Cypress):** Better to test the Angular project using **npm run**, not with docker.
---

## Getting Started

### **Install Required Dependencies**

Before running the project, ensure you have the following installed:

For running/testing/linting the application locally:

- **Python 3.9** (or newer)
- **Node.js 25 (or LTS version recommended)**

For running/testing/linting the application on docker
- **Docker** (for containerized development)
- **Docker Compose** (to manage multiple services)
- **Make** (for simplified command execution)

If you don’t have `make`, install it using:

```sh
sudo apt install make  # Linux
brew install make  # macOS
```
---

##  Running the Project

To start the backend, frontend using Docker, run:

```sh
make run-app
```

This will:

- Start **Django backend** on `http://127.0.0.1:8000`
- Start **Angular frontend** on `http://localhost:4200`

---

## Using the Makefile

We have provided a **Makefile** to simplify development tasks.

### **Run the APP**

```sh
make run-app
```

### **Run Tests (Django/Pytest)**

```sh
make test
```

### **Run Linting (Ruff) (ESLint)**

```sh
make lint
```

### **Stop All Services**

```sh
make stop
```

---

## Manual Setup (Without Docker)

If you prefer running the project manually, follow these steps:

### **Backend (Django)**

```sh
cd opaala/Django
python3 -m venv venv
source venv/bin/activate
cd opaala
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata books
python manage.py runserver 127.0.0.1:8000
```

### **Frontend (Angular)**

```sh
cd opaala/Angular/opaala
npm install
npm start
# In case the server dose not start and you get the following error 'ng: not found'
export PATH="$(pwd)/node_modules/.bin:$PATH"
# or
npm install -g @angular/cli
```

### **Run Tests Manually**

#### **Django Tests (Pytest)**

```sh
pytest
```

#### **Angular Tests (Karma)**

```sh
npm run test
```

#### **Angular E2E Tests (Cypress)**

```sh
npm run e2e-test
```

### **Run Linting Manually**

#### Django:

```sh
ruff check
```

#### Angular:

```sh
npm run lint
```
---

## Docker CLI Commands

### **Run Django Tests with Docker**

```sh
docker compose run django-test
```

### **Run Linting via Docker CLI**

#### Django:

```sh
docker compose run django-lint
```

#### Angular:

```sh
docker compose run angular-lint
```

---

## Final Notes

- Ensure **Docker and Docker Compose is running** before executing `docker compose` commands.
- The **Makefile simplifies running commands**, but you can always use `docker compose` manually.
- To check logs of the passed/failed tests or linting errors run the following:
  ```sh
  docker logs <container-name>
  ```
- The **backend must be accessible via **`` because the frontend environment is configured to communicate with it.