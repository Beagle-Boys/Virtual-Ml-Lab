import { thumbsUpOutline } from 'ionicons/icons';
import React, { Component } from 'react';
import styles from './PopupProject.module.css';

interface MyState{
    selected: number,
}

export class PopupProject extends Component<{}, MyState> {
    constructor(props: any){
        super(props);
        this.state = {selected: 0};
    }

    handleClick(x: number){
        this.setState({selected: x});
    }

    render() {
        const selector_prob = ["Classification", "Regression", "Clustering"];
        const algos = [
            [{img: "", name: "Neural Network"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}],
            [{img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}],
            [{img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}, {img: "", name: "Not Available"}]
        ];
        return (
            <div className={styles.selectorPopup}>
                <div className={styles.popupTitle}>Start Project</div>
                <div className={styles.popupSelectorContainer}>
                    <div className={styles.problemSelect}>
                    {selector_prob.map((x, y) => <ListItemProb handleClick={(x) => this.handleClick(x)} name={x} k={y} key={y} />)}
                    </div>
                    <div className={styles.divLine}></div>
                    <div className={styles.rightCon}>
                        <div className={styles.algoSelect}>
                            {<GridAlgos data={algos[this.state.selected]} />}
                            <div className={styles.algoCon}>Neural Network</div>
                            <div className={styles.algoCon}>Neural Network</div>
                            <div className={styles.algoCon}>Neural Network</div>
                            <div className={styles.algoCon}>Neural Network</div>
                            <div className={styles.algoCon}>Neural Network</div>
                            <div className={styles.algoCon}>Neural Network</div>
                        </div>
                        <div className={styles.createBtn}>Create</div>
                    </div>
                </div>
                
            </div>
        )
    }
}


interface Props {
    name: string, 
    k: number,
    handleClick: (x: number) => void
}

function ListItemProb(props: Props){
    return(
        <div className={styles.problemCon} onClick={() => props.handleClick(props.k)}>{props.name}</div>
    );
}

interface obj{
    name: string,
    img: string
}

interface AlgoProps{
    data: Array<obj>,
}

function GridAlgos(props: AlgoProps){
    return(
        <>
        {props.data.map((x, y) => <div className={styles.algoCon}>{x.name}</div>)}
        </>
    );
}

export default PopupProject
