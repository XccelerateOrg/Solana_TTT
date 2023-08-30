use anchor_lang::prelude::*;
use crate::errors::TTTError;

pub struct Game {
    /*
        - 2 players
        - board
        - who's turn is it?
        - result?
    */   
    players: [Pubkey; 2],
    board: [[Option<Sign>; 3]; 3], // None, X/O
    turn: u8 // 0, 1, 2, 3, 9
    result: GameState
}

impl Game {
    // setup the game in this function
    pub fn start(&mut self, players: [Pubkey; 2]) -> Result<()> {
        // if the game is already in progress -> throw an error
        require_eq!(self.turn, 0, TTTError::GameAlreadyStarted);
        // store players in the game
        self.players = players;
        // increment turn
        self.turn = 1;
        Ok(())
    }

    pub fn current_player(&self) -> Pubkey {
        // turn = 1 -> Player1
        // turn = 2 -> Player2
        // turn = 3 -> Player3
        return self.players[((self.turn - 1) % 2) as usize];
    }

    pub fn play(&mut self, tile: &Tile) {

    }
}

#[derive(
    AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, FromPrivitive, ToPrimitive, Copy
)]
pub enum Sign {
    X,
    O,
}

#[derive(
    AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq
)]
pub enum GameState {
    Active,
    Tie,
    Win(Pubkey)
}

#[derive(
    AnchorSerialize, AnchorDeserialize,
)]
pub struct Tile {
    row: u8,
    column: u8
}