const axios = require('axios');
const fs = require('fs');
const isbnList = [ // Example ISBNs
    '9780679783268',
    '9780307476463',
    '9781581212105',
    '9780321625922',
    '5367255272676',
    '9781133112280',
    '9780205957606'
];

const fetchBookInfo = async (isbn) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        //console.log(response)
        if (response.data.totalItems > 0) {
            const book = response.data.items[0].volumeInfo;
            //console.log(book)
            return {
                title: book.title,
                authors: book.authors,
                publisher: book.publisher,
                language: book.language,
            };
        } else {
            //console.log("No information found for ISBN");
        }
    } catch (error) {
        console.error(error);
    }
};

const fetchBooksData = async () => {
    const booksData = [];
    for (let isbn of isbnList) {
        const bookInfo = await fetchBookInfo(isbn);
        if (bookInfo) {
            booksData.push(bookInfo);
        }
    }
    fs.writeFileSync('booksData.json', JSON.stringify(booksData,null, 2));
    console.log('Books details saved to json file');
};

fetchBooksData();
