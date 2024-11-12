import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GradientService {

    // Функция для конвертации HEX в HSL
    hexToHsl(hex: string): { h: number, s: number, l: number } {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0;
        let s = 0;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    // Функция для конвертации HSL в HEX
    hslToHex(h: number, s: number, l: number): string {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;
        if (h < 60) { r = c; g = x; }
        else if (h < 120) { r = x; g = c; }
        else if (h < 180) { g = c; b = x; }
        else if (h < 240) { g = x; b = c; }
        else if (h < 300) { r = x; b = c; }
        else { r = c; b = x; }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    }

    // Функция для создания градиента из нескольких оттенков
    generateGradientColors(hex: string, steps: number = 3): string[] {
        const { h, s, l } = this.hexToHsl(hex);
        const colors = [];

        for (let i = 0; i < steps; i++) {
            const lightness = l + (i - Math.floor(steps / 2)) * 10; // Изменение яркости
            colors.push(this.hslToHex(h, s, Math.min(100, Math.max(0, lightness))));
        }

        return colors;
    }

    genGradientStyle(colors ?: string[]) : string{
        return `linear-gradient(to bottom, ${colors.join(', ')})`
    }

    genImageFilter(color : string) : string{
        return `drop-shadow(0 0 0.75rem ${color})`
    }
}
