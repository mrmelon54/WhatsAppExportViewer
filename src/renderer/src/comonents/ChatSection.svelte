<script>
  import Select, {Option} from "@smui/select";
  import IconButton from "@smui/icon-button";
  import {onMount} from "svelte";
  import ErrorDialog from "./ErrorDialog.svelte";
  import ChatData from "../api/ChatData";
  import ChatBubbleList from "./ChatBubbleList.svelte";

  const pageLines = 1000;

  let pageIndex = $state(0);
  let pageTotal = $state(5);
  let isLoading = $state(false);
  let isDragging = $state(false);
  let loadedChat = $state(null);
  let errorData = $state(null);

  onMount(() => {
    window.electronAPI.handleFileOpen((_event, args) => {
      if (args.length >= 1) openFile(args[0]);
    });
  });

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

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    openFile(e.dataTransfer.files);
    isDragging = false;
  }

  async function openFile(filepaths) {
    if (filepaths.length == 1) {
      isLoading = true;
      loadedChat = await window.electronAPI.getDroppedFilePath(filepaths[0]);
      let lines = await window.electronAPI.invokeFileCountLines(loadedChat);
      pageTotal = Math.ceil(lines / pageLines);
      isLoading = false;
    } else if (filepaths.length > 1) {
      errorData = {title: "Error", description: "Too many files dropped"};
    } else {
      isLoading = false;
      errorData = {title: "Error", description: "Not enough files dropped"};
    }
  }

  async function loadSectionOfFile(filepath, pageIndex) {
    let offset = pageIndex * pageLines;
    let lines = await window.electronAPI.invokeFileReadLines(filepath, offset, offset + pageLines);
    return ChatData.loadFile(lines);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="chat-section {isDragging ? 'drag-on' : ''}"
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
  ondrop={handleDrop}
>
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
    {#await loadSectionOfFile(loadedChat, pageIndex)}
      <div class="show-center">
        <div class="mdc-typography--headline5">Loading messages...</div>
      </div>
    {:then x}
      <div class="view">
        <ChatBubbleList data={x} />
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
    {/await}
  {/if}
  <ErrorDialog open={errorData != null} title={errorData?.title} description={errorData?.description} />
</div>

<style>
  .chat-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 500;
  }

  .chat-section.drag-on:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 600;
  }

  .chat-section > .show-center {
    margin: 16px;
    display: flex;
    align-items: center;
    height: 100%;
    flex-direction: row;
    align-content: center;
  }

  .chat-section > .show-center > div {
    width: 100%;
    text-align: center;
  }

  .chat-section > .view {
    height: 100%;
    overflow-y: auto;
  }

  .chat-section > .pagnation {
    display: flex;
    align-items: center;
    gap: 0 16px;
    margin: auto;
  }
</style>
