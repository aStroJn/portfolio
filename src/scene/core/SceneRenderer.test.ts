import { describe, it, expect } from 'vitest';



import { Container } from 'pixi.js';
import { SceneRenderer } from './SceneRenderer';
import { sceneData } from '../config/scene-data';

describe('SceneRenderer', () => {
  it('adds one child per sceneData object to the container', () => {
    const container = new Container();
    const textures = new Map(
      sceneData.objects.map((o) => [o.asset, {} as never]),
    );
    new SceneRenderer().render(container, textures);
    expect(container.children.length).toBe(sceneData.objects.length);
  });
});
