import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './PresetCard.module.css';



interface Props {
    text: string,
    no: number,
    data: any
}

export class PresetCard extends Component<Props, {}> {
    data: Array<String> = [this.props.data[0], `preset${this.props.no}`];
    render() {
        return (
            <Link to={{pathname: "/train", state: this.data } } >
            <div className={styles.preset}>
                <p className={styles.presetText}>{this.props.text}</p>
            </div>
            </Link>
        )
    }
}

export default PresetCard
