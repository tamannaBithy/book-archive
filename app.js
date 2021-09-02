const searchBook = async () => {
    const searchField = document.getElementById('input-value');
    const searchText = searchField.value;
    //    clear
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.docs)
    bookDetails(data)
}
searchBook()



const bookDetails = data => {
    // console.log(books)
    const { numFound, docs } = data
    const searchResult = document.getElementById('book-details');
    searchResult.textContent = '';
    // if (data.length == 0) {
    //     // show no result found;
    // }

    // total search result
    document.getElementById('total').innerText = numFound;


    docs.forEach(book => {
        // console.log(book)

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6> Author : ${book.author_name[0] ? book.author_name[0] : 'unknown'}</h6>
                <p class="card-text">${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })

}
