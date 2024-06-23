import { useState,createContext } from "react";

export const itemContext = createContext();

const ItemState = (props) => {
    const s1 = {style:"-20rem"}
    const [state, setState] = useState(s1);

    const update = () => {
        state.style === '-20rem' ? setState({ style: '0rem' }) : setState({ style: '-20rem' });
    }
    
    const clickOnScreen = () => {
        if (state.style === '0rem') { setState({ style: '-20rem' }); }
    }
    
    const s2 = {style:"-30rem"}
    const [navState,setNavState] = useState(s2);
    
    const navOpen = () => {
        setNavState({ style: '0rem' });
    }
    const navClose = () => {
        setNavState({ style: '-30rem' });
    }

    const navClickOnScreen = () => {
        if (state.style === '0rem') { setNavState({ style: '-30rem' }); }
    }
    return (
        <itemContext.Provider value={{ state,navState, update, clickOnScreen,navOpen,navClose,navClickOnScreen }}>
            {props.children}
        </itemContext.Provider>
    )
}
export default ItemState;