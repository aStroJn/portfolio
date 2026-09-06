import type { Character } from './CharacterFactory';
import { useMascotStore } from '../../state/mascot';

const EXPRESSION_TO_ANIM: Record<string, 'idle'> = {
  neutral: 'idle',
  happy: 'idle',
  thinking: 'idle',
};

export function bindMascotExpression(character: Character): () => void {
  const unsub = useMascotStore.subscribe((state) => {
    const anim = EXPRESSION_TO_ANIM[state.expression] ?? 'idle';
    character.play(anim);
  });
  return unsub;
}
