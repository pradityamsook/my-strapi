<script>
import axios from 'axios';
import api from '../stores/post-name-proxy.js';

export default {
    data() {
        return {
            username: '',
            registerEmail:'',
            registerPassword: '',
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_STRAPI_URL}${api.register}`, {
                    username: this.username,
                    email: this.registerEmail,
                    password: this.registerPassword
                });
                this.user = response.data.user;
                localStorage.setItem('token', response.data.jwt);
            } catch (error) {
                alert('Registration failed: ' + error.response.data.error.message);
            }
        },
    },
};
</script>

<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit.prevent="register" class="register-form">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="text" v-model="registerEmail" placeholder="Email" required />
            <input type="password" v-model="registerPassword" placeholder="Password" required />
            <button type="submit">Submit</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<style>
body {
    background-color: black;
    color: white;
    font-family: 'Press Start 2P', sans-serif;
    text-align: center;
}

.register-container {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 4px solid white;
    background: black;
    box-shadow: 0 0 10px white;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 20px;
}

.register-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid white;
    background: black;
    color: white;
    font-family: 'Press Start 2P', sans-serif;
    text-align: center;
}

button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background: white;
    color: black;
    font-family: 'Press Start 2P', sans-serif;
    border: 2px solid white;
    cursor: pointer;
}

button:hover {
    background: black;
    color: white;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>