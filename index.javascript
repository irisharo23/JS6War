class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}


class Deck {
    constructor() {
        // Generate a deck of cards
        this.cards = this.generateDeck();
        this.currentIndex = 0;
    }

    // Method to generate a deck of cards
    generateDeck() {
        // empty array to store cards
        const cards = [];

        // ranks (2 to 10, Jack, Queen, King, Ace)
        const ranks = Array.from({ length: 13 }, (_, i) => i + 2).concat(['Jack', 'Queen', 'King', 'Ace']);

        // suits (Hearts, Diamonds, Clubs, Spades)
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        // Nested loops to generate cards for each rank and suit -- removed tostring()
        for (const rank of ranks) {
            for (const suit of suits) {
                cards.push(new Card(rank, suit));
            }
        }

        return cards;
    }

    // Method to deal a card from the deck
    deal() {
        // Check if there are still cards in the deck
        if (this.currentIndex < this.cards.length) {
            // Return the card at the current index and increment the index
            return this.cards[this.currentIndex++];
        } else {
            // Throw an error if the deck is empty
            throw new Error('Deck is empty');
        }
    }
}

class Player {
    constructor() {
        this.hand = [];
        this.points = 0;
    }

    // Method to play a card from the player's hand
    playCard() {
        return this.hand.shift();
    }

    // Method to receive a card and add it to the player's hand
    receiveCard(card) {
        this.hand.push(card);
    }

    // Method to add the player's points
    addPoint() {
        this.points++;
    }
}

class Game {
    constructor() {
        // Create two players and a deck
        this.player1 = new Player();
        this.player2 = new Player();
        this.deck = new Deck();
    }

    // Method to play the game
    playGame() {
        // Deal 26 cards to each player
        for (let i = 0; i < 26; i++) {
            this.player1.receiveCard(this.deck.deal());
            this.player2.receiveCard(this.deck.deal());
        }

        // Play rounds until one player runs out of cards
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            // Play a card from each player
            const card1 = this.player1.playCard();
            const card2 = this.player2.playCard();

            // Compare ranks
            if (card1.rank > card2.rank) {
                this.player1.addPoint();  // Add this line to update points for player1
                console.log(`Player 1 wins the round: ${card1.toString()} beats ${card2.toString()}`);
            } else if (card1.rank < card2.rank) {
                this.player2.addPoint();  // Add this line to update points for player2
                console.log(`Player 2 wins the round: ${card2.toString()} beats ${card1.toString()}`);
            } else {
                console.log("It's a tie!");
            }

            // Added to break infinite loop if player ran out of cards 
            if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
                break;
            }
        }

        // Display the winner
        if (this.player1.points > this.player2.points) {
            console.log("Player 1 wins the game!");
        } else if (this.player1.points < this.player2.points) {
            console.log("Player 2 wins the game!");
        } else {
            console.log("It's a tie! No winner.");
        }
    }
}



const warGame = new Game();
warGame.playGame();
