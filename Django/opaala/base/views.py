from django.http import JsonResponse, HttpResponse, HttpRequest
from .models import Book, BookList
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json


@require_http_methods(["GET"])
def books(request: HttpRequest) -> HttpResponse:
    try:
        books = list(Book.objects.values("title", "year", "author", "slug"))
        return JsonResponse(books, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def book_lists(request: HttpRequest) -> HttpResponse:
    if request.method == "GET":
        lists = list(BookList.objects.values("name", "slug"))
        return JsonResponse(lists, safe=False, status=200)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if not data.get("name"):
                return JsonResponse(
                    {"message": "The 'name' field is required."}, status=400
                )

            book_list = BookList(name=data.get("name"))
            book_list.save()
            return JsonResponse(
                {"message": "Booklist added successfully.", "slug": book_list.slug},
                status=201,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["DELETE", "GET"])
def book_list(request: HttpRequest, list_slug: str) -> HttpResponse:
    try:
        if not BookList.objects.filter(slug=list_slug).exists():
            return JsonResponse(
                {"message": "The specified book list does not exist."}, status=404
            )

        if request.method == "GET":
            book_list = BookList.objects.filter(slug=list_slug).first()
            book_data = book_list.books.values("slug", "title", "author", "year")

            response = {
                "book_list": {"name": book_list.name, "slug": book_list.slug},
                "books": list(book_data),
            }
            return JsonResponse(response, safe=False, status=200)

        if request.method == "DELETE":
            book_list = BookList.objects.get(slug=list_slug)
            book_list.delete()

            return JsonResponse(
                {"message": f"List '{book_list.name}' removed successfully."},
                status=200,
            )

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def add_book_to_book_list(request: HttpRequest, list_slug: str) -> HttpResponse:
    try:
        if not BookList.objects.filter(slug=list_slug).exists():
            return JsonResponse(
                {"message": "The specified book list does not exist."}, status=404
            )

        data = json.loads(request.body)
        book_slug = data.get("bookSlug")
        if not book_slug:
            return JsonResponse(
                {"message": "Please provide the slug of the book to add"}, status=400
            )

        if not Book.objects.filter(slug=book_slug).exists():
            return JsonResponse(
                {"message": "The specified book does not exist."}, status=404
            )

        if BookList.objects.get(slug=list_slug).books.filter(slug=book_slug).exists():
            return JsonResponse(
                {"message": "The specified book exist in thge list."}, status=400
            )

        book_list = BookList.objects.get(slug=list_slug)
        book = Book.objects.get(slug=data.get("bookSlug"))
        book_list.books.add(book)

        return JsonResponse(
            {
                "message": f"Book '{book.title}' added successfully to the list '{book_list.name}'."
            },
            status=201,
        )

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_book_from_book_list(
    request: HttpRequest, list_slug: str, book_slug: str
) -> HttpResponse:
    try:
        if not BookList.objects.filter(slug=list_slug).exists():
            return JsonResponse(
                {"message": "The specified book list does not exist."}, status=404
            )
        if not Book.objects.filter(slug=book_slug).exists():
            return JsonResponse(
                {"message": "The specified book does not exist."}, status=404
            )

        book_list = BookList.objects.get(slug=list_slug)
        book = Book.objects.get(slug=book_slug)
        book_list.books.remove(book)

        return JsonResponse(
            {
                "message": f"Book '{book.title}' removed successfully from the list '{book_list.name}'."
            },
            status=200,
        )

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
