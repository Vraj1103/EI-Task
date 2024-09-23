import { Target } from "./Target";
import { Adaptee } from "./Adaptee";
import { Adapter } from "./Adapter";

export function mediaPlayerAdapterUseCase() {
  const adaptee = new Adaptee();
  const mediaPlayer: Target = new Adapter(adaptee);
  mediaPlayer.request(); // Adaptee: Specific request.
}
