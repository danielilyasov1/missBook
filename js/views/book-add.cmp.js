import { bookService } from "../services/book-service.js"

export default {
  template: `
 <!-- <h2>hi</h2>

 <button @click='clickBack'>Back</button> -->
    <section>
        <input v-model='bookName' type='search' placehoder='search feom google' >
       <button @click='searchBook'>search</button>
       <ul><li v-for="book in books">{{book.title}}<button @click='addBook(book)'>➕</button></li></ul>
    </section>

`,
  data() {
    return {
      bookName: "",
      books: null,
    }
  },
  created() {},
  methods: {
    // clickBack() {
    //   this.$router.back()
    // },
    // valueSearch() {
    //     this.$emit("search", this.bookName);
    // },
    searchBook() {
      bookService.getBookFromApi(this.bookName).then((books) => {
        this.books = books
        console.log(books)
      })
    },
    addBook(book){
        bookService.addBook(book)
    },
  },
  computed: {},
  unmounted() {},
}
