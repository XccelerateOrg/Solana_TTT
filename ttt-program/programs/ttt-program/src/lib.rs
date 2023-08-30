use anchor_lang::prelude::*;

pub mod state;
pub mod errors;

declare_id!("EWS7doeQQVqeJY4yLkM42vP9CcjeFuZ99qpnDgLhP23y");

#[program]
pub mod ttt_program {
    use super::*;
    
    // Setup our game
    pub fn setup(ctx: Context<SetupGame>, player_one:Pubkey, player_two: Pubkey) -> Result<()> {
        // create a new account for the game 
        ctx.accounts.game.start(?);
        // add both accounts to being part of this game 
    }

    // User Move
    // which user is making the move
    //// what moves they have made in the past
    // where the move is being made (x,y)
    pub fn move(ctx: Context<Move>, player: PubKey, tile: (i32,i32)) -> Result<()> {
        // play a move
        // check which user has won

        // check if it is the transaction signers move
        require_keys_eq!(
            ctx.accounts.game.current_player(),
            ctx.accounts.player.key(),
            TTTError::NotPlayersTurn
        )
        game.play(tile);
    }
}

#[derive(Accounts)]
pub struct SetupGame<'info> {
    // Store the game somwhere
    #[account(init, payer=player_one, space = ?)]
    pub game: Account<'info, Game>
    #[account(mut)]
    pub player_one: Signer<'info>,
    // create instance of system program
    pub system_program: Program<'info, System>,

    // system program owns player_one but not player_two
    // player_two tries to send tokens to player_one -> Transaction fails
    // player_one tries to send tokens to player_two -> Transaction succeed
}

#[derive(Accounts)]
pub struct Move<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    pub player: Signer<'info>
}



// Web3 TTT vs Web2 TTT
/*
    - Web2 -> Usually have a game server / Playing is free vs Web3 -> Smart Contract / Paying is played
    Tic Tac Toe Game
    - 2 players
    - Game mechanics (X O + Win Loss Tie)

    - Database in which scores are stored -> Blockchain
    - Custom skins -> DYI
    - Leaderboard -> 
    - Betting (Stripe) -> Go through a middleman to exchange money between people / Solana token and Smart Contract
*/
