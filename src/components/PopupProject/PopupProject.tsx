import { thumbsUpOutline } from 'ionicons/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './PopupProject.module.css';

interface MyProps{
    data: Array<String>
}

interface MyState{
    selected: number,
    algo: any
}

export class PopupProject extends Component<MyProps, MyState> {
    constructor(props: MyProps){
        super(props);
        this.state = {selected: 0, algo: null};
    }

    handleClick(x: number){
        this.setState({selected: x, algo: null});
    }

    changeAlgo(k: number){
        this.setState({algo: k});
    }

    render() {
        const selector_prob = ["Classification", "Regression", "Clustering"];
        const algos = [
            [{img: "neural.png", name: "Neural Network"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}],
            [{img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"},],
            [{img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"}, {img: "close.png", name: "Not Available"},]
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
                            {algos[this.state.selected].map((x,y) => <GridAlgos name={x.name} img={x.img} st={this.state.algo == y ? styles.algoConB : styles.algoCon} changeAlgo={(x) => this.changeAlgo(x)} k={y} key={y}/>)}
                        </div>
                        <Link to={{pathname: "/train", state: [this.props.data, this.state]}} style={this.state.algo == null ? {pointerEvents: "none"}: {}} >
                            <div className={this.state.algo != null ? styles.createBtn : `${styles.createBtn} ${styles.disabledBtn}`}>Create</div>
                        </Link>
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
    img: string,
    k: number,
    st: any,
    changeAlgo: (x: number) => void
}


function GridAlgos(props: obj){
    return(
        <div className={props.name == "Not Available" ? `${styles.NotAvaAlgo} ${props.st}` : props.st} onClick={() => props.changeAlgo(props.k)}>
            <img src={require(`../../assets/${props.img}`)} className={styles.imgIcon} alt="img"></img>
            <div className={styles.imgText}>{props.name}</div>
        </div>
    );
}

export default PopupProject
