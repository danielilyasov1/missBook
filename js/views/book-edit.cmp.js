import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
        <section v-if="bookToEdit" class="book-edit app-main">
            <h4>{{pageTitle}}</h4>
            <form @submit.prevent="save">
                <input type="text" v-model="bookToEdit.title" placeholder="Title">
                <input type="number" v-model.number="bookToEdit.price" placeholder="Price">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: null
        };
    },
    created() {
        const id = this.$route.params.bookId
        if (id) {
            bookService.get(id).then(book => this.bookToEdit = book)
        } else {
            this.bookToEdit = bookService.getEmptyBook()
        }
    },
    methods: {
        save() {
            if (!this.bookToEdit.title) return;
            bookService.save(this.bookToEdit).then(book => {
                this.$router.push('/book')
                eventBus.emit('show-msg', { txt: 'Saved successfully', type: 'success' });
            })
        }
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.bookId
            return id = 'Add book'
        }
    }
};