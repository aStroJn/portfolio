import { Application, Container, Sprite, type ApplicationOptions } from 'pixi.js';
import { sceneData } from '../config/scene-data';
import { AssetLoader } from './AssetLoader';
import { SceneRenderer } from './SceneRenderer';
import { Camera } from './Camera';
import { ParallaxSystem, ZERO_PARALLAX } from '../systems/ParallaxSystem';
import { MouseParallaxAdapter } from '../systems/MouseParallaxAdapter';
import { ScrollParallaxAdapter } from '../systems/ScrollParallaxAdapter';
import { TouchParallaxAdapter } from '../systems/TouchParallaxAdapter';
import { GyroscopeParallaxAdapter } from '../systems/GyroscopeParallaxAdapter';
import { AnimationOrchestrator } from '../animations/AnimationOrchestrator';
import { createSunGlow } from '../animations/SunGlow';
import { createCityFlicker } from '../animations/CityFlicker';
import { createTreeSway } from '../animations/TreeSway';
import { createCloudDrift } from '../animations/CloudDrift';
import { AsciiCloud, ASCII_BLOCK_CLOUD, ASCII_GLYPH_CLOUD, ASCII_CHAR_CLOUD } from '../objects/AsciiCloud';
import { Character } from '../objects/CharacterFactory';
import { attachIdleAnimations } from '../objects/characterAnimations';
import { bindMascotExpression } from '../objects/mascotExpression';
import { ScrollDirector } from '../systems/ScrollDirector';
import { screenLeftFrames, screenRightFrames } from '../config/assets';
import { createScreenAnimation } from '../animations/ScreenAnimation';
import { useScrollStore } from '../../state/scroll';
import { useSignboardStore } from '../../state/signboard';

export class SceneManager {
  private app: Application | null = null;
  private camera: Camera | null = null;
  private world: Container | null = null;
  private parallax: ParallaxSystem | null = null;
  private mouseAdapter: MouseParallaxAdapter | null = null;
  private scrollAdapter: ScrollParallaxAdapter | null = null;
  private touchAdapter: TouchParallaxAdapter | null = null;
  private gyroAdapter: GyroscopeParallaxAdapter | null = null;
  private orchestrator: AnimationOrchestrator | null = null;
  private characters: Character[] = [];
  private unsubMascot: (() => void) | null = null;
  private scrollDirector: ScrollDirector | null = null;
  private signRightSprite: Sprite | null = null;
  private isDestroyed = false;
  private mountParent: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private onResize = () => this.handleResize();

  constructor(
    private readonly assetLoader: AssetLoader = new AssetLoader(),
    private readonly renderer: SceneRenderer = new SceneRenderer(),
    private readonly parallaxSystem: ParallaxSystem = new ParallaxSystem(),
  ) {}

  async mount(parent: HTMLElement): Promise<void> {
    if (this.isDestroyed) return;
    this.mountParent = parent;
    const isBrowser = typeof window !== 'undefined';
    const width = isBrowser ? (parent.clientWidth || window.innerWidth) : sceneData.masterWidth;
    const height = isBrowser ? (parent.clientHeight || window.innerHeight) : sceneData.masterHeight;

    const app = new Application();
    const appOptions: Partial<ApplicationOptions> = {
      width,
      height,
      backgroundAlpha: 0,
      antialias: false,
      resolution: Math.min(isBrowser ? window.devicePixelRatio || 1 : 1, 2),
      autoDensity: true,
    };

    await app.init(appOptions);
    if (this.isDestroyed) {
      try {
        app.destroy(true, { children: true });
      } catch {
        // Ignored
      }
      return;
    }

    this.app = app;
    if (this.app.canvas) {
      this.app.canvas.style.touchAction = 'pan-y';
    }
    parent.appendChild(this.app.canvas);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(parent);
    }

    this.camera = new Camera(sceneData.masterWidth, sceneData.masterHeight);
    this.app.stage.addChild(this.camera.root);

    this.world = new Container();
    this.camera.root.addChild(this.world);

    const textures = await this.assetLoader.load();
    if (this.isDestroyed || !this.world) return;

    const sprites = this.renderer.render(this.world, textures);

    for (const [id, sprite] of sprites) {
      this.parallaxSystem.track(id, sprite);
    }
    this.parallax = this.parallaxSystem;
    this.signRightSprite = sprites.get('signRight') || null;

