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
    const books = Storage.getBooksfromStorage();

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

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className}`;
    alertDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(alertDiv, form);

    // Vanish after 2 seconds

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static clearFormData() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Storage Class: Handles local Storage

class Storage {
  static getBooksfromStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBookToStorage(book) {
    const books = Storage.getBooksfromStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBookFromStorage(isbn) {
    const books = Storage.getBooksfromStorage();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display books in list

document.addEventListener("DOMContentLoaded", UI.displayBooks());

// Event: Add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // validate values
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // instantiate book instance

    const book = new Book(title, author, isbn);
    console.log(book);
    // add book to the list
    UI.addBookToList(book);
    Storage.addBookToStorage(book);
    UI.showAlert("Successfully added a book", "success");
    // clear the input fields after submit
    UI.clearFormData();
  }
});

//Event: Remove book

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  Storage.removeBookFromStorage(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Successfully removed a book", "success");
});
