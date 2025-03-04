<script>
import axios from 'axios';
import api from '../stores/post-name-proxy.js';
console.log(`${import.meta.env.VITE_API_STRAPI_URL}${api.auth}`);

export default {
    data() {
        return {
            identifier: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                console.log(this.identifier, this.password);
                const response = await axios.post(`${import.meta.env.VITE_API_STRAPI_URL}${api.auth}`, {
                    identifier: this.identifier,
                    password: this.password,
                });

                const { jwt, user } = response.data;

                // Store token in localStorage
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify(user));

                alert('Login successful');
                this.$router.push('/dashboard'); // Redirect after login
            } catch (error) {
                console.error(error);
                this.errorMessage = error.response?.data?.error?.message || 'Login failed';
            }
        },
    },
};
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login" class="login-form">
            <input type="text" v-model="identifier" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Enter</button>
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

.login-container {
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

.login-form input {
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