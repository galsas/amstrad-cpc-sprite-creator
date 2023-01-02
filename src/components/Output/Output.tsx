
import React from 'react';
import './Output.css';

interface OutputProps {
    rawOutput: number[];
    dimension: number;
}

/**
 * TODO: Add a copy to clipboard button
 * TODO: Add output format selection support
 */
class Output extends React.Component<OutputProps> {

    toHexStr(val: number) {
        return '0x' + val.toString(16).padStart(2, '0').toUpperCase();
    }

    getPartialOutput(chunk: number[]) {
        return chunk.map((v, vi) => <span key={vi}>{this.toHexStr(v)}</span>)
    }

    renderRows() {
        let rows = [];
        const rawOutput = this.props.rawOutput;
        const step = this.props.dimension / 4;
        if (rawOutput) {
            for (let i = 0; i < rawOutput.length; i += step) {
                const chunk = rawOutput.slice(i, i + step);
                rows.push(
                    <p key={`row_${i}`}>
                        { this.getPartialOutput(chunk) }
                    </p>
                );
            }
        }

        return rows;
    }

    render() {
        return (
            <div className="Output">
                <h4>Output</h4>
                <div className="output-sprite">
                    {this.renderRows()}
                </div>
            </div>
        );
    }

}

export default Output;