    // Ambient animation setup
    this.orchestrator = new AnimationOrchestrator();
    const sun = sprites.get('sun');
    const city = sprites.get('city');
    const trees: Sprite[] = [];
    const midTrees = sprites.get('midTrees');
    const rightTree = sprites.get('rightTree');
    if (midTrees) trees.push(midTrees);
    if (rightTree) trees.push(rightTree);

    if (sun) createSunGlow(this.orchestrator, sun);
    if (city) createCityFlicker(this.orchestrator, city);
    if (trees.length > 0) createTreeSway(this.orchestrator, trees);

    const screenLeft = sprites.get('screenLeft');
    const screenRight = sprites.get('screenRight');
    const screenLeftTextures = screenLeftFrames
      .map((url) => textures.get(url))
      .filter((t): t is import('pixi.js').Texture => Boolean(t));
    const screenRightTextures = screenRightFrames
      .map((url) => textures.get(url))
      .filter((t): t is import('pixi.js').Texture => Boolean(t));

    if (screenLeft && screenLeftTextures.length > 0) {
      createScreenAnimation(this.orchestrator, screenLeft, screenLeftTextures, 0.6);
    }
    if (screenRight && screenRightTextures.length > 0) {
      createScreenAnimation(this.orchestrator, screenRight, screenRightTextures, 0.5);
    }

