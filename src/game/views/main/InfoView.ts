import { CanvasView } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { tools } from "@game.object/ts-game-toolbox/dist/index";
import { ViewCollection } from "../ViewCollection";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";



export class InfoView extends CanvasView<ViewCollection> {
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public text = new ChainProperty<this, Array<string>>(this, []);

    public draw(): void {
        this.reset_canvas_state();
        const context: CanvasRenderingContext2D = this.context;
        const bg_color = this.bg_color.get();
        const fg_color = this.fg_color.get();
        context.textAlign = "left";
        context.font = (28 + "px" + " Arial, sans-serif");
        context.fillStyle = (bg_color.to_hex());
        context.fillRect(0, 0, 800, 600);
        context.fillStyle = (fg_color.to_hex());
        context.strokeStyle = (fg_color.to_hex());
        const start_y = this.get_y();
        const start_x = this.get_x();
        this.text.get().forEach((line, index) => {
            context.fillText(line, start_x, index * 30 + start_y);
        });
        context.fillText("Press Enter to continue!", 450, 550);
    }

    protected get_y(): number {
        return 300 - this.text.get().length * 30 / 2;
    }

    protected get_x(): number {
        if (this.text.get().length !== 1) return 50;
        const line = this.text.get()[0];
        return 400 - line.length * 6;
    }

}