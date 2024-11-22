<template>
    <div>
        <button @click="toggleSidebar" class="toggle-button">
            <i class="fa-solid fa-bars"></i>
        </button>

        <div :class="['sidebar', { 'open': isSidebarOpen }]">
            <div class="flex flex-col h-screen p-3 bg-white shadow w-60">
                <div class="space-y-3">
                    <div class="flex items-center mb-4">
                        <h2 class="text-xl font-bold flex-1">Dashboard</h2> <!-- Flex-1 untuk memberi ruang -->
                        <RouterLink to="/account" class="ml-2">
                            <img src="/assets/images/avatar.png" alt="User  Avatar"
                                class="rounded-full w-10 h-10 border-2 border-gray-300 cursor-pointer" />
                        </RouterLink>
                    </div>
                    <div class="flex-1">
                        <ul class="pt-2 pb-4 space-y-1 text-sm">
                            <li class="rounded-sm">
                                <RouterLink :to="{ name: 'home' }">
                                    <div class="flex items-center gap-3 flex-1">
                                        <i class="fa-solid fa-house text-2xl"></i>
                                        <p>Home</p>
                                    </div>
                                </RouterLink>
                            </li>
                            <li class="rounded-sm">
                                <RouterLink :to="{ name: 'comment' }">
                                    <div class="flex items-center gap-3 flex-1">
                                        <i class="fa-solid fa-comment text-2xl"></i>
                                        <p>Comment</p>
                                    </div>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.sidebar.open {
    transform: translateX(0);
}

.toggle-button {
    position: fixed;
    top: 20px;
    left: 20px;
    background: #fff;
    border: none;
    cursor: pointer;
    z-index: 1100;
}

@media (min-width: 768px) {
    .toggle-button {
        display: none;
    }

    .sidebar {
        transform: translateX(0);
    }
}
</style>