<script>
  import {RIGHT} from "../api/ChatMessageSides";
  import ChatBubble from "./ChatBubble.svelte";
  import {config} from "../utils/stores";

  export let data;
  let firstName = (() => {
    let a;
    config.update(d => {
      a = d.firstName;
      return d;
    });
    return a;
  })();

  config.subscribe(x => {
    firstName = x.firstName;
  });
</script>

{#each data.messages as bubble, i}
  <ChatBubble
    side={bubble.name == firstName ? RIGHT : bubble.side}
    key={i}
    name={bubble.name == firstName ? "" : bubble.name}
    message={bubble.message}
    date={bubble.date}
    time={bubble.time}
  />
{/each}