    // Multi-tier Cloud Formations: Block font clouds are small & distant, Glyph/Char clouds are full & prominent
    const clouds: AsciiCloud[] = [
      // Upper Sky Layer (y: 65 - 130)
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: 140, y: 70, scale: 0.48, alpha: 0.38, color: 0xf472b6 }),
      new AsciiCloud({ text: ASCII_GLYPH_CLOUD, x: 620, y: 110, scale: 0.90, alpha: 0.60, color: 0xc084fc }),
      new AsciiCloud({ text: ASCII_CHAR_CLOUD, x: 1220, y: 80, scale: 0.85, alpha: 0.58, color: 0xfca5a5 }),
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: 1780, y: 65, scale: 0.52, alpha: 0.36, color: 0xf472b6 }),

      // Mid Sky Layer (y: 155 - 240)
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: -60, y: 185, scale: 0.55, alpha: 0.42, color: 0xf43f5e }),
      new AsciiCloud({ text: ASCII_GLYPH_CLOUD, x: 440, y: 215, scale: 1.05, alpha: 0.68, color: 0xfb923c }),
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: 980, y: 165, scale: 0.50, alpha: 0.40, color: 0xf472b6 }),
      new AsciiCloud({ text: ASCII_CHAR_CLOUD, x: 1480, y: 220, scale: 1.10, alpha: 0.65, color: 0xe879f9 }),

      // Horizon Layer (y: 260 - 360) directly behind Mountains
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: 200, y: 285, scale: 0.52, alpha: 0.40, color: 0xf43f5e }),
      new AsciiCloud({ text: ASCII_GLYPH_CLOUD, x: 740, y: 325, scale: 0.95, alpha: 0.62, color: 0xfba48c }),
      new AsciiCloud({ text: ASCII_BLOCK_CLOUD, x: 1320, y: 300, scale: 0.46, alpha: 0.38, color: 0xf472b6 }),
      new AsciiCloud({ text: ASCII_CHAR_CLOUD, x: 1880, y: 310, scale: 1.00, alpha: 0.64, color: 0xf472b6 }),
    ];

    for (const cloud of clouds) {
      // Placed behind mountains (inserted at index 2)
      this.world.addChildAt(cloud, Math.min(2, this.world.children.length));
    }
    createCloudDrift(this.orchestrator, clouds, { startX: 2300, endX: -1000, speedPxPerSec: 28 });

    // Characters setup (graceful if assets not yet exported)
    try {
      const human = await Character.fromSpriteSheet('/assets/scene/character/human', { idle: 'idle' });
      if (!this.isDestroyed && this.world) {
        human.sprite.position.set(750, 680);
        this.world.addChild(human.sprite);
        this.characters.push(human);
        if (this.orchestrator) attachIdleAnimations(this.orchestrator, human);
      }
    } catch {
      // Character sprite sheet not present yet
    }

    try {
      const mascot = await Character.fromSpriteSheet('/assets/scene/character/mascot', { idle: 'idle' });
      if (!this.isDestroyed && this.world) {
        mascot.sprite.position.set(820, 710);
        this.world.addChild(mascot.sprite);
        this.characters.push(mascot);
        if (this.orchestrator) attachIdleAnimations(this.orchestrator, mascot);
        this.unsubMascot = bindMascotExpression(mascot);
      }
    } catch {
      // Character sprite sheet not present yet
    }

    // Scroll Director
    this.scrollDirector = new ScrollDirector(this.camera);
    this.scrollDirector.start();

    const reducedMotion =
      isBrowser &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion && isBrowser) {
      this.mouseAdapter = new MouseParallaxAdapter();
      this.scrollAdapter = new ScrollParallaxAdapter();
      this.touchAdapter = new TouchParallaxAdapter();
      this.gyroAdapter = new GyroscopeParallaxAdapter();
    } else if (reducedMotion) {
      this.orchestrator.pauseAll();
    }

    this.app.ticker.add(() => this.tick());
    this.handleResize();

    if (isBrowser) {
      window.addEventListener('resize', this.onResize);
    }
  }

  private tick(): void {
    if (!this.parallax || this.isDestroyed) return;
    const isBrowser = typeof window !== 'undefined';
    const reducedMotion =
      isBrowser &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scrollProgress = useScrollStore.getState().scrollProgress;

    if (reducedMotion) {
      this.parallax.update(ZERO_PARALLAX, scrollProgress);
    } else {
      const m = this.mouseAdapter ? this.mouseAdapter.getInput() : ZERO_PARALLAX;
      const s = this.scrollAdapter ? this.scrollAdapter.getInput() : ZERO_PARALLAX;
      const g = this.gyroAdapter ? this.gyroAdapter.getInput() : ZERO_PARALLAX;
      const t = this.touchAdapter ? this.touchAdapter.getInput() : ZERO_PARALLAX;

      const hasGyroSensor = Boolean(this.gyroAdapter?.hasSensor());

      // If physical gyro sensor is active, gyro drives parallax (calibrated 0.65x for subtle, realistic depth without clipping)
      // If gyro sensor is not available (e.g. insecure local HTTP testing), smooth touch drag provides parallax
      const activeX = hasGyroSensor ? g.x * 0.65 : t.x;
      const activeY = hasGyroSensor ? g.y * 0.50 : t.y;

      this.parallax.update(
        {
          x: m.x + activeX,
          y: m.y + s.y + activeY,
        },
        scrollProgress,
      );

      if (this.camera) {
        if (hasGyroSensor && this.gyroAdapter) {
          this.camera.setPanProgress(
            this.gyroAdapter.getPanProgress(),
            this.gyroAdapter.getPanProgressY(),
          );
        } else if (this.touchAdapter) {
          this.camera.setPanProgress(this.touchAdapter.getPanProgress());
        }
      }
    }

    // Real-time synchronization of signboard sprite coordinates
    if (this.signRightSprite && this.camera) {
      const gPos = this.signRightSprite.getGlobalPosition();
      const currentScale = this.camera.getState().scale;
      useSignboardStore.getState().setPosition({
        x: gPos.x,
        y: gPos.y,
        scale: currentScale,
      });
    }
  }

  private handleResize(): void {
    if (!this.app || !this.camera || this.isDestroyed) return;
    const isBrowser = typeof window !== 'undefined';
    const width = isBrowser
      ? (this.mountParent?.clientWidth || window.innerWidth)
      : sceneData.masterWidth;
    const height = isBrowser
      ? (this.mountParent?.clientHeight || window.innerHeight)
      : sceneData.masterHeight;
    if (this.app.renderer) {
      this.app.renderer.resize(width, height);
    }
    if (this.app.canvas) {
      this.app.canvas.style.touchAction = 'pan-y';
    }
    this.camera.resize(width, height);
  }

  destroy(): void {
    this.isDestroyed = true;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.mountParent = null;
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
    this.scrollDirector?.destroy();
    this.scrollDirector = null;
    this.unsubMascot?.();
    this.unsubMascot = null;
    this.characters = [];
    this.signRightSprite = null;
    this.mouseAdapter?.destroy();
    this.scrollAdapter?.destroy();
    this.touchAdapter?.destroy();
    this.gyroAdapter?.destroy();
    this.orchestrator?.destroy();
    this.orchestrator = null;

    if (this.app) {
      try {
        if (this.app.canvas && this.app.canvas.parentElement) {
          this.app.canvas.parentElement.removeChild(this.app.canvas);
        }
        this.app.destroy(true, { children: true });
      } catch (err) {
        console.warn('Error during Pixi app cleanup:', err);
      }
      this.app = null;
      this.camera = null;
      this.world = null;
      this.parallax = null;
      this.mouseAdapter = null;
      this.scrollAdapter = null;
      this.touchAdapter = null;
      this.gyroAdapter = null;
    }
  }
}
