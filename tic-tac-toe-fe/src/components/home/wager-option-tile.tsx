import { WagerOption } from "@/types/game-types";
import styles from './home.module.css'
import { useMemo } from "react";

type WagerOptionTileProps = {
    wagerOption: WagerOption;
    selectedWager: WagerOption;
    selectWagerOption: (wagerOption: WagerOption) => void;
    backgroundColor: string;
}

export const WagerOptionTile = ({wagerOption, selectedWager, selectWagerOption, backgroundColor}: WagerOptionTileProps) => {
    const text = useMemo(() => {
        switch(wagerOption) {
            case WagerOption.Wager20:
                return 'Wager 20 SOL';
            case WagerOption.Wager50:
                return 'Wager 50 SOL';
            case WagerOption.Wager100:
                return 'Wager 100 SOL';
        }
    }, []);

    const active = useMemo(() => {
        return selectedWager == wagerOption;
    }, [selectedWager]);

    return (
        <div onClick={()=>{
            selectWagerOption(wagerOption);
        }} className={`${styles.findMatchTile} ${active && styles.active}`}>
            <p>{text}</p>
        </div>
    )
}