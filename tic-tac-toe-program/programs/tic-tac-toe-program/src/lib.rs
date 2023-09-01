use anchor_lang::prelude::*;
use instructions::*;
use state::game::Tile;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("DWFkjLba8qu1fmAxHC88jktCDS2LA5JzVTbR447Pccyt");

#[program]
pub mod tic_tac_toe_program {
    use super::*;

    // setup-game
    pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
        // Feature 1: Input the wager amount from the player
        instructions::setup_game::setup_game(ctx, player_two)
    }

    // play-move
    pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
        instructions::play::play(ctx, tile)
    }
}