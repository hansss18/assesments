<template>
    <div class="comment-view">

        <div v-if="isModalVisible" class="modal">
            <div class="modal-content">
                <div class="mb-4">
                    <h3 class="modal-title"><strong>Confirm Delete</strong></h3>
                    <p>Are you sure to delete this comment?</p>
                </div>
                <div class="flex justify-end">
                    <button class="bg-red-600 text-white p-2 pl-4 pr-4 rounded hover:bg-red-700"
                        @click="confirmDelete">Yes</button>
                    <button class="ml-4 bg-gray-400 text-white p-2 pl-4 pr-4 rounded hover:bg-gray-500"
                        @click="isModalVisible = false">No</button>
                </div>
            </div>
        </div>

        <div v-if="isEditModalVisible" class="modal">
            <div class="modal-content">
                <h3><strong>Confirm Edit</strong></h3>
                <form @submit.prevent="confirmEdit">
                    <div class="mb-4 mt-4">
                        <label for="edit-title" class="block text-gray-700">Title :</label>
                        <input id="edit-title" type="text" v-model="editTitle"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div class="mb-8">
                        <label for="edit-body" class="block text-gray-700">Body :</label>
                        <input id="edit-body" type="text" v-model="editBody"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div class="flex justify-end">
                        <button type="submit"
                            class="bg-blue-400 text-white p-2 rounded hover:bg-blue-500">Simpan</button>
                        <button type="button" @click="isEditModalVisible = false"
                            class="ml-4 bg-gray-400 text-white p-2 rounded hover:bg-gray-500">Batal</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4" v-if="!isListVisible">
                    <form class="mt-8" @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="title" class="block text-gray-700">Title :</label>
                            <input id="title" type="text" v-model="title" :class="{ 'border-red-500': isError }"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="body" class="block text-gray-700">Body :</label>
                            <input id="body" type="text" v-model="body" :class="{ 'border-red-500': isError }"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <button type="submit" class="w-full bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500">
                            Submit
                        </button>
                    </form>
                    <p v-if="isError" class="text-red-500">Both Title and Body cannot be empty!</p>
                </div>
                <div class="col-md-4" v-else>
                    <div class="mt-8">
                        <h2 class="text-lg font-bold">Comments</h2>
                        <br>
                        <ul class="list-disc pl-5">
                            <li v-for="comment in comments" :key="comment.id"
                                class="flex justify-between items-start mb-4 p-2 border rounded relative">
                                <div class="flex-1">
                                    <strong>{{ comment.title }}</strong>: {{ comment.body }}
                                </div>
                                <div class="flex-shrink-0 ml-2">
                                    <button @click="showEditModal(comment)" class="text-blue-500 hover:text-blue-700">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button @click="showDeleteModal(comment.id)"
                                        class="text-red-500 hover:text-red-700 ml-2">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const title = ref('');
const body = ref('');
const isError = ref(false);
const comments = ref([]);
const isListVisible = ref(false);
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const commentToDelete = ref(null);
const editTitle = ref('');
const editBody = ref('');
const commentToEdit = ref(null);

const showToast = (message, type = 'success') => {
    if (type === 'success') {
        toast.success(message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        toast.error(message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};

const handleSubmit = () => {
    const trimmedTitle = title.value.trim();
    const trimmedBody = body.value.trim();

    isError.value = false;

    if (trimmedTitle && trimmedBody) {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: trimmedTitle,
            body: trimmedBody,
            userId: 1
        }).then(() => {
            showToast('Comment submitted successfully!');
            title.value = '';
            body.value = '';

            return axios.get('https://jsonplaceholder.typicode.com/posts');
        }).then(response => {
            comments.value = response.data;
            isListVisible.value = true;
        }).catch((err) => {
            showToast(`Error: ${err}`, 'error');
        });
    } else {
        isError.value = true;
        showToast('Both Title and Body cannot be empty!', 'error');
    }
};

const showEditModal = (comment) => {
    commentToEdit.value = comment;
    editTitle.value = comment.title;
    editBody.value = comment.body;
    isEditModalVisible.value = true;
};

const confirmEdit = () => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${commentToEdit.value.id}`, {
        title: editTitle.value,
        body: editBody.value,
        userId: 1
    }).then(() => {
        showToast('Comment updated successfully!');
        isEditModalVisible.value = false;
        return axios.get('https://jsonplaceholder.typicode.com/posts');
    }).then(response => {
        comments.value = response.data;
    }).catch((err) => {
        showToast(`Error: ${err}`, 'error');
    });
};

const showDeleteModal = (id) => {
    commentToDelete.value = id;
    isModalVisible.value = true;
};

const confirmDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${commentToDelete.value}`)
        .then(() => {
            showToast('Comment deleted successfully!');
            comments.value = comments.value.filter(comment => comment.id !== commentToDelete.value);
            isModalVisible.value = false;
        })
        .catch((err) => {
            showToast(`Error: ${err}`, 'error');
            isModalVisible.value = false;
        });
};

</script>

<style scoped>
.border-red-500 {
    border-color: red;
}

.comment-view {
    margin: 20px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: 600px;
    max-width: 90%;
    margin: auto;
    padding: 50px;
    border-radius: 10px;
    background-color: #fff;
}

.modal-title {
    color: #D03B3C;
}
</style>