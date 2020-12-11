// Book Class: which represents a new book object
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handles UI Tasks(alerts)

class UI {
  // no need to instantiate this class so make the UI methods static
  static displayBooks() {
    const storedbooks = [
      {
        title: "Book One",
        author: "Author One",
        isbn: "1212121212121",
      },
      {
        title: "Book Two",
        author: "Author Two",
        isbn: "3434343434343",
      },
    ];

    const books = storedbooks;

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    //select html element to display book data

    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-primary btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  static deleteBook(el){
    if(el.classList.contains("delete")){
        el.parentElement.parentElement.remove();
    }
  }

  static clearFormData() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Storage Class: Handles local Storage

// Event: Display books in list

document.addEventListener("DOMContentLoaded", UI.displayBooks());

// Event: Add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // instantiate book instance

  const book = new Book(title, author, isbn);
  console.log(book);
  // add book to the list
  UI.addBookToList(book);
  // clear the input fields after submit
  UI.clearFormData();
});

//Event: Remove book

document.querySelector("#book-list").addEventListener("click",(e)=>{
    UI.deleteBook(e.target);
})
