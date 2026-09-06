import { AnimatedSprite, Assets, Texture } from 'pixi.js';

export interface CharacterAnimations {
  idle: string; // sprite sheet basename
}

export class Character {
  readonly sprite: AnimatedSprite;
  private readonly textures: Record<string, Texture[]>;

  constructor(sprite: AnimatedSprite, textures: Record<string, Texture[]>) {
    this.sprite = sprite;
    this.textures = textures;
    this.sprite.animationSpeed = 0.1;
    this.sprite.gotoAndPlay(0);
  }

  static async fromSpriteSheet(
    folder: string,
    animations: CharacterAnimations,
  ): Promise<Character> {
    const textures: Record<string, Texture[]> = {};
    for (const [name, basename] of Object.entries(animations)) {
      const sheet = await Assets.load(`${folder}/${basename}.json`);
      const frames: Texture[] = [];
      if (sheet && (sheet as { frames?: { name: string }[] }).frames) {
        for (const frame of (sheet as { frames: { name: string }[] }).frames) {
          const tex = await Assets.load(`${folder}/${frame.name}`);
          frames.push(tex as Texture);
        }
      }
      textures[name] = frames;
    }
    const sprite = new AnimatedSprite(textures.idle && textures.idle.length > 0 ? textures.idle : [Texture.EMPTY]);
    return new Character(sprite, textures);
  }

  play(name: keyof CharacterAnimations): void {
    const frames = this.textures[name as string];
    if (!frames || frames.length === 0) return;
    this.sprite.textures = frames;
    this.sprite.gotoAndPlay(0);
  }
}
