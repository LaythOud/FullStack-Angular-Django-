export class Book {
    title!: string;
    author!: string;
    year!: string;
    slug!: string;

    constructor(title: string, author: string, year: string, slug: string){
        this.title = title;
        this.author = author;
        this.year = year;
        this.slug = slug;
    }
}
