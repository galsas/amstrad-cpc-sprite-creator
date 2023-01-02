import React from 'react';
import './ColorPicker.css';

interface ColorPickerProps {
    onColorSelected: (colorIndex: number) => void;
    colors: string[];
    selectedColor: number;
}

class ColorPicker extends React.Component<ColorPickerProps> {

    selectColor(colorIndex: number) {
        if (this.props.onColorSelected) {
            this.props.onColorSelected(colorIndex);
        }
    }

    renderColorPicker() {
        let colors = [];
        for (let i = 0; i < this.props.colors.length; i++) {
            colors.push(
                <div
                    key={i}
                    style={{backgroundColor: this.props.colors[i]}}
                    onClick={() => this.selectColor(i)}
                    className={`color ${this.props.selectedColor === i ? 'selected' : ''}`}
                ></div>
            );
        }
        return colors;
    }

    render() {
        return (
            <div className="color-picker">
                {this.renderColorPicker()}
            </div>
        );
    }

}

export default ColorPicker;