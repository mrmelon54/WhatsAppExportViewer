<script>
  import {Text, SecondaryText} from "@smui/list";
  import Tooltip, {Wrapper} from "@smui/tooltip";
  import {LEFT, MIDDLE, RIGHT} from "../api/ChatMessageSides";
  import SvelteMarkdown from "svelte-markdown";

  export let side;
  export let name;
  export let message;
  export let date;
  export let time;

  const sideClass = (() => {
    let z = {};
    z[LEFT] = {c: "left-bubble", w: "left-wrapper", a: "left"};
    z[MIDDLE] = {c: "middle-bubble", w: "middle-wrapper", a: "middle"};
    z[RIGHT] = {c: "right-bubble", w: "right-wrapper", a: "right"};
    return z;
  })();
</script>

<div class="wrapper {sideClass[side].w}">
  <div class="bubble {sideClass[side].c}">
    {#if name != ""}
      <div>
        <Text align={sideClass[side].a}>
          <SecondaryText>{name}</SecondaryText>
        </Text>
      </div>
    {:else}
      <div />
    {/if}
    <div class="wrap-message">
      <SvelteMarkdown source={message} />
    </div>
    <div>
      <Wrapper>
        <Text>{time}</Text>
        <Tooltip>{date + ", " + time}</Tooltip>
      </Wrapper>
    </div>
  </div>
</div>

<style>
  .bubble {
    border-radius: 15px;
    max-width: 70%;
    border: 0.5px solid black;
    border-radius: 10px;
    margin: 5px;
    padding: 10px;
    display: inline-block;
  }
  .left-bubble {
    background: #323232;
  }
  .right-bubble {
    background: #0c4a0c;
  }
  .middle-bubble {
    background: #002255;
  }
  .bubble-text {
    color: #e1e1e1;
  }

  .wrapper {
    display: flex;
  }
  .left-wrapper {
    justify-content: flex-start;
  }
  .right-wrapper {
    justify-content: flex-end;
  }
  .middle-wrapper {
    justify-content: center;
  }

  .wrap-message {
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -webkit-pre-wrap; /* Chrome & Safari */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* CSS3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    word-break: break-all;
    white-space: normal;
  }
</style>
