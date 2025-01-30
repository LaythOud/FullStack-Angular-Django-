from django.db import models
from django.utils.text import slugify
import uuid


def generate_unique_slug(model_class, field_value, slug_field_name="slug"):
    base_slug = slugify(field_value)
    slug = base_slug

    if model_class.objects.filter(**{slug_field_name: slug}).exists():
        unique_id = uuid.uuid4().hex[:8]
        slug = f"{base_slug}-{unique_id}"

    return slug


class Book(models.Model):
    title = models.CharField(max_length=255)
    year = models.DateField()  # Store the date but only care about the year
    author = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(Book, self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BookList(models.Model):
    name = models.CharField(max_length=255)
    books = models.ManyToManyField(Book)
    slug = models.SlugField(unique=True, max_length=255)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(BookList, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
