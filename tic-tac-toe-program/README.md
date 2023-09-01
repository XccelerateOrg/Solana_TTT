## Creating Solana Programs using the Anchor Framework

### Requirements
- Rust Lang (https://www.rust-lang.org/tools/install)
- Solana CLI (https://docs.solana.com/cli/install-solana-cli-tools)
- Yarn Pkg (https://yarnpkg.com/getting-started/install)
- Anchor CLI (https://www.anchor-lang.com/docs/installation)

### How to build this package?
- Run a local instance of the solana-test-validator using the `solana-test-validator` command.
- Run `anchor build` and `anchor deploy` which will create a new programID.
- Copy the programID and paste it in your `Anchor.toml` and `/src/lib.rs` files.

### Connecting the frontend with deployed program
- Copy the `<ProgramName>.json` from the `target/idl/<ProgramName>.json` and replace it with `tic-tac-toe-fe/src/program/idl/<ProgramName.json>`
- Copy the `<ProgramName>.ts` from the `target/types/<ProgramName>.ts` and replace it with `tic-tac-toe-fe/src/program/types/<ProgramName.ts>`