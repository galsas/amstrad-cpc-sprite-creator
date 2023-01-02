
import React from 'react';
import './Canvas.css';

interface CanvasProps {
    onSpriteUpdate: (sprite: string[]) => void;
    emptyColor: string;
    targetColor: string;
    dimension: number;
}

interface CanvasState {
    sprite: string[];
    drawing: boolean;
}

class Canvas extends React.Component<CanvasProps, CanvasState> {

    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            sprite: this.generateSprite(this.props.dimension),
            drawing: false
        }
    }

    /**
     * Handle here the grid dimension change
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<CanvasProps>) {
        if (prevProps.dimension !== this.props.dimension) {
            const newSprite = this.generateSprite(this.props.dimension, this.state.sprite);
            this.updateSprite(newSprite);
        }
    }

    /**
     * Generate a sprite of a given dimension
     * @param dimension The dimension of the sprite
     * @param prevSprite The previous sprite to copy from
     */
    generateSprite(dimension: number, prevSprite?: string[]) {
        const rows = dimension * dimension;
        const newSprite = Array(rows).fill(this.props.emptyColor);

        // Clips previous sprite to the new sprite
        if (prevSprite) {
            const prevDimension = Math.sqrt(prevSprite.length);
            const minDimension = Math.min(dimension, prevDimension);

            // Iterate through usable rows
            for (let i = 0; i < minDimension; i++) {
                const prevRowStart = i * prevDimension;
                // Gets the row from the previous sprite (clipped to fit the new dimension)
                const prevRow = prevSprite.slice(prevRowStart, prevRowStart + minDimension);
                // Writes the row to the new sprite
                for (let j = 0; j < minDimension; j++) {
                    newSprite[(i * dimension) + j] = prevRow[j];
                }
            }
        }

        return newSprite;
    }

    updateSprite(sprite: string[]) {
        this.setState({ sprite: sprite });
        if (this.props.onSpriteUpdate) {
            this.props.onSpriteUpdate(sprite);
        }
    }

    startPainting(cell: number) {
        this.setState({ drawing: true }, () => {
            this.paintColor(cell);
        });
    }

    stopPainting() {
        this.setState({ drawing: false });
    }

    /**
     * Update the color of a cell
     * @param cell
     */
    paintColor(cell: number) {
        if (this.state.drawing) {
            const newSprite = [...this.state.sprite];
            newSprite[cell] = this.props.targetColor;
            this.updateSprite(newSprite);
        }
    }

    /**
     * Render cells sprite
     */
    renderGrid() {
        let grid = [];
        const dimension = this.props.dimension;
        const rows = dimension * dimension;
        for (let i = 0; i < rows; i++) {
            grid.push(
                <div
                    className="row"
                    key={i}
                    style={{backgroundColor: this.state.sprite[i]}}
                    onMouseDown={() => this.startPainting(i)}
                    onMouseEnter={() => this.paintColor(i)}
                    onMouseUp={() => this.stopPainting()}
                >
                </div>
            );
        }
        return grid;
    }

    render() {
        return (
            <div className="Canvas">
                <div className={`grid grid-${this.props.dimension}`}>
                    {this.renderGrid()}
                </div>
            </div>
        );
    }

}

export default Canvas;