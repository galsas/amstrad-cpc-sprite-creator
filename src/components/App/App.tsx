import React from 'react';
import './App.css';
import Canvas from "../Canvas/Canvas";
import Output from "../Output/Output";
import SpriteService from "../../services/SpriteService";
import ColorPicker from "../ColorPicker/ColorPicker";

interface AppState {
    spriteHex: number[];
    targetColor: number;
    mode: number;
    dimension: number;
}

interface AppProps {
}

class App extends React.Component<AppProps, AppState> {

    spriteService: SpriteService;

    colors: any = {
        1: [
            '#000080',
            '#FFFF00',
            '#00FFFF',
            '#FF0000',
        ]
    };

    constructor(props: AppProps) {
        super(props);
        this.spriteService = new SpriteService();
        this.state = {
            spriteHex: [],
            targetColor: 0,
            mode: 1,
            dimension: 8
        }
    }

    onSpriteUpdate(sprite: string[]) {
        this.setState({
            spriteHex: this.spriteService.colorSpriteToHex(sprite, 1)
        });
    }

    updateSelectedColor(colorIndex: number) {
        this.setState({
            targetColor: colorIndex
        });
    }

    selectDimension(e: any) {
        this.setState({
            dimension: parseInt(e.target.value)
        });
    }

    render() {
        const mode = this.state.mode;
        const colorIndex = this.state.targetColor;
        const colorPalette = this.colors[mode];
        const colorHex = colorPalette[colorIndex];

        return (
            <div className="App">
                <header>
                    <h2>Amstrad CPC Sprite Creator</h2>
                </header>

                <div className="content">
                    <div className="canvas-grid">
                        <div className="toolbar canvas-toolbar">
                            <ColorPicker
                                onColorSelected={(colorIndex) => this.updateSelectedColor(colorIndex)}
                                colors={colorPalette}
                                selectedColor={this.state.targetColor} />
                            <div className="grid-size-selector">
                                <select defaultValue={8} onChange={(e) => this.selectDimension(e)}>
                                    <option value="4">4x4</option>
                                    <option value="8">8x8</option>
                                    <option value="16">16x16</option>
                                </select>
                            </div>
                        </div>

                        <Canvas
                            emptyColor={colorPalette[0]}
                            targetColor={colorHex}
                            dimension={this.state.dimension}
                            onSpriteUpdate={(s) => this.onSpriteUpdate(s)}/>
                    </div>
                    <div className="output">
                        <div className="toolbar output-toolbar">
                        </div>
                        <Output
                            dimension={this.state.dimension}
                            rawOutput={this.state?.spriteHex} />
                    </div>
                    <div className="message">
                        <h2>Work in progress!</h2>
                        <p>Currently it only supports video mode 1.</p>
                    </div>
                </div>

                <footer>
                    <a href="https://github.com/galsas/amstrad-cpc-sprite-creator">
                        View on GitHub
                    </a>
                </footer>
            </div>
        );
    }

}

export default App;
