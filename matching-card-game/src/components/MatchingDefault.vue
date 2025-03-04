<script>
import axios from 'axios';

export default {
  data() {
    return {
      symbols: ['🍎', '🍌', '🍇', '🍒', '🍍', '🥝'],
      cards: [],
      flippedCards: [],
      email: '',
      password: '',
      registerEmail: '',
      registerPassword: '',
      username: '',
      user: null
    };
  },
  created() {
    this.resetGame();
    this.checkAuth();
  },
  methods: {
    resetGame() {
      this.cards = [...this.symbols, ...this.symbols]
        .sort(() => Math.random() - 0.5)
        .map(value => ({ value, flipped: false, matched: false }));
      this.flippedCards = [];
    },
    flipCard(index) {
      const card = this.cards[index];
      if (card.flipped || card.matched || this.flippedCards.length === 2) return;

      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        setTimeout(this.checkMatch, 800);
      }
    },
    checkMatch() {
      const [card1, card2] = this.flippedCards;
      if (card1.value === card2.value) {
        card1.matched = true;
        card2.matched = true;
      } else {
        card1.flipped = false;
        card2.flipped = false;
      }
      this.flippedCards = [];
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: this.email,
          password: this.password
        });
        this.user = response.data.user;
        localStorage.setItem('token', response.data.jwt);
      } catch (error) {
        alert('Login failed: ' + error.response.data.error.message);
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
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
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('http://localhost:1337/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          this.user = response.data;
        }).catch(() => {
          localStorage.removeItem('token');
          this.user = null;
        });
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('token');
    }
  }
};
</script>

<template>
  <div class="game-container">
    <h1>Matching Card Game</h1>
    <div class="grid">
      <div v-for="(card, index) in cards" :key="index" class="card" :class="{ flipped: card.flipped || card.matched }"
        @click="flipCard(index)">
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">{{ card.value }}</div>
        </div>
      </div>
    </div>
    <button @click="resetGame" class="reset-container">Reset Game</button>
    <!-- <div v-if="!user">
      <h2>Login</h2>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
      <h2>Register</h2>
      <input v-model="registerEmail" placeholder="Email" />
      <input v-model="registerPassword" type="password" placeholder="Password" />
      <input v-model="username" placeholder="Username" />
      <button @click="register">Register</button>
    </div>
    <div v-else>
      <h2>Welcome, {{ user.username }}</h2>
      <button @click="logout">Logout</button>
    </div> -->
  </div>
</template>

<style>
.game-container {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  width: 80px;
  height: 100px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  perspective: 1000px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  position: absolute;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 10px;
}

.card-front {
  background: #bbb;
}

.card-back {
  background: #fff;
  transform: rotateY(180deg);
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: white;
  color: rgb(255, 255, 255);
  font-family: 'Press Start 2P', sans-serif;
  border: 2px solid white;
  cursor: pointer;
}

button:hover {
  background: black;
  color: white;
}

.reset-container {
  width: 300px;
  margin: 10px auto;
  padding: 20px;
  border: 4px solid white;
  background: black;
  box-shadow: 0 0 10px white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
