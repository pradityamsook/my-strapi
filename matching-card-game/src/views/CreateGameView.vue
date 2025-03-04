<script>
export default {
    data() {
        return {
            gameName: '',
            playerCount: 1
        };
    },
    methods: {
        createGame() {
            // Logic to create a new game
            console.log('Game Created:', this.gameName, this.playerCount);
        }
    }
};
</script>

<template>
    <div class="create-game-view">
        <h1>Create a New Game</h1>
        <form @submit.prevent="createGame">
            <div>
                <label for="gameName">Game Name:</label>
                <input type="text" id="gameName" v-model="gameName" required />
            </div>
            <div>
                <label for="playerCount">Number of Players:</label>
                <input type="number" id="playerCount" v-model="playerCount" required min="1" />
            </div>
            <button type="submit">Create Game</button>
        </form>
    </div>
</template>

<style scoped>
.create-game-view {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.create-game-view h1 {
    text-align: center;
}

.create-game-view form {
    display: flex;
    flex-direction: column;
}

.create-game-view form div {
    margin-bottom: 10px;
}

.create-game-view form label {
    margin-bottom: 5px;
}

.create-game-view form input {
    padding: 8px;
    font-size: 16px;
}

.create-game-view form button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.create-game-view form button:hover {
    background-color: #0056b3;
}
</style>