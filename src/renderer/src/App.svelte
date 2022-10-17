<script>
  import {onMount} from "svelte";
  import {config} from "./utils/stores";
  import TopAppBar, {Row, Title, Section} from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import ChatSection from "./comonents/ChatSection.svelte";

  // Import styles
  import "@/assets/base.css";
  import "@/assets/fonts/material-icons/material-icons.css";
  import "@/assets/fonts/roboto/roboto.css";
  import "@/assets/fonts/roboto-mono/roboto-mono.css";

  let loadedApp = false;

  onMount(async () => {
    config.set(await window.electronAPI.invokeLoadConfig());
    loadedApp = true;
  });
</script>

{#if loadedApp}
  <TopAppBar variant="static" color="primary">
    <Row>
      <Section>
        <Title>WhatsApp Export Viewer</Title>
      </Section>
      <Section align="end" toolbar>
        <IconButton class="material-icons" aria-label="Settings">settings</IconButton>
      </Section>
    </Row>
  </TopAppBar>
  <main id="main-content">
    <ChatSection />
  </main>
{/if}

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  #main-content {
    height: 100%;
    overflow-y: hidden;
  }
</style>
