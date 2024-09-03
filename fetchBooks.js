const readline = require('node:readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const booksData = [];

// Function to ask for book details from the user
const askBookDetails = () => {
  rl.question('Enter book name: ', (title) => {
    rl.question('Enter author name: ', (author) => {
      const bookInfo = {
        title: title,
        authors: [author]
      };
      booksData.push(bookInfo);

      saveBooksData();
      rl.close();
    });
  });
};

// Function to save book data to JSON file
const saveBooksData = () => {
  fs.writeFileSync('booksData.json', JSON.stringify(booksData, null, 2));
  console.log('Books details saved to booksData.json');
  console.log('Here are the details:');
  console.log(JSON.stringify(booksData, null, 2));
};

askBookDetails();