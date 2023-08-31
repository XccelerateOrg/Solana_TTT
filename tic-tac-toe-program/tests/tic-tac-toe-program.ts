import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TicTacToeProgram } from "../target/types/tic_tac_toe_program";
import { expect } from "chai";

describe("tic-tac-toe-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TicTacToeProgram as Program<TicTacToeProgram>;

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);
  // });

  it('setup game!', async () => {
    const gameKeypair = anchor.web3.Keypair.generate()
    const playerOne = (program.provider as anchor.AnchorProvider).wallet
    const playerTwo = anchor.web3.Keypair.generate()
    await program.methods
      .setupGame(playerTwo.publicKey)
      .accounts({
        game: gameKeypair.publicKey,
        playerOne: playerOne.publicKey,
      })
      .signers([gameKeypair])
      .rpc()
  

    let gameState = await program.account.game.fetch(gameKeypair.publicKey)
    console.log(gameState);
    expect(gameState.turn).to.equal(1)
    expect(gameState.players).to.eql([playerOne.publicKey, playerTwo.publicKey])
    expect(gameState.state).to.eql({ active: {} })
    expect(gameState.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  });

  it('play game!', async () => {
    const gameKeypair = anchor.web3.Keypair.generate()
    const playerOne = (program.provider as anchor.AnchorProvider).wallet
    const playerTwo = anchor.web3.Keypair.generate()
    await program.methods
      .setupGame(playerTwo.publicKey)
      .accounts({
        game: gameKeypair.publicKey,
        playerOne: playerOne.publicKey,
      })
      .signers([gameKeypair])
      .rpc()
  
    await play(
      program,
      gameKeypair.publicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{x: {}}, null, null],
        [null, null, null],
        [null, null, null],
      ]
    )
  })
});

async function play(
  program:Program<TicTacToeProgram>, 
  game, 
  player, 
  tile, 
  expectedTurn, 
  expectedGameState, 
  expectedBoard
) {
  await program.methods
    .play(tile)
    .accounts({
      player: player.publicKey,
      game
    })
    .signers(player instanceof (anchor.Wallet as any) ? [] :[player])
    .rpc();

  const gameState = await program.account.game.fetch(game);
  console.log(gameState);
  expect(gameState.turn).to.equal(expectedTurn);
  expect(gameState.state).to.eql(expectedGameState);
  expect(gameState.board).to.eql(expectedBoard);
}