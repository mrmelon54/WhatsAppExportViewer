<script>
  import {RIGHT} from "../api/ChatMessageSides";
  import ChatBubble from "./ChatBubble.svelte";
  import {config} from "../utils/stores";

  export let data;
  let firstName = null;

  function getFirstName() {
    if (firstName != null) return firstName;
    config.update(d => {
      firstName = d.firstName;
      return d;
    });
  }
</script>

{#each data.messages as bubble, i}
  <ChatBubble
    side={bubble.name == getFirstName() ? RIGHT : bubble.side}
    key={i}
    name={bubble.name == getFirstName() ? "" : bubble.name}
    message={bubble.message}
    date={bubble.date}
    time={bubble.time}
  />
{/each}
