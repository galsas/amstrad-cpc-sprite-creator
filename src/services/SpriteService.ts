
const COLORS_MODE_1: any = {
    '#000080': 0x0,
    '#00FFFF': 0x1,
    '#FFFF00': 0x2,
    '#FF0000': 0x3
}

export default class SpriteService {

    colorSpriteToHex(sprite: string[], mode = 1): number[] {
        if (sprite.length % 2 !== 0) {
            throw new Error('Sprite size must be power of 2');
        }

        switch (mode) {
            case 1:
                return this.colorSpriteToHexMode1(sprite);
            default:
                throw new Error(`Mode ${mode} is not supported`);
        }
    }

    private colorSpriteToHexMode1(sprite: string[]): number[] {
        const hexSprite: number[] = [];
        for (let i = 0; i < sprite.length; i += 4) {
            const pixel1 = COLORS_MODE_1[sprite[i]];
            const pixel2 = COLORS_MODE_1[sprite[i + 1]];
            const pixel3 = COLORS_MODE_1[sprite[i + 2]];
            const pixel4 = COLORS_MODE_1[sprite[i + 3]];

            const pixel1_h = (pixel1 & 0x2) << 6;
            const pixel2_h = (pixel2 & 0x2) << 5;
            const pixel3_h = (pixel3 & 0x2) << 4;
            const pixel4_h = (pixel4 & 0x2) << 3;
            const pixel1_l = (pixel1 & 0x1) << 3;
            const pixel2_l = (pixel2 & 0x1) << 2;
            const pixel3_l = (pixel3 & 0x1) << 1;
            const pixel4_l = (pixel4 & 0x1);

            const highNibbleWithLowMask = pixel1_h | pixel2_h | pixel3_h | pixel4_h;
            const lowNibble = pixel1_l | pixel2_l | pixel3_l | pixel4_l;

            hexSprite.push(highNibbleWithLowMask | lowNibble);
        }

        return hexSprite;
    }



}