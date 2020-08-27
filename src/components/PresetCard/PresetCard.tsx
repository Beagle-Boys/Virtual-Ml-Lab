import React, { Component } from 'react';
import styles from './PresetCard.module.css';

interface Props {
    text: string;
}

export class PresetCard extends Component<Props, {}> {
    render() {
        return (
            <div className={styles.preset}>
                <p className={styles.presetText}>{this.props.text}</p>
            </div>
        )
    }
}

export default PresetCard
