<script>
  import Select, {Option} from "@smui/select";
  import IconButton from "@smui/icon-button";

  let pageIndex = 0;
  let pageTotal = 5;
  let isLoading = false;
  let isDragging = false;
  let loadedChat = null;

  function leftClick() {
    let n = pageIndex - 1;
    if (n < 0) n = 0;
    pageIndex = n;
  }

  function rightClick() {
    let n = pageIndex + 1;
    if (n >= pageTotal) n = pageTotal - 1;
    pageIndex = n;
  }
</script>

<div class="chat-section">
  {#if isLoading}
    <div class="show-center">
      <div class="mdc-typography--headline5">Loading...</div>
    </div>
  {:else if isDragging}
    <div class="show-center">
      <div class="mdc-typography--headline5">Drop exported chat here</div>
    </div>
  {:else if loadedChat == null}
    <div class="show-center">
      <div class="mdc-typography--headline5">No chat loaded</div>
    </div>
  {:else}
    <div class="view">
      <!-- chat view -->
    </div>
    <div class="pagnation">
      <IconButton class="material-icons" on:click={leftClick}>chevron_left</IconButton>
      <Select bind:value={pageIndex}>
        {#each Array.from(Array(pageTotal).keys()) as i}
          <Option value={i}>{i + 1}</Option>
        {/each}
      </Select>
      <IconButton class="material-icons" on:click={rightClick}>chevron_right</IconButton>
    </div>
  {/if}
</div>

<style>
  .chat-section {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .chat-section > .show-center {
    margin: auto;
  }

  .chat-section > .view {
    height: 100%;
  }

  .chat-section > .pagnation {
    display: flex;
    align-items: center;
    gap: 0 16px;
    margin: auto;
  }
</style>
