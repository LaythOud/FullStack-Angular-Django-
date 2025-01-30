import pytest
import json
from django.core.management import call_command
from django.test import Client
from django.urls import reverse
from base.models import Book, BookList


@pytest.fixture
def client():
    return Client()


@pytest.fixture
def seed_database(db):
    """Fixture to seed database before each test using a JSON file"""
    call_command("loaddata", "books")
    return Book.objects.all()


# Test creating a book list
@pytest.mark.django_db
def test_create_book_list(client):
    url = reverse("action_lists")
    data = {"name": "New Book List"}
    response = client.post(url, json.dumps(data), content_type="application/json")

    assert response.status_code == 201
    assert "Booklist added successfully" in response.content.decode()


# Test adding a book to a list
@pytest.mark.django_db
def test_add_book_to_list(client, seed_database):
    book_list = BookList.objects.create(name="Test List", slug="test-list")
    book = seed_database.first()

    url = reverse("add_book_to_list", args=[book_list.slug])
    data = {"bookSlug": book.slug}
    response = client.post(url, json.dumps(data), content_type="application/json")

    assert response.status_code == 201
    assert (
        f"Book '{book.title}' added successfully to the list"
        in response.content.decode()
    )
    assert book in book_list.books.all()
