import {writable} from "svelte/store";

export const config = writable({$load: true});

config.subscribe(x => {
  console.log("save:", x);
  if (!x.$load) window.electronAPI.invokeSaveConfig(x);
});
