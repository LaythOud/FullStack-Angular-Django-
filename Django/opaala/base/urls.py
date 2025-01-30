from django.urls import path
from . import views

urlpatterns = [
    # GET all books
    path(
        "books",
        views.books,
        name="get_all_books",
    ),
    # POST, GET (create list, get all lists)
    path(
        "lists",
        views.book_lists,
        name="action_lists",
    ),
    # GET or DELETE (get or delete one list)
    path(
        "lists/<slug:list_slug>",
        views.book_list,
        name="action_list",
    ),
    # POST (add book to list)
    path(
        "lists/<slug:list_slug>/books",
        views.add_book_to_book_list,
        name="add_book_to_list",
    ),
    # DELETE (delete book from list)
    path(
        "lists/<slug:list_slug>/books/<slug:book_slug>/",
        views.delete_book_from_book_list,
        name="delete_book_from_list",
    ),
]
