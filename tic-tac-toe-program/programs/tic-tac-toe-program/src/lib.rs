use anchor_lang::prelude::*;
use instructions::*;
use state::game::Tile;

pub mod errors;
pub mod instructions;
pub mod state;

// this key needs to be changed to whatever public key is returned by "anchor keys list"
declare_id!("CZtPmzEjnWzSa4MWzxBLrsc6mw1AgqhTHBgAsdzJ1Jv5");

#[program]
pub mod tic_tac_toe_program {
    use super::*;

    // setup-game
    pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
        // add account to being part of the game and create a new account for the game.
        instructions::setup_game::setup_game(ctx, player_two)
    }

    // play-move
    pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
        // play a move
        // check if the move is valid -> has not been played before.
        // check if the game is still going -> none of the players have won
        instructions::play::play(ctx, tile)
    }
}