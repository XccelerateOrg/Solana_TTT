import idl from '../../../tic-tac-toe-program/target/idl/tic_tac_toe_program.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const commitmentLevel = "processed";
export const endpoint = "http://localhost:8899";
export const connection = new Connection(endpoint, commitmentLevel as any);

export const solana_TTTProgramId = new PublicKey(idl.metadata.address);
export const solana_TTTProgramInterface = JSON.parse(JSON.stringify(idl));