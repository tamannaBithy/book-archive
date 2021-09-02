const searchBook = async () => {
    const searchField = document.getElementById('input-value');
    const searchText = searchField.value;
    //    clear
    searchField.value = '';

    if (searchText == '') {
        document.getElementById('search-result').style.display = 'none';
        document.getElementById('empty-string').style.display = 'block';

    }
    else {
        document.getElementById('search-result').style.display = 'block';
        document.getElementById('empty-string').style.display = 'none';

        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        try {
            const res = await fetch(url);
            const data = await res.json()
            bookDetails(data)
        }
        catch (error) {
            // displayError(error)
            console.log(error);
        }
    }
}
searchBook()

// const displayError = error => {
//     document.getElementById('error-message').style.display = 'block';
// }




const bookDetails = data => {
    // console.log(books)
    const { numFound, docs } = data
    const searchResult = document.getElementById('book-details');
    searchResult.textContent = '';



    // total search result
    document.getElementById('total').innerText = numFound;

    // error message
    // displayError()



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
