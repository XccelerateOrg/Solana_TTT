import { useState } from "react"
import styles from './home.module.css'
import { WagerOption } from "@/types/game-types";
import { WagerOptionTile } from "./wager-option-tile";

const wagerOptions = [WagerOption.Wager20, WagerOption.Wager50, WagerOption.Wager100];
type FindMatchProps = {
    startMatch: () => void;
}

export default function FindMatch({startMatch}: FindMatchProps) {
    const [selectedWager, selectWagerOption] = useState<WagerOption>(wagerOptions[0]);
    return (
        <div className={styles.findMatchContainer}>
            {wagerOptions.map((option: WagerOption, index: number) => 
                <WagerOptionTile 
                    key={index} 
                    wagerOption={option} 
                    selectedWager={selectedWager}
                    selectWagerOption={selectWagerOption} 
                    backgroundColor="red"
                />
            )}
        </div>
    )
}