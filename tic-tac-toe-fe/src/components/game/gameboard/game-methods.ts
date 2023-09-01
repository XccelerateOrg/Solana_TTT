import { Grid } from "./types";

export const checkWin = (grid: Grid, gameState: any): boolean => {
    if(gameState.state.won) {
        if (grid[1] === grid[2] && grid[2] === grid[3] && grid[1] !== undefined) {
            return true;
        }
        if (grid[4] === grid[5] && grid[5] === grid[6] && grid[4] !== undefined) {
            return true;
        }
        if (grid[7] === grid[8] && grid[8] === grid[9] && grid[7] !== undefined) {
            return true;
        }
        // Check columns
        if (grid[1] === grid[4] && grid[4] === grid[7] && grid[1] !== undefined) {
            return true;
        }
        if (grid[2] === grid[5] && grid[5] === grid[8] && grid[2] !== undefined) {
            return true;
        }
        if (grid[3] === grid[6] && grid[6] === grid[9] && grid[3] !== undefined) {
            return true;
        }
        // Check diagonals
        if (grid[1] === grid[5] && grid[5] === grid[9] && grid[1] !== undefined) {
            return true;
        }
        if (grid[3] === grid[5] && grid[5] === grid[7] && grid[3] !== undefined) {
            return true;
        }
    } else {
        return false;
    }  
    return false;
}

export const isGameOver = (gameState: any): boolean => {
    if(gameState.state.won) {
        return true;
    } else if (gameState.state.tie) {
        return true;
    }
    return false;
}